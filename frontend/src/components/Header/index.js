import React from 'react';
import './index.css';

export default function Header (props){
    return (
        <header>
            <div className="col6">
                <h1>Fender</h1>
            </div>
            <div className="col6">
                <nav>
                    <ul>
                        <li><a href="/">GET</a></li>
                        <li><a href="/post">POST</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}