import React from 'react';
import LoginForm from '../LoginForm';
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <div className="ui one column centered middle aligned grid" style={{ height: "50vh" }}>
            <div className="column eight wide">
                <h2 className="ui container centered teal header">
                    <div className="content">
                        Log-in to your account
                    </div>
                </h2>
                <LoginForm />
                <div className="ui container message">
                    New User? <Link to="/registration">Sign Up</Link>
                </div>
            </div>
        </div >
    );
};

export default Login;