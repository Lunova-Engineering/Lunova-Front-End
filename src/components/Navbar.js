import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Navbar.css';
import {NavLink} from "react-router-dom";
import {useAuth} from "./AuthProvider";
import ProfileIcon from "./ProfileIcon";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHouse} from "@fortawesome/free-solid-svg-icons";

function Navbar() {
    const {token, signOut} = useAuth();
    const handleLogout = () => {
        signOut(() => {
            //go to log in page
        });
    };
    return (
        <nav className="navbar navbar-expand-lg rounded-pill ms-4 me-4 mt-2 ps-3 ">
            <div className="container-fluid">
                <ul className="navbar-nav me-auto">
                    <li className="nav-item px-2"><NavLink to="/" className="nav-link">
                        <FontAwesomeIcon className="fa-home-icon-bounce" icon={faHouse} beatFade size="xl" style={{color: "#ebebeb",}} />
                    </NavLink> </li>
                    <li className="nav-item px-2"><NavLink to="/moonbot" className="nav-link">Moon Bot</NavLink> </li>
                    <li className="nav-item px-2"><NavLink to="/moonbot" className="nav-link">About Us</NavLink> </li>
                    {/*<li className="nav-item px-2"><NavLink to="/moon-bot" className="nav-link">Moon Bot</NavLink> </li>*/}
{/*                    <li className="nav-item px-2"><a className="nav-link" href="">Github</a> </li>
                    <li className="nav-item px-2"><a className="nav-link" href="">Developers</a> </li>*/}
                </ul>
                <ul className="navbar-nav mS-auto">
                    {token ?
                        (<ProfileIcon />)
                        : (<li className="nav-item px-2"><NavLink to="/login"
                                                                  className="btn btn-outline-success rounded-pill">Log
                            In</NavLink></li>)}
                    {/*<li className="nav-item px-2"><NavLink to="/register" className="btn btn-primary rounded-pill">Register</NavLink> </li>*/}
                </ul>
            </div>
            {/*            <div className="collapse navbar-collapse">
                <ul className="navbar-nav">
                    <li className="nav-item"><a className="nav-link" href="/">Moon Bot</a></li>
                    <li className="nav-item"><a className="nav-link"
                                                href="https://github.com/Lunova-Engineering">Github</a></li>
                </ul>
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item"><a className="btn btn-success rounded-pill" href="/">Log In</a></li>
                    <li className="nav-item"><a className="btn btn-primary rounded-pill"
                                                href="https://github.com/Lunova-Engineering">Register</a></li>
                </ul>
            </div>*/}
        </nav>
    );

}

export default Navbar;
