"use client";
import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
    const router = useRouter();
    const [data, setData] = useState("");

    const userDetails = async () => {
        try {
            const response = await axios.post("/api/user/profile");
            console.log(response.data);
            setData(response.data.data._id);
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log(error.message);
            } else {
                console.log("An unknown error occurred.");
            }
        }
    };

    const logout = async () => {
        try {
            const response = await axios.get("/api/user/logout");
            console.log(response.data);
            toast.success("User logged out successfully");
            router.push("/");
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log(error.message);
            } else {
                console.log("An unknown error occurred.");
            }
        }
    };

    return (
        <div className="min-h-screen from-blue-100 shadow-gray-400 flex items-center justify-center p-6">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold text-gray-800 text-center">Profile Page</h1>
                <hr className="my-4" />
                <h2 className="text-lg text-gray-700 text-center">
                    {data === "nothing" ? (
                        "Nothing"
                    ) : (
                        <Link href={`profile${data}`} className="text-blue-500 hover:underline">
                            {data}
                        </Link>
                    )}
                </h2>
                <hr className="my-4" />
                <div className="flex flex-col space-y-4">
                    <Button onClick={logout}>
                        Logout
                    </Button>
                    <Button
                        onClick={userDetails}
                        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
                    >
                        Get user ID
                    </Button>
                </div>
            </div>
        </div>
    );
}
