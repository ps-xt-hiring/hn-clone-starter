import React from 'react';
import Link from 'next/link';
import './navbar.css';
// import logo from '../public/logo.gif';


const Navbar = () => (
    <header>
        <nav className="navbar navbar-expand-lg navbar-dark default-color">
            <Link href="/news"><a href="/news" className="navbar-brand"><strong>Y</strong></a></Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link href="/news"><a href="/news" className="nav-link">top</a></Link>
                    </li>
                    <li className="vline"></li>
                    <li className="nav-item">
                        <Link href="/new"><a href="/new" className="nav-link">new</a></Link>
                    </li>
                </ul>
            </div>
        </nav>

    </header>

);

export default Navbar;