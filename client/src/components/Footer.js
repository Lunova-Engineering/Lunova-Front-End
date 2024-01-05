import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import "../css/Common.css"

const Footer = () => {
    return (
        <footer className="text-white bg-dark bg-opacity-75 py-3 mt-4">
            <div className="container sticky-footer">
                <p className="mb-1">&copy; 2023 Lunova Engineering. All rights reserved.</p>
                <p className="mb-0">
                    <a href="#">Privacy Policy</a> | &nbsp;
                    <a href="#">Terms of Service</a> |&nbsp;
                    <a href="#">Contact Us</a>
                </p>
            </div>
        </footer>

    );
};

export default Footer;
