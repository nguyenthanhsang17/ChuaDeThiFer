import React, { useEffect } from 'react'
import axios from "axios";
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function ListProduct() {
    const [products, setProducts] = React.useState([]);
    const [Category, setCategory] = React.useState([]);
    const [Brand, setBrand] = React.useState([]);
    const [chooseBr, setchooseBr] = React.useState(0);
    const [chooseCat, setchooseCat] = React.useState(0);
    const navigate = useNavigate();

    const fetchProducts = async () => {
        const ApiResponse = await axios.get('http://localhost:9999/product');
        const products = ApiResponse.data;
        setProducts(products);
    }

    const fetchCategorys = async () => {
        const ApiResponse = await axios.get('http://localhost:9999/category');
        const categorys = ApiResponse.data;
        setCategory(categorys);
    }

    const fetchBrand = async () => {
        const ApiResponse = await axios.get('http://localhost:9999/brand');
        const brand = ApiResponse.data;
        setBrand(brand);
    }


    const getBrandNameById = (id) => {
        let i = 0;
        for (i = 0; i < Brand.length; i++) {
            if (Brand[i].id == id) {
                return Brand[i].name;
            }
        }
        return "uknow";
    };

    const getCategoryNameById = (id) => {
        let i = 0;
        for (i = 0; i < Category.length; i++) {
            if (Category[i].id == id) {
                return Category[i].name;
            }
        }
        return "uknow";
    };

    const FilterProduct = async () => {
        let url = 'http://localhost:9999/product';
        if (chooseBr != 0) {
            url = url + "?brand=" + chooseBr;
        }
        if (chooseCat != 0) {
            if (chooseBr != 0) {
                url = url + "&category=" + chooseCat;
            } else {
                url = url + "?category=" + chooseCat
            }
        }
        console.log(url);

        const ApiResponse = await axios.get(url);
        const products = ApiResponse.data;
        setProducts(products);
    }

    const GotoDetail = (id) => {
        navigate("/product/" + id);
    }


    useEffect(() => {
        fetchProducts();
        fetchCategorys();
        fetchBrand();
        if (chooseBr != 0 || chooseCat != 0) {
            FilterProduct();
        }
    }, [chooseBr, chooseCat]);

    // hàm search viết useEffect

    return (
        <>
            <h3 style={{ textAlign: 'center' }}>List of Products</h3>

            <div className='row' >
                <div className='col-md-2' >
                    <div className='fs-2'>Categories</div>
                    {Category.map((e, i) => {
                        return (<div key={i}>
                            <input name='Categories' value={chooseCat} type='radio' onClick={() => {
                                setchooseCat(e.id);
                            }} /> <span className='fs-4'>{e.name}</span>
                        </div>)
                    })}

                    <div className='fs-2'>Brands</div>
                    {Brand.map((e, i) => {
                        return (<div key={i}>
                            <input name='Brands' type='radio' value={chooseBr} onClick={() => {
                                setchooseBr(e.id);
                            }} /> <span className='fs-4' >{e.name}</span>
                        </div>)
                    })}
                </div>
                <div className='col-md-10'>
                    <div className='row' >
                        {products.map((e, i) => {
                            return (
                                <div className='col-md-3 p-2'>
                                    <Card className='m-2' key={i} style={{ width: '18rem' }}>
                                        <Card.Header style={{ textAlign: 'center' }}>
                                            <img style={{ width: '100%', height: '200px' }} src={'images/' + e.image} />
                                        </Card.Header>
                                        <Card.Body>
                                            <Card.Title style={{ textAlign: 'center' }} >{e.title}</Card.Title>
                                            <Card.Text>Brand: {Brand ? getBrandNameById(e.brand) : ""}</Card.Text>
                                            <Card.Text>category: {Brand ? getCategoryNameById(e.category) : ""}</Card.Text>


                                            <Card.Text style={{ textAlign: 'center', fontSize: '20px', color: 'blue', textDecoration: 'line-through' }}>
                                                Price: ${e.price}
                                            </Card.Text>

                                            <Card.Text style={{ textAlign: 'center', fontSize: '20px', color: 'red' }}>
                                                Discount: {e.discountPercentage} %
                                            </Card.Text>

                                            <Card.Text style={{ textAlign: 'center', fontSize: '20px', color: 'blue' }}>
                                                Price: ${Math.ceil(e.price - (e.price / 100 * e.discountPercentage))}
                                            </Card.Text>
                                            <div style={{ textAlign: 'center' }}>
                                                <Button style={{ width: '150px', height: '50px', borderRadius: '5px', color: 'white', border: 'none' }}
                                                    onClick={() => {
                                                        GotoDetail(e.id);
                                                    }}>
                                                    View details
                                                </Button>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

        </>
    )
}
