import React from 'react';
import BaseLayout from '../components/BaseLayout';
import CountdownComponent from "../components/CountdownComponent";
import NotFoundComponent from "../components/NotFoundComponent";

const NotFound = () => {
    return (
        <BaseLayout pageTitle="Home">
            <NotFoundComponent />
        </BaseLayout>
    );
};

export default NotFound;
