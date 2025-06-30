import axios from 'axios';
import React, { useState, useEffect } from 'react'

export default function ListMovie() {
    const [movie, setMovie] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [Genre, setGenre] = useState([]);
    const [Producer, setProducer] = useState([]);
    const [Director, setDirector] = useState([]);
    const [Star, setStar] = useState([]);

    const fetchDirector = async () => {
        const response = await axios.get('http://localhost:9999/directors');
        const data = response.data;
        setDirector(data);
        console.log(data);
    }

    const fetchStar = async () => {
        const response = await axios.get('http://localhost:9999/stars');
        const data = response.data;
        setStar(data);
        console.log(data);
    }

    const fetchProducer = async () => {
        const response = await axios.get('http://localhost:9999/producers');
        const data = response.data;
        setProducer(data);
        console.log(data);
    }

    const fetchGenre = async () => {
        const response = await axios.get('http://localhost:9999/movies');
        const data = response.data;
        let genreList = [];
        console.log(data);
        data.map((item) => {
            item.genres.map((genre) => {
                if (!genreList.includes(genre)) {
                    genreList.push(genre);
                }
            })
        })
        setGenre(genreList);
        console.log(genreList);
    }

    const fetchMovie = async () => {
        const response = await axios.get('http://localhost:9999/movies');
        const data = response.data;
        setMovie(data);
        console.log(data);
    }

    const getDirectorname = (id) => {
        let directorName = "";
        Director.map((item) => {
            if (item.id == id) {
                directorName = item.fullname;
            }
        });
        return directorName;
    }

    const getProducerName = (id) => {
        let producerName = "";
        Producer.map((item) => {
            if (item.id == id) {
                producerName = item.name;
            }
        });
        return producerName;
    }

    const getStarname = (id) => {
        let starName = "";
        Star.map((item) => {
            if (item.id == id) {
                starName = item.fullname;
            }
        });
        return starName;
    }

    const SeachByGenre = async (genres) => {
        console.log(genres);
        const response = await axios.get('http://localhost:9999/movies');
        const data = response.data;
        let movie = [];

        data.map((item) => {
            if (item.genres.includes(genres)) {
                movie.push(item);
            }
        });

        setMovie(movie);
    }

    useEffect(() => {
        fetchStar();
        fetchDirector();
        fetchGenre();
        fetchProducer();
        fetchMovie();
    }, []);

    return (
        <div className='p-5'>
            <h1 className='text-center'>React Application</h1>
            <hr></hr>
            <div>
                <div className='row'>
                    <div className='col-md-12 d-flex justify-content-center'>
                        {Genre ? (Genre.map((item, i) => {
                            return (
                                <a key={i} href='#' className='m-2' onClick={() => {
                                    SeachByGenre(item);
                                }}>{item}</a>
                            )
                        })) : ("")}
                    </div>
                </div>
            </div>
            <hr></hr>
            <div className='row'>
                <div className='col-md-3 p-3'>
                    <h3>Producers</h3>
                    <ul>
                        {Producer ? (Producer.map((item, i) => {
                            return (
                                <li> <a key={i} href='#' className='m-2'>{item.name}</a> </li>
                            )
                        })) : ("")}
                    </ul>
                </div>
                <div className='col-md-9'>
                    <h3 className='text-center'>List Of Movies</h3>
                    <span><a href='#' className='m-2' onClick={() => {
                        fetchMovie();
                    }}>Show ALL Movies</a></span>
                    <table className='table table-bordered table-striped'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Title</th>
                                <th>Release</th>
                                <th>Description</th>
                                <th>Producer</th>
                                <th>Director</th>
                                <th>Genre</th>
                                <th>Star</th>
                            </tr>
                        </thead>
                        <tbody>
                            {movie ? (movie.map((item, i) => {
                                return (
                                    <tr>
                                        <td>{item.id}</td>
                                        <td>{item.title}</td>
                                        <td>{
                                            new Date(item.release).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: '2-digit',
                                                day: '2-digit',
                                            }).replace(/\//g, '-')
                                        }</td>
                                        <td>{item.description}</td>
                                        <td>{getProducerName(item.producer)}</td>
                                        <td>{getDirectorname(item.director)}</td>
                                        <td>{item.genres.map((item) => {
                                            return (<div key={item}>
                                                {item}
                                            </div>);
                                        })}</td>
                                        <td>{item.stars.map((item, i) => {
                                            return (<div key={i} >{getStarname(item)}</div>)
                                        })}
                                            <div className='text-end'><a href='#'>Add star</a></div>
                                        </td>
                                    </tr>
                                )
                            })) : ("")}
                        </tbody>
                    </table>
                </div>
            </div>
        </ div>
    )
}
