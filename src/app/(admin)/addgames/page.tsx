"use client";
import { Button } from "@/components/ui/button";
import { versions } from "process";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface GameData {
    name: string;
    description: string;
    price: string;
    category: string;
    image: File | null;
    gallery: File[];
    platforms: { platform: string; price: string }[];
    versions:{version:string;price:string}[];
}

const GameUploadForm: React.FC = () => {
    const [formData, setFormData] = useState<GameData>({
        name: "",
        description: "",
        price: "",
        category: "",
        image: null,
        gallery: [],
        platforms: [{ platform: "", price: "" }],
        versions:[{version:"",price:""}]
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

    const handlePlatformChange = (index: number, field: string, value: string) => {
        const updatedPlatforms = formData.platforms.map((platform, i) => (
            i === index ? { ...platform, [field]: value } : platform
        ));
        setFormData((prevData) => ({ ...prevData, platforms: updatedPlatforms }));
    };

    const addPlatform = () => {
        setFormData((prevData) => ({
            ...prevData,
            platforms: [...prevData.platforms, { platform: "", price: "" }],
        }));
    };

    const removePlatform = (index: number) => {
        setFormData((prevData) => ({
            ...prevData,
            platforms: prevData.platforms.filter((_, i) => i !== index),
        }));
    };



    const handleVersionChange = (index: number, field: string, value: string) => {
        const updatedVersions = formData.versions.map((version, i) => (
            i === index ? { ...version, [field]: value } : version
        ));
        setFormData((prevData) => ({ ...prevData, versions: updatedVersions }));
    };

    const addVersion = () => {
        setFormData((prevData) => ({
            ...prevData,
            versions: [...prevData.versions, { version: "", price: "" }],
        }));
    };

    const removeVersion = (index: number) => {
        setFormData((prevData) => ({
            ...prevData,
            versions: prevData.versions.filter((_, i) => i !== index),
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        const { name, description, price, category, gallery, platforms,versions,image } = formData;
        if (!name || !description || !category || !image   || platforms.some(p => !p.platform || !p.price) || versions.some(p => !p.version || !p.price)) {
            toast.error("All required fields must be filled.");
            return;
        }
    
        const formDataToSend = new FormData();
        formDataToSend.append("name", name);
        formDataToSend.append("description", description);
        formDataToSend.append("price", price);
        formDataToSend.append("image", image);
        formDataToSend.append("category", category);
        formDataToSend.append("platforms", JSON.stringify(platforms));  // Convert platforms to JSON string
        formDataToSend.append("versions", JSON.stringify(versions));
        gallery.forEach((file) => {
            formDataToSend.append("gallery", file);  // Append each gallery image individually
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
                    image: null,
                    category: "",
                    gallery: [],
                    platforms: [{ platform: "", price: "" }],
                    versions: [{ version: "", price: "" }],
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
                        <label htmlFor="description" className="block text-gray-700">Description:</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
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
                    <div className="mb-6 border p-4 rounded-lg">
                        <h3 className="text-lg font-medium mb-4">Supported Platforms & Prices</h3>
                        {formData.platforms.map((platform, index) => (
                            <div key={index} className="flex gap-4 mb-4">
                                <input
                                    type="text"
                                    placeholder="Platform (e.g., PC, Mobile)"
                                    value={platform.platform}
                                    onChange={(e) => handlePlatformChange(index, "platform", e.target.value)}
                                    className="w-1/2 p-2 border border-gray-300 rounded-md"
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Price"
                                    value={platform.price}
                                    onChange={(e) => handlePlatformChange(index, "price", e.target.value)}
                                    className="w-1/2 p-2 border border-gray-300 rounded-md"
                                    required
                                />
                                {index > 0 && (
                                    <Button  onClick={() => removePlatform(index)}>Remove</Button>
                                )}
                            </div>
                        ))}
                        <Button onClick={addPlatform}>Add Verson</Button>
                    </div>

                    <div className="mb-6 border p-4 rounded-lg">
                        <h3 className="text-lg font-medium mb-4">Versions & Prices</h3>
                        {formData.versions.map((version, index) => (
                            <div key={index} className="flex gap-4 mb-4">
                                <input
                                    type="text"
                                    placeholder="Version (e.g., Standard, Deluxe)"
                                    value={version.version}
                                    onChange={(e) => handleVersionChange(index, "version", e.target.value)}
                                    className="w-1/2 p-2 border border-gray-300 rounded-md"
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Price"
                                    value={version.price}
                                    onChange={(e) => handleVersionChange(index, "price", e.target.value)}
                                    className="w-1/2 p-2 border border-gray-300 rounded-md"
                                    required
                                />
                                {index > 0 && (
                                    <Button type="button" onClick={() => removeVersion(index)}>Remove</Button>
                                )}
                            </div>
                        ))}
                        <Button onClick={addVersion}>Add Version</Button>
                    </div>
                </div>
                <Button 
                    type="submit" 
                    className="w-full bg-[#F5465A] hover:bg-[#F9631C] text-lg text-white p-2 rounded-md"
                    >
                    Upload Game
                </Button>
            </form>
            <ToastContainer position="top-right" autoClose={5000} />
        </div>
    );
};

export default GameUploadForm;
