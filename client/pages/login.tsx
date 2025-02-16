"use client";
import React, { useState } from "react";
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from './firebase/config';
import { useRouter } from 'next/navigation';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const [signInWithEmailandPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);   

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await signInWithEmailandPassword(username, password);
            if (user) {
                console.log({res});
                sessionStorage.setItem('user', true);
                setUsername('');
                setPassword('');
                router.push('/helloworld')
            }

            console.log("Success! User signed in.");
        } catch(error) {
            console.error(`error: ${error}`);
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
                <button type="submit" disabled={loading}>
                    {loading ? "Signing In..." : "Sign In"}
                </button>
            </form>
            {error && <p style={{ color: "red" }}>Error: {error.message}</p>}
            <div className="leadToRegister">
                <h4>Don't have an account?</h4>
                <button onClick={() => router.push('/register')}>Register</button>
            </div>
        </div>
    );
};

export default Login;