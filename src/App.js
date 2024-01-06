import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Galaxy from "./components/Galaxy";
import {BaseExponentProvider} from "./components/BaseExponentContext";
import Profile from "./pages/Profile"; // Assuming BaseLayout is in the components folder
// Assuming HomePage is in the components folder

const App = () => {
    return (
            <Router>
                <BaseExponentProvider>
                    <Galaxy/>
                    <Routes>

                            <Route path="/" element={<Home/>}/>
                            <Route path="/login" element={<Login/>}/>
                            <Route path="/register" element={<Register/>}/>
                            <Route path="/profile" element={<Profile />}/>
                            <Route path="*" element={<NotFound/>}/>

                    </Routes>

                </BaseExponentProvider>
            </Router>
    );
};

export default App;
