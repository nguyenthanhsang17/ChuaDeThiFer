import axios from 'axios';
import { Button } from 'bootstrap';
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function AddStart() {
    const { id } = useParams();
    const [movie, setMovie] = React.useState({});
    const [star, setStar] = React.useState([]);
    const [star1, setstar1] = React.useState([]);
    const navigate = useNavigate();
    const fetchStar = async () => {
        const api = await axios.get("http://localhost:9999/stars");
        setStar(api.data);
    }

    const getMovieDetail = async () => {
        const api = await axios.get("http://localhost:9999/movies/" + id);
        setMovie(api.data);
        let arr = [];
        api.data.stars.forEach((item) => {
            arr.push(item + "");
        })
        setstar1(arr);
        console.log(api.data.stars);
    }


    // const checkExits = (id)=>{
    //     let check = false;
    //     star1.map((item, i)=>{
    //         if(item==id){
    //             check = true;
    //             return check;
    //         }
    //     })
    //     return check;
    // }

    const ChangeStar = (id) => {
        setstar1((prevStars) => {
            if (prevStars.includes(id)) {
                return prevStars.filter((s) => s !== id);
            } else {
                return [...prevStars, id];
            }
        });
    }
    const update = async () => {
        let arr = [];
        star1.map((item, i) =>{
            arr.push(Number.parseInt(item));
        });
        try {
            const api = axios.put("http://localhost:9999/movies/" + id, {
                title: movie.title,
                release: movie.release,
                description: movie.description,
                producer: movie.producer,
                director: movie.director,
                genres: movie.genres,
                stars: arr
            })
            alert("Add Start successfully !!!");
            navigate("/movie");
        }
        catch (error) {
            alert("Add Start failed !!!");
        }
    }

    useEffect(() => {
        getMovieDetail();
        fetchStar();
        console.log(star1);
    }, [])

    useEffect(() => {
        console.log("✅ star1 updated:", star1);
    }, [star1]);

    return (
        <div className='p-5'>
            <h2 className='text-center'>Add start to the movie</h2>
            <h5 style={{ fontWeight: 'bold', fontSize: '20px' }}>Movie title</h5>
            <input type="text" className="form-control" disabled value={movie.title} />
            <h5 style={{ fontWeight: 'bold', fontSize: '20px' }}>Stars</h5>
            {star ? (star.map((item, i) => {
                return (<span className='m-4' ><input type='checkbox' checked={star1.includes(item.id)} onChange={() => {
                    ChangeStar(item.id);
                }} /> {item.fullname}</span>)
            })) : ("")}
            <div><button onClick={() => {
                update()
            }} style={{ backgroundColor: 'green', borderRadius: '5px', border: '0px', color: 'white' }}>Add Star</button></div>
        </div>
    )
}
