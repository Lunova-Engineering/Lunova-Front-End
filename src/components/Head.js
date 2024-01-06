import React from 'react';
import { Helmet } from 'react-helmet';
import '../assets/favicon.ico'

const Head = ({ title }) => {
    return (
        <Helmet>
            <title>{title}</title>
            <link rel="icon" type="image/ico" href="../assets/favicon.ico"/>

            <meta name="description"
                  content="Lunova Engineering is a personal LLC focused on learning, contributing to open source projects,
              and creating useful tools for users across various platforms and for a wide array of needs."
            />
        </Helmet>
    );
};

export default Head;