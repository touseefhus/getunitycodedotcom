"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

// Define the structure of a game item
interface Game {
    _id: string;
    name: string;
    price: number;
    image: string;
}

const CheckoutPage: React.FC = () => {
    const [cartItems, setCartItems] = useState<Game[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const router = useRouter();

    // Load cart items and calculate the total price
    useEffect(() => {
        const storedCart = localStorage.getItem("cart");
        if (storedCart) {
            try {
                const parsedCart = JSON.parse(storedCart);
                setCartItems(parsedCart);
                const total = parsedCart.reduce((sum: number, item: Game) => sum + item.price, 0);
                setTotalPrice(total);
            } catch (error) {
                console.error("Error parsing cart data:", error);
            }
        }
    }, []);

    // Handle order placement
    const handlePlaceOrder = () => {
        // Clear cart
        localStorage.removeItem("cart");
        setCartItems([]);
        setTotalPrice(0);
        // router.push("/order-confirmation");
    };

    return (
        <div className="container mx-auto px-4 py-6">
            <h2 className="text-center text-2xl font-semibold mb-6">Checkout</h2>
            {cartItems.length === 0 ? (
                <p className="text-center text-gray-600">Your cart is empty.</p>
            ) : (
                <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {cartItems.map((item) => (
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
                                    <p className="text-gray-800 mt-2">
                                        <strong>Price:</strong> ${item.price.toFixed(2)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 p-4 border-t border-gray-300">
                        <h3 className="text-lg font-semibold">Total Price: ${totalPrice.toFixed(2)}</h3>
                        <form className="mt-6 space-y-4">
                            <input
                                type="text"
                                placeholder="Full Name"
                                className="w-full p-2 border rounded-md"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Shipping Address"
                                className="w-full p-2 border rounded-md"
                                required
                            />
                            <select className="w-full p-2 border rounded-md" required>
                                <option value="">Select Payment Method</option>
                                <option value="credit">Credit Card</option>
                                <option value="paypal">PayPal</option>
                                <option value="cod">Cash on Delivery</option>
                            </select>
                        </form>
                        <Button className="custom-btn mt-4" onClick={handlePlaceOrder}>
                            Place Order
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CheckoutPage;
