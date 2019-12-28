import React from 'react';
import { Link } from 'react-router-dom';
const Menu = () => {
    return (
        <div className="ui inverted menu">
            <div className="ui container">
                <Link to="/" className="header item">Quiz Generator</Link>
                <Link to="/" className="item">Home</Link>
                <Link to="/quizlist" className="item">Quiz List</Link>
            </div>
        </div>
    )
};

export default Menu;