"use client";
import React, { useState } from "react";
import Login from "@/components/auth/login";
import Register from "@/components/auth/register";
import { Button } from "@/components/ui/button";

const Page = () => {
    const [activeModal, setActiveModal] = useState<"login" | "register" | null>(null);

    const handleLoginClick = () => {
        setActiveModal("login");
    };

    const handleRegisterClick = () => {
        setActiveModal("register");
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="text-center bg-white p-8 rounded-lg shadow-lg shadow-gray-300 max-w-md">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">
                    🚪 Access Denied!
                </h1>
                <p className="text-gray-600 mb-6">
                    You need to log in first to access this page. Please log in to continue.
                </p>
                <div className="flex justify-center space-x-4">
                    <Button onClick={handleLoginClick}>Login</Button>
                </div>
            </div>

            {/* Modal Logic */}
            {activeModal === "login" && (
                <Login
                    onLoginSuccess={open}
                    open={true}
                    onOpenChange={(open) => open ? setActiveModal("login") : setActiveModal(null)}
                    onRegisterClick={handleRegisterClick}
                />
            )}

            {activeModal === "register" && (
                <Register
                    open={true}
                    onOpenChange={(open) => open ? setActiveModal("register") : setActiveModal(null)}
                />
            )}
        </div>
    );
};

export default Page;