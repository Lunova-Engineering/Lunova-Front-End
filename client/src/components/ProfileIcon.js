import React from 'react';
import { Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/ProfileIcon.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import {LinkContainer} from 'react-router-bootstrap';
import {useAuth} from "./AuthProvider";

const ProfileIcon = () => {
    const {signOut} = useAuth();

    function handleLogout() {
        signOut(() => {
            console.log("User Logged out");
        });
    }

    return (
        <Dropdown align="end">
            <Dropdown.Toggle variant="outline-success" id="dropdown-basic" className="rounded-circle" style={{ width: "3rem", height: "3rem" }}>
                <FontAwesomeIcon icon={faUser} style={{ fontSize: "1.5rem" }}/>
            </Dropdown.Toggle>

            <Dropdown.Menu variant="dark">
                <LinkContainer to="/profile">
                    <Dropdown.Item eventKey="1" className="no-highlight">Profile</Dropdown.Item>
                </LinkContainer>
                <LinkContainer to="/settings">
                    <Dropdown.Item eventKey="2" className="no-highlight">Settings</Dropdown.Item>
                </LinkContainer>
                <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogout} eventKey="3" className="no-highlight">Log Out</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default ProfileIcon;
