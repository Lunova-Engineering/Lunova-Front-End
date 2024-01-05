import React, { useState } from 'react';
import BaseLayout from '../components/BaseLayout';
import '../css/Forms.css';
import '../css/Buttons.css';
import '../css/Text.css';
import axios from "axios";
import httpStatus from "../helper/HttpStatus";
import HttpStatus from "../helper/HttpStatus";
import {Button} from "react-bootstrap";
import {NavLink} from "react-router-dom";

const Register = () => {
    //Form control states
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    //Message display states
    const [message, setMessage] = useState('');
    const [messageFlag, setMessageFlag] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    function displayMessage(message, error) {
        setMessage(message);
        setErrorMessage(error);
        setMessageFlag(true);
    }

    function clearMessage() {
        setMessage('');
        setMessageFlag(false);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(password === '' || username === '' || email === '') {
            displayMessage("All fields must be filled out!", true);
            return;
        }
        //TODO check for input validation including length, complexity, special characters, etc.

        try {
            const response = await axios.post('http://localhost:8000/api/register', {
                username,
                password,
                email
            });
            if(response.status !== HttpStatus.CREATED_201.code) {
                throw new Error(response.status || response.statusText);
            }
                displayMessage("Registration Successful!", false);
                //TODO verified successful creation of account and registration, now needs to complete authentication with email.


        } catch (error) {
            const res = httpStatus.findStatusByCode(error.response.status);
            console.error("Error code " + res.code + ": " + res.message);
            console.error('Registration server error', error);
            displayMessage(error.response.data.message, true);
        }
    }

    return (
        <BaseLayout pageTitle="Register">
            <div className="form-container pt-5">
                <div className="form-box">
                    <h2 className="register-header mt-3 mb-4">Register</h2>
                    <form onSubmit={handleSubmit}>
                        {/* Username Input */}
                        <div className="mb-4">
                            <input
                                type="username"
                                className="form-control input-field border-dark-subtle" //TODO change border color success / fail based on valid input
                                id="username"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        {/* Password Input */}
                        <div className="mb-4">
                            <input
                                type="password"
                                className="form-control input-field border-dark-subtle" //TODO change border color success / fail based on valid input
                                id="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        {/* Email Input */}
                        <div className="mb-4">
                            <input
                                type="email"
                                className="form-control input-field border-dark-subtle" //TODO change border color success / fail based on valid input
                                id="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="btn-group-vertical w-100">
                            <button type="submit" className="btn btn-outline-success rounded-pill mb-2">
                                Submit
                            </button>
                            <NavLink to="/login" className="btn btn-outline-primary rounded-pill w-100">
                                I already have an account
                            </NavLink>
                        </div>

                        {(messageFlag)&& <div className={((errorMessage) ? "error-message" : "success-message") + " mt-3"}>{message}</div>}
                    </form>
                </div>

            </div>
        </BaseLayout>
    );
}

export default Register;
