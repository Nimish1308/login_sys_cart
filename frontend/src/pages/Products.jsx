import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { useCart } from './CartContext';


const Products = () => {
    const { setCartCount } = useCart();
    const [record, setRecord] = useState([]);
    const getRecord = async () => {
        try {
            const response = await axios.get('https://fakestoreapi.com/products');
            const store = response.data;
            setRecord(store);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    }

    const handleAddToCart = async (product) => {
        const token = localStorage.getItem('token');
        try {
            await axios.post('http://localhost:5000/api/cart/add', {
                productId: product.id,
                image: product.image,
                title: product.title,
                price: product.price
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            // Fetch updated cart to get count 
            const res = await axios.get('http://localhost:5000/api/cart/getall', {
                headers: { Authorization: `Bearer ${token}` }
            });
             setCartCount(res.data.length); // <-- update badge count here



            alert('Added to cart!');
        } catch (err) {
            alert('Error: ' + err.response.data.msg || err.message);
        }
    };

    useEffect(() => {
        getRecord();
    }, [])

    return (
        <>
            <div class="row row-cols-1 row-cols-md-3 g-4 container" style={{ margin: '5px' }}>
                {
                    record.map((item, i) => (
                        <div class="col" key={i}>
                            <div class="card h-100">
                                <img src={item.image} class="card-img-top" alt="Hollywood Sign on The Hill" style={{ width: '50%', height: '40%' }} />
                                <div class="card-body">
                                    <h5 class="card-title">{item.title}</h5>
                                    <p class="card-text">
                                        This is a longer card with supporting text below as a natural lead-in to
                                        additional content. This content is a little bit longer.
                                    </p>
                                    <h5 class="card-title">${item.price}</h5>

                                    <Button variant="success" onClick={() => handleAddToCart(item)}>Add To Cart</Button>
                                </div>
                            </div>
                        </div>

                    ))
                }
            </div>
        </>
    )
}

export default Products
