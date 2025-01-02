"use client";
import React, { useEffect, useState } from "react";
import Hero from "./home/page";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface Game {
    _id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    image?: string;
}

const Home: React.FC = () => {
    const [games, setGames] = useState<Game[]>([]);
    const router = useRouter();

    // Fetch games
    const fetchGames = async () => {
        try {
            const response = await axios.get("/api/games");
            setGames(response.data.games);
        } catch (error) {
            console.error("Error while fetching games data", error);
        }
    };

    // Filter games by category and limit to 7
    const getGamesByCategory = (category: string) => {
        return games
            .filter((game) =>
                game.category?.trim().toLowerCase() === category.trim().toLowerCase()
            )
            .slice(0, 6);
    };


    useEffect(() => {
        fetchGames();
    }, []);

    return (
        <div className="hero-wrapper">
            <Hero />
            <h3 className="text-center text-2xl font-semibold mt-14" style={{ color: "#FA744C" }}>Check Out</h3>
            <h2 className="text-center text-2xl font-semibold mb-9">Featured Mobile Games</h2>
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {getGamesByCategory("Mobile").map((game) => (
                        <div className="p-5 border-solid border-2 rounded-2xl border-dark-200">
                            <div className="overflow-hidden" key={game._id}>
                                <img src={game.image || "/default-image.png"} alt={game.name} className="w-full h-48 object-cover rounded-lg" />
                                <div className="p-4">
                                    <h5 className="font-semibold">{game.name}</h5>
                                    <p className="text-gray-600">{game.description}</p>
                                    <p className="text-gray-800 mt-2">
                                        <strong>Price:</strong> ${game.price.toFixed(2)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}


                </div>
            </div>
            <div className="text-center my-5">
                <Button className="custom-btn" onClick={() => router.push("/games/Mobile")}>Load More</Button>
            </div>

            <h2 className="text-center text-2xl font-semibold mb-9">Featured PC Games</h2>
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {getGamesByCategory("PC").map((game) => (
                        <div className="p-5 border-solid border-2 rounded-2xl border-dark-500" key={game._id}>
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
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center my-5">
                    <Button className="custom-btn" onClick={() => router.push("/games/PC")}>Load More</Button>
                </div>
            </div>
        </div>
    );
};

export default Home;
