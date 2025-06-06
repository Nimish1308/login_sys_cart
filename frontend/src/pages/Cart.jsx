import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useCart } from './CartContext';


const Cart = () => {
    const { setCartCount } = useCart();
    const [cartItems, setCartItems] = useState([]);
    const token = localStorage.getItem('token');

     const fetchCart = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/cart/getall', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setCartItems(res.data);
                setCartCount(res.data.length); // <-- update badge count here
            } catch (err) {
                alert('Error fetching cart');
            }
        };

    const deleteProduct = async (productId) => {
        try {
            await axios.delete(`http://localhost:5000/api/cart/delete/${productId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCartItems(cartItems.filter(item => item.productId !== productId));
        } catch (err) {
            alert('Error deleting product from cart');
        }
    }

    const handleDecrease = async (productId) => {
        try {
            await axios.put(`http://localhost:5000/api/cart/decrease/${productId}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCartItems(items => items.map(item =>
                item.productId === productId && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            ));
        } catch (err) {
            alert('Error decreasing quantity');
        }
    };

    const handleIncrease = async (productId) => {
        try {
            await axios.put(`http://localhost:5000/api/cart/increase/${productId}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCartItems(items => items.map(item =>
                item.productId === productId
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            ));
        } catch (err) {
            alert('Error increasing quantity');
        }
    };

    useEffect(() => {
    


        fetchCart();
    }, [token]);
    return (
        <>
            <section className="h-100 h-custom" style={{ backgroundColor: "#d2c9ff" }}>
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12">
                            <div className="card card-registration card-registration-2" style={{ borderRadius: "15px", }}>
                                <div className="card-body p-0">
                                    <div className="row g-0">
                                        <div className="col-lg-8">
                                            <div className="p-5">
                                                <div className="d-flex justify-content-between align-items-center mb-5">
                                                    <h1 className="fw-bold mb-0">Shopping Cart</h1>
                                                    <h6 className="mb-0 text-muted">3 items</h6>
                                                </div>
                                                <hr className="my-4" />

                                                {
                                                    cartItems.map((item, index) => (
                                                        <div className="row mb-4 d-flex justify-content-between align-items-center" key={index}>
                                                            <div className="col-md-2 col-lg-2 col-xl-2" >
                                                                <img
                                                                    src={item.image}
                                                                    style={{ width: "100px", height: "100px" }}
                                                                    className="img-fluid rounded-3" alt="Cotton T-shirt" />
                                                            </div>
                                                            <div className="col-md-3 col-lg-3 col-xl-3">
                                                                <h6 className="text-muted">{item.title}</h6>
                                                                {/* <h6 className="mb-0">Cotton T-shirt</h6> */}
                                                            </div>
                                                            <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                                                                <button data-mdb-button-init data-mdb-ripple-init className="btn btn-link px-2"
                                                                    onClick={() => handleDecrease(item.productId)}>
                                                                    <i className="fas fa-minus"></i>
                                                                </button>

                                                                <input id="form1" min="0" name="quantity" value={item.quantity || 1} type="number"
                                                                    className="form-control form-control-sm" />

                                                                <button data-mdb-button-init data-mdb-ripple-init className="btn btn-link px-2"
                                                                    onClick={() => handleIncrease(item.productId)}>
                                                                    <i className="fas fa-plus"></i>
                                                                </button>
                                                            </div>
                                                            <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                                                <h6 className="mb-0">$ {item.price}</h6>
                                                            </div>
                                                            <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                                                                <a href="#!" className="text-muted" onClick={() => deleteProduct(item.productId)}><i className="fas fa-times"></i></a>
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                                <hr className="my-4" />



                                            </div>
                                        </div>
                                        <div className="col-lg-4 bg-body-tertiary">
                                            <div className="p-5">
                                                <h3 className="fw-bold mb-5 mt-2 pt-1">Summary</h3>
                                                <hr className="my-4" />

                                                <div className="d-flex justify-content-between mb-4">
                                                    <h5 className="text-uppercase">items 3</h5>
                                                    <h5>€ 132.00</h5>
                                                </div>

                                                <h5 className="text-uppercase mb-3">Shipping</h5>

                                                <div className="mb-4 pb-2">
                                                    <select data-mdb-select-init>
                                                        <option value="1">Standard-Delivery- €5.00</option>
                                                        <option value="2">Two</option>
                                                        <option value="3">Three</option>
                                                        <option value="4">Four</option>
                                                    </select>
                                                </div>

                                                <h5 className="text-uppercase mb-3">Give code</h5>

                                                <div className="mb-5">
                                                    <div data-mdb-input-init className="form-outline">
                                                        <input type="text" id="form3Examplea2" className="form-control form-control-lg" />
                                                        <label className="form-label" for="form3Examplea2">Enter your code</label>
                                                    </div>
                                                </div>

                                                <hr className="my-4" />

                                                <div className="d-flex justify-content-between mb-5">
                                                    <h5 className="text-uppercase">Total price</h5>
                                                    <h5>€ 137.00</h5>
                                                </div>

                                                <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-dark btn-block btn-lg"
                                                    data-mdb-ripple-color="dark">Register</button>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Cart
