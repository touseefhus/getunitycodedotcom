"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

// Define the structure of a game item
interface Game {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<Game[]>([]); // Store cart items
  const router = useRouter();

  // Fetch cart items from localStorage when the page loads
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        setCartItems(JSON.parse(storedCart));
      } catch (error) {
        console.error("Error parsing cart data:", error);
      }
    }
  }, []);

  // Remove an item from the cart
  const removeFromCart = (item: Game) => {
    const updatedCart = cartItems.filter((game) => game._id !== item._id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Update localStorage
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-center text-2xl font-semibold mb-6">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="p-5 border-solid border-2 rounded-2xl border-dark-200"
            >
              <Image
                src={item.image || "/default-image.png"}
                alt={item.name}
                className="w-full h-48 object-cover rounded-lg"
              />
              <div className="p-4">
                <h5 className="font-semibold">{item.name}</h5>
                {/* <p className="text-gray-600">{item.description}</p> */}
                <p className="text-gray-800 mt-2">
                  <strong>Price:</strong> ${item.price.toFixed(2)}
                </p>
                <div className="flex justify-between items-center mt-4">
                  <Button onClick={() => removeFromCart(item)}>
                    <Trash size={16} />
                    Remove
                  </Button>
                  {/* <Button
                                        onClick={() => router.push(`/games/${item._id}`)} // Navigate to dynamic route
                                    >
                                        View Details
                                    </Button> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="text-center mt-8">
        <Button className="custom-btn" onClick={() => router.push("/checkout")}>
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
};

export default CartPage;
