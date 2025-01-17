"use client";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DOMPurify from "dompurify";

interface GameData {
    name: string;
    description: string;
    price: string;
    category: string;
    image: File | null;
    gallery: File[];
    licenseAgreement: string;
    latestVersion: string;
    latestReleaseDate: string;
    originalUnityVersion: string;
}

const GameUploadForm: React.FC = () => {
    const [formData, setFormData] = useState<GameData>({
        name: "",
        description: "",
        price: "",
        category: "",
        image: null,
        gallery: [],
        licenseAgreement: "",
        latestVersion: "",
        latestReleaseDate: "",
        originalUnityVersion: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        setFormData((prevData) => ({
            ...prevData,
            image: file,
        }));
    };

    const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files ? Array.from(e.target.files) : [];
        setFormData((prevData) => ({
            ...prevData,
            gallery: files,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const { name, description, price, category, image, gallery, licenseAgreement, latestVersion, latestReleaseDate, originalUnityVersion } = formData;

        if (!name || !description || !price || !category || !image) {
            toast.error("All required fields must be filled.");
            return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append("name", name);
        formDataToSend.append("description", description);
        formDataToSend.append("price", price);
        formDataToSend.append("category", category);
        formDataToSend.append("image", image);
        formDataToSend.append("licenseAgreement", licenseAgreement);
        formDataToSend.append("latestVersion", latestVersion);
        formDataToSend.append("latestReleaseDate", latestReleaseDate);
        formDataToSend.append("originalUnityVersion", originalUnityVersion);

        // Append gallery images
        gallery.forEach((file, index) => {
            formDataToSend.append(`gallery`, file);
        });

        try {
            const response = await fetch("/api/games", {
                method: "POST",
                body: formDataToSend,
            });

            const result = await response.json();
            if (response.ok) {
                toast.success("Game added successfully.");
                setFormData({
                    name: "",
                    description: "",
                    price: "",
                    category: "",
                    image: null,
                    gallery: [],
                    licenseAgreement: "",
                    latestVersion: "",
                    latestReleaseDate: "",
                    originalUnityVersion: "",
                });
            } else {
                toast.error(result.error || "An error occurred.");
            }
        } catch (err) {
            toast.error("Network error. Please try again.");
        }
    };



    return (
        <div className="w-full mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold text-center mb-6">Upload a New Game</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-6 border p-4 rounded-lg">
                    <h3 className="text-lg font-medium mb-4">Primary Details</h3>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700">Game Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-gray-700">Description (HTML Allowed):</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            placeholder="Use HTML tags for styling (e.g., <b>bold</b>, <i>italic</i>)"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="price" className="block text-gray-700">Price:</label>
                        <input
                            type="text"
                            id="price"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="category" className="block text-gray-700">Category:</label>
                        <select
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            required
                        >
                            <option value="">Select Category</option>
                            <option value="PC">PC</option>
                            <option value="Mobile">Mobile</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="image" className="block text-gray-700">Game Image:</label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="gallery" className="block text-gray-700">Gallery Images:</label>
                        <input
                            type="file"
                            id="gallery"
                            name="gallery"
                            accept="image/*"
                            multiple
                            onChange={handleGalleryChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                </div>
                <div className="mb-6 border p-4 rounded-lg">
                    <h3 className="text-lg font-medium mb-4">Additional Details</h3>
                    <div className="mb-4">
                        <label htmlFor="licenseAgreement" className="block text-gray-700">License Agreement:</label>
                        <input
                            type="text"
                            id="licenseAgreement"
                            name="licenseAgreement"
                            value={formData.licenseAgreement}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="latestVersion" className="block text-gray-700">Latest Version:</label>
                        <input
                            type="text"
                            id="latestVersion"
                            name="latestVersion"
                            value={formData.latestVersion}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="latestReleaseDate" className="block text-gray-700">Latest Release Date:</label>
                        <input
                            type="date"
                            id="latestReleaseDate"
                            name="latestReleaseDate"
                            value={formData.latestReleaseDate}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="originalUnityVersion" className="block text-gray-700">Original Unity Version:</label>
                        <input
                            type="text"
                            id="originalUnityVersion"
                            name="originalUnityVersion"
                            value={formData.originalUnityVersion}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                </div>
                <button type="submit" className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    Upload Game
                </button>
            </form>
            <ToastContainer position="top-right" autoClose={5000} />
        </div>
    );
};

export default GameUploadForm;
