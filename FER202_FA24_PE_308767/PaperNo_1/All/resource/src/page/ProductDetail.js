import axios from 'axios';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
export default function ProductDetail() {
  const [product, setProduct] = React.useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const GetProductDetailById = async () => {
    const url = `http://localhost:9999/product/${id}`;
    const api = await axios.get(url);
    const data = api.data;
    console.log(data);
    setProduct(data);
  }

  useEffect(() => {
    GetProductDetailById();
  }, []);



  const DeteleProduct = (id) => {
    const check = window.confirm("Do you want delete this product ?");
    if (check) {
      const url = `http://localhost:9999/product/${id}`;
      const api = axios.delete(url);
      const code = api.status;
      navigate('/');
    }
  }



  return (
    <div className='row mt-5 p-5'>
      <div className='col-md-4'>
        <img style={{ width: '100%', height: '300px' }} src={"http://localhost:3000/images/" + product.image} />
      </div>
      <div className='col-md-8'>
        <h3>Product details: {product.title}</h3>
        <strong>id: {product.id}</strong>
        <div><span style={{ fontWeight: 'bold' }}>Description: </span>{product.description}</div>
        <div style={{ color: 'blue', textDecoration: 'line-through' }} >Price: $ {product.price}</div>
        <div style={{ color: 'red' }}>Discount: {product.discountPercentage} %</div>
        <div style={{ color: 'blue', fontWeight: 'bold' }}>New Price: {Math.ceil(product.price - (product.price / 100 * product.discountPercentage))} $</div>
        <div><span style={{ fontWeight: 'bold' }} >Rating: </span> {product.rating} </div>
        <div><span style={{ fontWeight: 'bold' }}>Stock: </span> {product.stock}</div>
        <div className='mt-5'>
          <Button className='m-2' onClick={() => {
            navigate('/');
          }}>
            Back to list
          </Button>
          <Button onClick={() => {
            DeteleProduct(product.id);
          }}>
            delete
          </Button>
        </div>
      </div>
    </div>
  )
}
