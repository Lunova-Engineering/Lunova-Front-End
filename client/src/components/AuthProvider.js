import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {jwtDecode} from "jwt-decode";

// Create a context
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null); // Store the token

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(jwtDecode(storedToken)); // Set the token from localStorage
        }
    }, []);

    const signIn = async (token, callback) => {
        try {
            const decoded = jwtDecode(token); // Decode received token
            setToken(decoded); // Set user with decoded token details
            localStorage.setItem('token', token); // Store token in localStorage, not entire user object
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            callback(decoded); // Proceed with the callback, using the decoded data
        } catch (error) {
            console.error("Token decoding failed:", error);
            // Handle token decoding errors, e.g., by showing an error message
        }
    };

    const signOut = (callback) => {
        setToken(null);
        localStorage.removeItem('token'); // Remove token from localStorage
        callback();
    };

    const value = { token: token, signIn, signOut }; // Provide token and auth methods

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};
