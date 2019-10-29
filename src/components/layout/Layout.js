import React from 'react';
import Head from 'next/head';
import Navbar from '../navbar/Navbar';


const Layout = (props) => (  <div>
        <Head>
            <title>Hacker News</title>
        </Head>
        <div className="container-fluid">
            <Navbar />
            {props.children}
        </div>
    </div>
);

export default Layout;
