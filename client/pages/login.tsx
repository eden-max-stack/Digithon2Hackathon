"use client";
import React, { useState } from "react";
import axios from 'axios';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8087/auth', {
                user: username,
                password: password,
                },
                { withCredentials: true}
            );

            console.log(response.data);
            setMessage(response.data.success);
            console.log("Success!");
        }
    }
    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input 
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)} 
                required 
                />
                <label htmlFor="password">Password:</label>
                <input 
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
                required 
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;