import React, {useContext, useState} from 'react';
import BaseLayout from '../components/BaseLayout';
import '../css/Login.css';
import '../css/Forms.css';
import '../css/Buttons.css';
import {NavLink, useNavigate} from 'react-router-dom';
import { useAuth } from '../components/AuthProvider'; // Adjust the path as necessary
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(''); // for displaying messages to the user
    const [isError, setIsError] = useState(false); // to indicate if there is an error
    const history = useNavigate();
    const { signIn } = useAuth(); // Consume the context
    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        setMessage(''); // Reset message at each submit
        setIsError(false); // Reset error flag

        try {
            const response = await axios.post('http://localhost:8000/api/login', { username, password });
            if(!response.data.token)
                throw new Error(response.status || response.statusText);
            // Set message for user feedback based on response
            if (response.data.token) {

                signIn(response.data.token, () => {
                    history("/"); // Redirect user after login
                });
                setMessage('Logged in successfully');
                history("/");
                // You might want to store the token in localStorage/sessionStorage and redirect
            }
        } catch (error) {
            console.error('Login error', error);
            setMessage('Login failed: ' + error.response.data.message);
            setIsError(true);
        }
    };

    return (
        <BaseLayout pageTitle="Login">
            <div className="form-container pt-5">
                <div className="form-box login-box">
                    <h2 className="login-header form-header mt-3 mb-3">Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <input
                                type="username"
                                className="form-control input-field border-dark"
                                id="username"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="password"
                                className="form-control input-field border-dark"
                                id="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="btn-group-vertical w-100">
                            <button type="submit" className="btn btn-outline-success rounded-pill mb-3">
                                Login
                            </button>
                            <NavLink to="/register"
                                     className="btn btn-outline-primary rounded-pill mb-3">Register</NavLink>
                        </div>
                    </form>
                    <div className={isError ? "error-message" : "success-message"}>
                    {message}
                    </div>
                </div>

            </div>
        </BaseLayout>
    );
};

export default Login;
