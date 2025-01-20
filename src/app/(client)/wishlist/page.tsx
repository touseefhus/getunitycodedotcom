"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";

// Define the structure of a game item
interface Game {
    _id: string;
    name: string;
    description: string;
    price: number;
    image: string;
}

const WishlistPage: React.FC = () => {
    const [wishlistItems, setWishlistItems] = useState<Game[]>([]); // Store wishlist items
    const router = useRouter();

    // Fetch wishlist items from localStorage when the page loads
    useEffect(() => {
        const storedWishlist = localStorage.getItem("wishList");
        if (storedWishlist) {
            try {
                setWishlistItems(JSON.parse(storedWishlist));
            } catch (error) {
                console.error("Error parsing wishlist data:", error);
            }
        }
    }, []);

    // Remove an item from the wishlist
    const removeFromWishlist = (item: Game) => {
        const updatedWishlist = wishlistItems.filter((game) => game._id !== item._id);
        setWishlistItems(updatedWishlist);
        localStorage.setItem("wishList", JSON.stringify(updatedWishlist));
    };

    return (
        <div className="container mx-auto px-4 py-6">
            <h2 className="text-center text-2xl font-semibold mb-6">Your Wishlist</h2>
            {wishlistItems.length === 0 ? (
                <p className="text-center text-gray-600">Your wishlist is empty.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlistItems.map((item) => (
                        <div
                            key={item._id}
                            className="p-5 border-solid border-2 rounded-2xl border-dark-200"
                        >
                            <img
                                src={item.image || "/default-image.png"}
                                alt={item.name}
                                className="w-full h-48 object-cover rounded-lg"
                            />
                            <div className="p-4">
                                <h5 className="font-semibold">{item.name}</h5>
                                <p className="text-gray-600">{item.description}</p>
                                <p className="text-gray-800 mt-2">
                                    <strong>Price:</strong> ${item.price.toFixed(2)}
                                </p>
                                <div className="flex justify-between items-center mt-4">
                                    <Button onClick={() => removeFromWishlist(item)}>
                                        <Trash size={16} />
                                        Remove
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <div className="text-center mt-8">
                <Button className="custom-btn" onClick={() => router.push("/")}>
                    Back to Home
                </Button>
            </div>
        </div>
    );
};

export default WishlistPage;
