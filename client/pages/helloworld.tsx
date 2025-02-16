"use client";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/config";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";

const HelloWorld: React.FC = () => {
    const [user] = useAuthState(auth);
    const router = useRouter();

    // Redirect to /register if no user is found
    useEffect(() => {
        const userSession = sessionStorage.getItem("user");
        if (!user || !userSession) {
            router.push("/register");
        }
    }, [user, router]);

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            sessionStorage.removeItem("user");
            router.push("/register"); // Redirect after sign-out
        } catch (error) {
            console.error("Sign-out error:", error);
        }
    };

    return (
        <div>
            <h1>HELLO WORLD.</h1>
            <button onClick={handleSignOut}>SIGN OUT</button>
        </div>
    );
};

export default HelloWorld;
