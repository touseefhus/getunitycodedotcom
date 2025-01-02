"use client";
import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
interface RegisterProps {
    onSwitch: () => void;
    onClose: () => void;
}
const RegisterPage: React.FC<RegisterProps> = ({ onSwitch, onClose }) => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!name || !email || !password) {
            toast.error("All fields are required!");
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post("/api/user/register", {
                name,
                email,
                password,
            });

            toast.success("User registered successfully!");
            setName("");
            setEmail("");
            setPassword("");

            // close dialog successfully register
            setTimeout(() => {
                onClose
            }, 3000)
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response) {
                if (error.response.status === 400) {
                    toast.error("User already exists!");
                } else {
                    toast.error(error.response.data.message || "An error occurred!");
                }
            } else {
                toast.error("Something went wrong. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <ToastContainer position="top-right" autoClose={3000} />
            <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
                    Register
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-600 text-sm font-medium mb-2">
                            Name
                        </label>
                        <input
                            type="text"
                            className="input w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400 focus:outline-none"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600 text-sm font-medium mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            className="input w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400 focus:outline-none"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600 text-sm font-medium mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            className="input w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400 focus:outline-none"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn-primary w-full bg-green-500 text-white font-medium py-2 rounded-md hover:bg-green-600 transition"
                        disabled={loading}
                    >
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>
                <p className="mt-4 text-sm text-gray-600 text-center">
                    Already have an account?{" "}
                    <button
                        className="text-blue-500 underline hover:text-blue-700 transition"
                        onClick={onSwitch}
                    >
                        Login
                    </button>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
