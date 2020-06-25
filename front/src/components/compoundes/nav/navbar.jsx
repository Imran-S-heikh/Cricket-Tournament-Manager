import React from 'react';
import './navbar.style.scss';
import { Link } from 'react-router-dom';

function Nav (){
    return (
        <div className="nav-container">
            <div className="logo">
                Logo
            </div>
            <ul className="nav-items">
                <Link to="/">
                    <li>Home</li>
                </Link>
                <Link to="/account">
                    <li>Account</li>
                </Link>
                <Link to="/login">
                    <li>SignIn</li>
                </Link>
                <Link to="/signup">
                    <li>SignUp</li>
                </Link>
            </ul>
        </div>
    )
}

export default Nav;