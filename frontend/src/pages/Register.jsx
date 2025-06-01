import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router'
import axios from 'axios';
import { toast } from 'react-toastify';

const Register = () => {
    const [user, setUser] = useState({ name: '', email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = e => setUser({ ...user, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/auth/register', user);
            navigate('/');  //navigate to login
            toast.success("Registration Successfull")
        } catch (err) {
            alert(err.response.data.msg);
        }
    };
    return (
        <>
            <section className="vh-100">
                <div className="container-fluid h-custom">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-md-9 col-lg-6 col-xl-5">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                                className="img-fluid" alt="Sample image" />
                        </div>
                        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                            <form onSubmit={handleSubmit}>
                                <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                                    <p className="lead fw-normal mb-0 me-3">Sign in with</p>
                                    <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-floating mx-1">
                                        <i className="fab fa-facebook-f"></i>
                                    </button>

                                    <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-floating mx-1">
                                        <i className="fab fa-twitter"></i>
                                    </button>

                                    <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-floating mx-1">
                                        <i className="fab fa-linkedin-in"></i>
                                    </button>
                                </div>

                                <div className="divider d-flex align-items-center my-4">
                                    <p className="text-center fw-bold mx-3 mb-0">Or</p>
                                </div>


                                <div data-mdb-input-init className="form-outline mb-4">
                                    <input type="text" id="form3Example3" className="form-control form-control-lg"
                                        placeholder="Enter name" name='name' onChange={handleChange}/>
                                    <label className="form-label" for="form3Example3">Enter name</label>
                                </div>

                                <div data-mdb-input-init className="form-outline mb-4">
                                    <input type="email" id="form3Example3" className="form-control form-control-lg"
                                        placeholder="Enter a valid email address" name='email' onChange={handleChange}/>
                                    <label className="form-label" for="form3Example3">Email address</label>
                                </div>


                                <div data-mdb-input-init className="form-outline mb-3">
                                    <input type="password" id="form3Example4" className="form-control form-control-lg"
                                        placeholder="Enter password" name='password' onChange={handleChange}/>
                                    <label className="form-label" for="form3Example4">Password</label>
                                </div>



                                <div className="text-center text-lg-start mt-4 pt-2">
                                    <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg"
                                        style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}>Register</button>
                                    <p className="small fw-bold mt-2 pt-1 mb-0">Already have an account? <Link to={`/`}
                                        className="link-danger">Login</Link></p>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
                <div
                    className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">

                    <div className="text-white mb-3 mb-md-0">
                        Copyright © 2020. All rights reserved.
                    </div>

                    <div>
                        <a href="#!" className="text-white me-4">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="#!" className="text-white me-4">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="#!" className="text-white me-4">
                            <i className="fab fa-google"></i>
                        </a>
                        <a href="#!" className="text-white">
                            <i className="fab fa-linkedin-in"></i>
                        </a>
                    </div>

                </div>
            </section>
        </>
    )
}

export default Register
