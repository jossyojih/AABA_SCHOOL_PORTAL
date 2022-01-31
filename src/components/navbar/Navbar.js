import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { NavLink } from 'react-router-dom';



function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(null)
    const [toggleNav, setToggleNav] = useState(false)
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        /*
        
        console.log(width)
        */
        function handleResize() {
            setWidth(window.innerWidth);
        }
        window.addEventListener("resize", handleResize);


        return () => window.removeEventListener("resize", handleResize);
    }, [width])

    useEffect(() => {
        // if (width < 768 && step === 1){
        // setStep(2)
        // } else if(width>768){
        // setStep(1)
        // };
    }, [width]);


    useEffect(() => {
        setIsLoggedIn(localStorage.getItem("admin"))

    }, [setIsLoggedIn]);
    const handleLogout = () => {
        localStorage.clear();
        setIsLoggedIn(false)
    };


    return (
        <nav className="navbar navbar-expand-lg navbar-light">
            <NavLink className="navbar-brand" to="/">AABA</NavLink>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item ">
                        <NavLink exact to="/" className="nav-link" activeClassName='nav-link-active'>Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink exact to="/about" className="nav-link " activeClassName="nav-link-active">About</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink exact to="/scholarships" className="nav-link" activeClassName="nav-link-active">Blog</NavLink>
                    </li>
                    {/* <li className="nav-item">
                            <NavLink className="nav-link" to="/articles">Articles</Link>
                        </li> */}
                    <li className="nav-item">
                        <NavLink exact to="/contact" className="nav-link" activeClassName="nav-link-active">Contact</NavLink>
                    </li>
                    <li className="nav-item ">
                        <NavLink exact to="/login" className="logout" >School Portal</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
export default Navbar;