"use client";

import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddGame() {
    const [gameName, setGameName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState<File | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!image) {
            toast.error("Please upload an image.", {
                position: "top-right",
            });
            return;
        }

        const formData = new FormData();
        formData.append("name", gameName);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("category", category);
        formData.append("image", image);

        try {
            const response = await fetch("/api/games", {
                method: "POST",
                body: formData, // FormData is automatically set with the correct content type
            });

            if (response.ok) {
                toast.success("Game added successfully!", {
                    position: "top-right",
                });
                // Reset the form
                setGameName("");
                setDescription("");
                setPrice("");
                setCategory("");
                setImage(null);
            } else {
                const errorData = await response.json();
                toast.error(`Error: ${errorData.error}`, {
                    position: "top-right",
                });
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("Something went wrong. Please try again.", {
                position: "top-right",
            });
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
                <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">Add New Game</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Game Name */}
                    <div>
                        <label htmlFor="gameName" className="block text-gray-700 font-medium">
                            Game Name
                        </label>
                        <input
                            type="text"
                            id="gameName"
                            placeholder="Enter game name"
                            value={gameName}
                            onChange={(e) => setGameName(e.target.value)}
                            className="mt-1 w-full p-2 border rounded-md focus:ring focus:ring-blue-300 outline-none"
                            required
                        />
                    </div>
                    {/* Description */}
                    <div>
                        <label htmlFor="description" className="block text-gray-700 font-medium">
                            Description
                        </label>
                        <textarea
                            id="description"
                            placeholder="Enter description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="mt-1 w-full p-2 border rounded-md focus:ring focus:ring-blue-300 outline-none"
                            required
                        ></textarea>
                    </div>
                    {/* Price */}
                    <div>
                        <label htmlFor="price" className="block text-gray-700 font-medium">
                            Price
                        </label>
                        <input
                            type="number"
                            id="price"
                            placeholder="Enter price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="mt-1 w-full p-2 border rounded-md focus:ring focus:ring-blue-300 outline-none"
                            required
                        />
                    </div>
                    {/* Category */}
                    <div>
                        <label htmlFor="category" className="block text-gray-700 font-medium">
                            Category
                        </label>
                        <select
                            id="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="mt-1 w-full p-2 border rounded-md focus:ring focus:ring-blue-300 outline-none"
                            required
                        >
                            <option value="" disabled>
                                Select category
                            </option>
                            <option value="PC">PC</option>
                            <option value="Mobile">Mobile</option>
                        </select>
                    </div>
                    {/* Image Upload */}
                    <div>
                        <label htmlFor="image" className="block text-gray-700 font-medium">
                            Upload Image
                        </label>
                        <input
                            type="file"
                            id="image"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files?.[0] || null)}
                            className="mt-1 w-full p-2 border rounded-md focus:ring focus:ring-blue-300 outline-none"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
                    >
                        Add Game
                    </button>
                </form>
                <ToastContainer />
            </div>
        </div>
    );
}
