"use client";
import React, { useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "./firebase/config";
import { useRouter } from "next/router";

const Register: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    // Corrected function name
    const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password) {
            console.error("Email and password are required.");
            return;
        }

        console.log("Attempting to register with:", email, password);

        try {
            const res = await createUserWithEmailAndPassword(email, password);
            if (res) {
                console.log("Success! User registered:", res.user);
                sessionStorage.setItem('user', true);
                setEmail('');
                setPassword('');
            }
        } catch (error) {
            console.error("Firebase Auth Error:", error);
        }
    };

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input
                    type="email" 
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    {loading ? "Registering..." : "Register"}
                </button>
            </form>
            {error && <p style={{ color: "red" }}>Error: {error.message}</p>}
            <div className="leadToLogin">
                <h4>Already have an account?</h4>
                <button onClick={() => router.push('/login')}>Login</button>
            </div>
        </div>
    );
};

export default Register;
