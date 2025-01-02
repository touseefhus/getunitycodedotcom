"use client";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import axios from "axios";

interface EditGameModalProps {
    open: boolean;
    onClose: () => void;
    onUpdate: () => void;
    game: {
        _id: string;
        name: string;
        description: string;
        price: number;
        category: string;
        image: string;
    };
}

const EditGameModal: React.FC<EditGameModalProps> = ({ open, game, onClose, onUpdate }) => {
    const [formData, setFormData] = useState({
        name: game.name,
        description: game.description,
        price: game.price,
        category: game.category,
        image: null as File | null,
    });

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFormData((prev) => ({ ...prev, image: e.target.files![0] }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const updateData = new FormData();
        updateData.append("id", game._id);
        updateData.append("name", formData.name);
        updateData.append("description", formData.description);
        updateData.append("price", String(formData.price));
        updateData.append("category", formData.category);
        if (formData.image) {
            updateData.append("image", formData.image);
        }

        try {
            await axios.put("/api/games/updategames", updateData);
            alert("Game updated successfully!");
            onUpdate(); // Refresh the game list
            onClose(); // Close the modal
        } catch (error) {
            console.error("Error updating game:", error);
            alert("Failed to update game.");
        }
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Game</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="block text-gray-600 text-sm font-medium mb-2">
                            Name
                        </label>
                        <input
                            type="text"
                            className="input w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400 focus:outline-none"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block text-gray-600 text-sm font-medium mb-2">
                            Description
                        </label>
                        <textarea
                            className="input w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400 focus:outline-none"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block text-gray-600 text-sm font-medium mb-2">Price</label>
                        <input
                            type="number"
                            className="input w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400 focus:outline-none"
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block text-gray-600 text-sm font-medium mb-2">Category</label>
                        <input
                            type="text"
                            className="input w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400 focus:outline-none"
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block text-gray-600 text-sm font-medium mb-2">Image</label>
                        <input
                            type="file"
                            className="input w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400 focus:outline-none"
                            onChange={handleFileChange}
                        />
                    </div>
                    <button type="submit" className="btn-primary w-full bg-green-500 text-white font-medium py-2 rounded-md hover:bg-green-600 transition">
                        Save Changes
                    </button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default EditGameModal;
