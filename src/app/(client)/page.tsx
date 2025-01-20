"use client";
import React, { useEffect, useState } from "react";
import Hero from "./home/page";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

// Define the Game type
interface Game {
    _id: string;
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    image?: string;
    uploadDate: string;
}

const Home: React.FC = () => {
    const [games, setGames] = useState<Game[]>([]);
    const [filteredGames, setFilteredGames] = useState<Game[]>([]); // To hold filtered games
    const [query, setQuery] = useState(""); // State to hold the search query
    const router = useRouter();

    // Fetch games from API
    const fetchGames = async () => {
        try {
            const response = await axios.get("/api/games");
            const sortedGames = response.data.games.sort(
                (a: Game, b: Game) =>
                    new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime()
            );
            setGames(sortedGames);
            setFilteredGames(sortedGames); // Initialize filtered games to all games initially
        } catch (error) {
            console.error("Error while fetching games data", error);
        }
    };

    // Handle search query change
    const handleSearch = (query: string) => {
        setQuery(query); // Update the search query
        filterGames(query); // Filter games based on the query
    };

    // Filter games based on search query and category
    const filterGames = (query: string) => {
        const filteredBySearch = games.filter((game) =>
            game.name.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredGames(filteredBySearch); // Update the filtered games with search query
    };

    // Filter games by category (Mobile, PC, etc.)
    const getGamesByCategory = (category: string) => {
        return filteredGames
            .filter(
                (game) => game.category.trim().toLowerCase() === category.trim().toLowerCase()
            )
            .slice(0, 6); // Limit to 6 games for display
    };

    useEffect(() => {
        fetchGames();
    }, []);

    return (
        <div style={{ marginTop: "90px" }} className="hero-wrapper">
            {/* Hero Section */}
            <Hero onSearch={handleSearch} />

            {/* Featured Mobile Games Section with Filter */}
            <h2 className="text-center text-2xl font-semibold mb-9">Featured Mobile Games</h2>
            {filteredGames.length > 0 ? (
                <div>
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {getGamesByCategory("Mobile")
                                .map((game) => (
                                    <div className="game-card p-5 border-solid border-2 rounded-2xl border-dark-200" key={game._id}>
                                        <div className="overflow-hidden">
                                            <img
                                                src={game.image || "/default-image.png"}
                                                alt={game.name}
                                                className="game-image w-full h-48 object-cover rounded-lg"
                                            />
                                            <div className="p-4">
                                                <h5 className="font-semibold">{game.name}</h5>
                                                <p className="text-gray-800 mt-2">
                                                    <strong>Price:</strong> ${game.price.toFixed(2)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            ) : (
                <p className="text-center text-xl">No games found matching your search.</p>
            )}

            <div className="text-center my-5">
                <Button className="custom-btn" onClick={() => router.push("/games/Mobile")}>
                    Load More
                </Button>
            </div>

            {/* Featured PC Games Section with Filter */}
            <h2 className="text-center text-2xl font-semibold mb-9">Featured PC Games</h2>
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {getGamesByCategory("PC")
                        .map((game) => (
                            <div className="game-card p-5 border-solid border-2 rounded-2xl border-dark-500" key={game._id}>
                                <div className="overflow-hidden">
                                    <img
                                        src={game.image || "/default-image.png"}
                                        alt={game.name}
                                        className="game-image w-full h-48 object-cover rounded-lg"
                                    />
                                    <div className="p-4">
                                        <h5 className="font-semibold">{game.name}</h5>
                                        <p className="text-gray-800 mt-2">
                                            <strong>Price:</strong> ${game.price.toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>

                <div className="text-center my-5">
                    <Button className="custom-btn" onClick={() => router.push("/games/PC")}>
                        Load More
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Home;
