"use client";
import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "../ui/button";

interface LoginPageProps {
    onSwitch: () => void; // Switch to Register
    onClose: () => void; // Close dialog
}

const LoginPage: React.FC<LoginPageProps> = ({ onSwitch, onClose }) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        // Validation: All fields required
        if (!email || !password) {
            toast.error("All fields are required");
            return;
        }

        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const response = await axios.post("/api/user/login", { email, password });

            // Reset the form
            setEmail("");
            setPassword("");

            // Show success toast
            toast.success("Login Successfully");

            // Delay the dialog close to ensure toast is shown first
            setTimeout(() => {
                onClose(); // Close dialog after toast message
            }, 3000); // Delay in milliseconds (same duration as toast autoClose)
        } catch (error: unknown) {
            // Handle errors
            if (axios.isAxiosError(error) && error.response) {
                if (error.response.status === 400) {
                    toast.error("Invalid email or password");
                }
                setError(error.response.data.message || "An error occurred");
            } else {
                setError("Something went wrong. Please try again later.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <ToastContainer position="top-right" autoClose={3000} />
            <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-600 text-sm font-medium mb-2">Email</label>
                        <input
                            type="email"
                            className="input w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600 text-sm font-medium mb-2">Password</label>
                        <input
                            type="password"
                            className="input w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <Button type="submit"
                        className="w-full bg-blue-500 font-medium custom-btn"
                        disabled={loading}>{loading ? "Logging in..." : "Login"}</Button>
                </form>
                <p className="mt-4 text-sm text-gray-600 text-center">
                    Don't have an account?{" "}
                    <button
                        className="text-blue-500 underline hover:text-blue-700 transition"
                        onClick={onSwitch}
                    >
                        Register
                    </button>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
