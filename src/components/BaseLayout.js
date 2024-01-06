import React, {useState} from 'react';
import Head from './Head';
import Navbar from './Navbar';
import Footer from './Footer';
import Galaxy from "./Galaxy";
import {BaseExponentProvider} from "./BaseExponentContext";

const BaseLayout = ({ children, pageTitle }) => {
    return (
        <>

{/*            <BaseExponentProvider>*/}
            <Head title={pageTitle} />
            <Navbar />
{/*            <Galaxy/>*/}
            <main className="content-wrapper">{children}
            </main>
            <Footer />
{/*            </BaseExponentProvider>*/}
        </>
    );
};

export default BaseLayout;
