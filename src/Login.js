import React, { useState } from 'react';
import axios from 'axios';

export const Login = ({ setToken }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/api/login', { username, password });
            const { token } = response.data;
            setToken(token);
            localStorage.setItem('token', token);
        } catch (error) {
            alert('Login failed');
        }
    };

    return (
        <div className="container">
            <h2>Login</h2>
            <form onSubmit={ handleLogin }>
                <input
                    type="text"
                    placeholder="Username"
                    value={ username }
                    onChange={ (e) => setUsername(e.target.value) }
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={ password }
                    onChange={ (e) => setPassword(e.target.value) }
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};


