import React from 'react';
import BaseLayout from '../components/BaseLayout';
import CountdownComponent from "../components/CountdownComponent";

const Home = () => {
    return (
        <BaseLayout pageTitle="Home">
            <CountdownComponent />
            {/* Other content for the home page */}
        </BaseLayout>
    );
};

export default Home;
