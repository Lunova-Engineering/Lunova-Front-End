import React, { useState } from 'react';
import { Container, Row, Col, Tab, Nav, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord, faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons';
import BaseLayout from "../components/BaseLayout";
import '../css/Profile.css';

const Profile = () => {
    const [activeKey, setActiveKey] = useState('settings');

    return (
        <BaseLayout>
            <Container className="mt-5">
            <Row className="align-items-center bg-dark text-white rounded p-3">
                <Col xs={12} md={3} className="text-center">
                    <div className="mb-3 mb-md-0">
                        <div className="profile-picture bg-light rounded-circle d-inline-block"></div>
                    </div>
                </Col>
                <Col xs={12} md={9}>
                    <h1>User's Name</h1>
                    <p className="text-muted">@username</p>
                    {/* Add more user-related information here */}
                </Col>
            </Row>

            <Tab.Container activeKey={activeKey} onSelect={setActiveKey} className="mt-3">
                <Nav variant="tabs" className="justify-content-start">
                    <Nav.Item>
                        <Nav.Link eventKey="settings">Settings</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="messages">Messages</Nav.Link>
                    </Nav.Item>
                </Nav>

                <Tab.Content>
                    <Tab.Pane eventKey="settings" className="bg-light p-4 rounded mt-3">
                        <h2>Account Settings</h2>
                        {/* Add form for account settings here */}
                        <Button variant="outline-secondary" className="w-100 my-2">
                            <FontAwesomeIcon icon={faDiscord} className="me-2"/>
                            Connect to Discord
                        </Button>
                        {/* Add more OAuth buttons with similar structure */}
                    </Tab.Pane>
                    <Tab.Pane eventKey="messages" className="bg-light p-4 rounded mt-3">
                        <h2>Inbox</h2>
                        {/* Add inbox/message display here */}
                    </Tab.Pane>
                </Tab.Content>
            </Tab.Container>
        </Container>
        </BaseLayout>
    );
}

export default Profile;
