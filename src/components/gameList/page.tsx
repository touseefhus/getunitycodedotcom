"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Trash } from "lucide-react";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import Navbar from "@/components/Navbar/page";
interface Game {
    _id: string;
    name: string;
    description: string;
    category: string;
    price: number;
    image: string;
    uploadDate: string;
}

interface GamesListProps {
    category: string;
    title: string;
}

const GamesList: React.FC<GamesListProps> = ({ category, title }) => {
    const [games, setGames] = useState<Game[]>([]);
    const [cartDetails, setCartDetails] = useState<Game[]>([]);
    const [wishlist, setWishlist] = useState<Game[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const gamesPerPage = 6;
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [showWishlist, setShowWishlist] = useState(false); // Toggle for wishlist view
    const router = useRouter();

    // Fetch games
    const fetchGames = async () => {
        try {
            const response = await axios.get("/api/games");
            const sortedGames = response.data.games.sort(
                (a: Game, b: Game) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime()
            );
            setGames(sortedGames);
        } catch (error) {
            console.error("Error while fetching games data", error);
        }
    };
    
    

    useEffect(() => {
        const storedCart = localStorage.getItem("cart");
        const storedWishlist = localStorage.getItem("wishlist");
        if (storedCart) setCartDetails(JSON.parse(storedCart));
        if (storedWishlist) setWishlist(JSON.parse(storedWishlist));
        fetchGames();
    }, []);

    // Add/Remove from Cart
    const addToCart = (e: React.MouseEvent<HTMLButtonElement>, item: Game) => {
        e.preventDefault();
        e.stopPropagation();
        if (!cartDetails.some((game) => game._id === item._id)) {
            const updatedCart = [...cartDetails, item];
            setCartDetails(updatedCart);
            localStorage.setItem("cart", JSON.stringify(updatedCart));
        }
    };


    const removeFromCart = (item: Game) => {
        const updatedCart = cartDetails.filter((game) => game._id !== item._id);
        setCartDetails(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    const isInCart = (game: Game) => cartDetails.some((item) => item._id === game._id);

    // Add/Remove from Wishlist
    const addToWishlist = (item: Game) => {
        if (!wishlist.some((game) => game._id === item._id)) {
            const updatedWishlist = [...wishlist, item];
            setWishlist(updatedWishlist);
            localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
        }
    };

    const removeFromWishlist = (item: Game) => {
        const updatedWishlist = wishlist.filter((game) => game._id !== item._id);
        setWishlist(updatedWishlist);
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    };

    const isInWishlist = (game: Game) => wishlist.some((item) => item._id === game._id);

    // Filter games by category or wishlist
    const getFilteredGames = () => {
        const filteredGames = games.filter(
            (game) =>
                game.category.toLowerCase() === category.toLowerCase() &&
                (game.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    game.description.toLowerCase().includes(searchQuery.toLowerCase()))
        );
        return showWishlist ? filteredGames.filter((game) => isInWishlist(game)) : filteredGames;
    };

    // Paginate games
    const paginatedGames = () => {
        const filteredGames = getFilteredGames();
        const startIndex = (currentPage - 1) * gamesPerPage;
        const endIndex = startIndex + gamesPerPage;
        return filteredGames.slice(startIndex, endIndex);
    };

    const totalPages = Math.ceil(getFilteredGames().length / gamesPerPage);

    return (
        <div style={{ marginTop: "90px" }}>
            <Navbar wishlistDetails={wishlist.length} cartDetails={cartDetails.length} />
            <h2 className="text-center text-2xl font-semibold mb-9">{title}</h2>
            <div className="container mx-auto px-4">
                <input
                    type="text"
                    placeholder="Search games..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 mb-6 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {/* <Button onClick={() => setShowWishlist(!showWishlist)} className="mb-6">
                    {showWishlist ? "Show All Games" : "View Wishlist"}
                </Button> */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {paginatedGames().map((game) => (
                        <div
                            onClick={() => router.push(`/games/${category}/${game._id}`)}
                            className="p-5 border-solid border-2 rounded-2xl border-dark-200 game-card"
                            key={game._id}
                        >
                            <img
                                src={game.image || "/default-image.png"}
                                alt={game.name}
                                className="w-full h-48 object-cover rounded-lg"
                            />
                            <div className="p-4">
                                <h5 className="font-semibold">{game.name}</h5>
                                {/* <div className="text-gray-600">{parse(game.description)}</div> */}
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
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            isInCart(game) ? removeFromCart(game) : addToCart(e, game);
                                        }}
                                    >
                                        {isInCart(game) ? <Trash size={16} /> : <ShoppingCart size={16} />}
                                    </Button>

                                    <Button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            isInWishlist(game) ? removeFromWishlist(game) : addToWishlist(game);
                                        }}
                                    >
                                        {isInWishlist(game) ? <FaHeart size={16} /> : <CiHeart size={16} />}
                                    </Button>

                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
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
