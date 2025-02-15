"use client";
import React, { useEffect, useState } from "react";

const Home: React.FC = () => {
    const [message, setMessage] = useState<string>("");

    useEffect(() => {
        fetch("http://localhost:8087/api/events")
            .then((res) => res.json())  
            .then((data) => {
                console.log("Fetched Data:", data); 
                setMessage(data.message); 
            })
            .catch((err) => console.error("Error fetching data:", err));
    }, []);

    return (
        <div>
            <h1>API Response:</h1>
            <p>{message}</p>  
        </div>
    );
};

export default Home;
