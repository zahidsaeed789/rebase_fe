import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

interface User {
    name: string;
}

const Dashboard: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            // Redirect to login if no user is found
            navigate("/");
        }
    }, [navigate]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-6">
                <h1 className="text-2xl font-semibold text-center text-gray-700">
                    Welcome to the Dashboard
                </h1>
                {user ? (
                    <p className="mt-4 text-center text-gray-600">
                        Hello, <span className="font-medium">{user.name}</span>!
                    </p>
                ) : (
                    <p className="mt-4 text-center text-gray-600">Loading...</p>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
