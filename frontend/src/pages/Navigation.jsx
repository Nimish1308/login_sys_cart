import React, { useEffect } from 'react'
import { Dropdown, Collapse, initMDB } from "mdb-ui-kit";
// import 'mdb-ui-kit/js/mdb.umd.min.js';
import { Link, Navigate } from 'react-router';
import { toast } from 'react-toastify';
import { useCart } from './CartContext';

const Navigation = () => {
    const { cartCount } = useCart();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        Navigate('/'); // Redirect to login page
        toast.success("Logout Sucessfully")

    };

    useEffect(() => {
        initMDB({ Dropdown, Collapse });

    }, [])
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary" style={{position:'sticky',top:'0',zIndex:'10'}}>
                <div className="container-fluid">
                    <button
                        data-mdb-collapse-init
                        className="navbar-toggler"
                        type="button"
                        data-mdb-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <i className="fas fa-bars"></i>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <a className="navbar-brand mt-2 mt-lg-0" href="#">
                            <img
                                src="https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.webp"
                                height="15"
                                alt="MDB Logo"
                                loading="lazy"
                            />
                        </a>
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" to={`/dashboard`}>Dashboard</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={`/products`}>Products</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={`/`}>Login</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to={`/register`}>Register</Link>
                            </li>
                        </ul>
                    </div>

                    <div className="d-flex align-items-center">

                        <Link to={'/cart'} className="text-reset me-3" >
                            <i className="fas fa-shopping-cart"></i>
                            <span className="badge rounded-pill badge-notification bg-danger">{cartCount}</span>
                        </Link>


                        <div className="dropdown">
                            <a
                                data-mdb-dropdown-init
                                className="text-reset me-3 dropdown-toggle hidden-arrow"
                                href="#"
                                id="navbarDropdownMenuLink"
                                role="button"
                                aria-expanded="false"
                            >
                                <i className="fas fa-bell"></i>
                                <span className="badge rounded-pill badge-notification bg-danger">1</span>
                            </a>
                            <ul
                                className="dropdown-menu dropdown-menu-end"
                                aria-labelledby="navbarDropdownMenuLink"
                            >
                                <li>
                                    <a className="dropdown-item" href="#">Some news</a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#">Another news</a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#">Something else here</a>
                                </li>
                            </ul>
                        </div>
                        <div className="dropdown">
                            <a
                                data-mdb-dropdown-init
                                className="dropdown-toggle d-flex align-items-center hidden-arrow"
                                href="#"
                                id="navbarDropdownMenuAvatar"
                                role="button"
                                aria-expanded="false"
                            >
                                <img
                                    src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                                    className="rounded-circle"
                                    height="25"
                                    alt="Black and White Portrait of a Man"
                                    loading="lazy"
                                />
                            </a>
                            <ul
                                className="dropdown-menu dropdown-menu-end"
                                aria-labelledby="navbarDropdownMenuAvatar"
                            >
                                <li>
                                    <a className="dropdown-item" href="#">My profile</a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#">Settings</a>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to={`/`} onClick={handleLogout}>Logout</Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>

            </nav>

        </>
    )
}

export default Navigation
