"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Trash } from "lucide-react";
import Navbar from "@/components/Navbar/page";

interface Game {
    _id: string;
    name: string;
    description: string;
    category: string;
    price: number;
    image: string;
}

interface GamesListProps {
    category: string;
    title: string;
}

const GamesList: React.FC<GamesListProps> = ({ category, title }) => {
    const [games, setGames] = useState<Game[]>([]);
    const [cartDetails, setCartDetails] = useState<Game[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const gamesPerPage = 6; // Number of games per page
    const router = useRouter();

    // Fetch games
    const fetchGames = async () => {
        try {
            const response = await axios.get("/api/games");
            setGames(response.data.games);
        } catch (error) {
            console.error("Error fetching games data:", error);
        }
    };

    // Load cart from localStorage on component mount
    useEffect(() => {
        const storedCart = localStorage.getItem("cart");
        if (storedCart) {
            try {
                setCartDetails(JSON.parse(storedCart));
            } catch (error) {
                console.error("Error parsing cart data from localStorage:", error);
            }
        }
        fetchGames();
    }, []);

    // Add to cart
    const addToCart = (item: Game) => {
        setCartDetails((prevCart) => {
            if (prevCart.some((game) => game._id === item._id)) {
                return prevCart;
            }
            const updatedCart = [...prevCart, item];
            localStorage.setItem("cart", JSON.stringify(updatedCart)); // Save to localStorage
            return updatedCart;
        });
    };

    // Remove from cart
    const removeFromCart = (item: Game) => {
        setCartDetails((prevCart) => {
            const updatedCart = prevCart.filter((game) => game._id !== item._id);
            localStorage.setItem("cart", JSON.stringify(updatedCart)); // Save to localStorage
            return updatedCart;
        });
    };

    // Check if game is in the cart
    const isInCart = (game: Game) => {
        return cartDetails.some((item) => item._id === game._id);
    };

    // Filter games by category
    const getGamesByCategory = () => {
        return games.filter(
            (game) =>
                game.category?.trim().toLowerCase() === category.trim().toLowerCase()
        );
    };

    // Paginate games
    const paginatedGames = () => {
        const filteredGames = getGamesByCategory();
        const startIndex = (currentPage - 1) * gamesPerPage;
        const endIndex = startIndex + gamesPerPage;
        return filteredGames.slice(startIndex, endIndex);
    };

    // Total pages
    const totalPages = Math.ceil(getGamesByCategory().length / gamesPerPage);

    return (
        <div>
            <Navbar cartDetails={cartDetails.length} />
            <h2 className="text-center text-2xl font-semibold mb-9">{title}</h2>
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {paginatedGames().map((game) => (
                        <div
                            className="p-5 border-solid border-2 rounded-2xl border-dark-200"
                            key={game._id}
                        >
                            <div className="overflow-hidden">
                                <img
                                    src={game.image || "/default-image.png"}
                                    alt={game.name}
                                    className="w-full h-48 object-cover rounded-lg"
                                />
                                <div className="p-4">
                                    <h5 className="font-semibold">{game.name}</h5>
                                    <p className="text-gray-600">{game.description}</p>
                                    <p className="text-gray-800 mt-2">
                                        <strong>Price:</strong> ${game.price.toFixed(2)}
                                    </p>
                                    <div className="flex justify-between items-center mt-4">
                                        <Button
                                            onClick={() => router.push(`/games/${category}/${game._id}`)}
                                            className="custom-btn"
                                        >
                                            View Details
                                        </Button>
                                        <Button
                                            onClick={() =>
                                                isInCart(game)
                                                    ? removeFromCart(game)
                                                    : addToCart(game)
                                            }
                                        >
                                            {isInCart(game) ? (
                                                <Trash size={16} />
                                            ) : (
                                                <ShoppingCart size={16} />
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* Pagination Controls */}
            <div className="flex justify-center items-center space-x-4 mt-8">
                <Button
                    className="custom-btn"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                >
                    Previous
                </Button>
                <span>
                    Page {currentPage} of {totalPages}
                </span>
                <Button
                    className="custom-btn"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                >
                    Next
                </Button>
            </div>
        </div>
    );
};

export default GamesList;
