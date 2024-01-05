import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpaceShuttle } from '@fortawesome/free-solid-svg-icons';
import '../css/NotFound.css'; // Make sure to create a NotFound.css file for custom styles

const NotFoundComponent = () => {
    return (
        <div className="not-found-container">
            <FontAwesomeIcon icon={faSpaceShuttle} className="huge-icon" />
            <h1>404 - Not Found</h1>
            <p>Looks like the page you're looking for drifted off into space....</p>
        </div>
    );
};

export default NotFoundComponent;
