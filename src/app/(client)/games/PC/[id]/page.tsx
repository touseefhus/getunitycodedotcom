"use client";
import { useParams } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";

interface Game {
    _id: string;
    name: string;
    description: string;
    category: string;
    price: number;
    image: string;
    licenseAgreement: string;
    latestVersion: string;
    latestReleaseDate: string;
    originalUnityVersion: string;
}

const GameDetails: React.FC = () => {
    const { id } = useParams(); // Capture the id parameter
    const [game, setGame] = useState<Game | null>(null);

    const fetchSingleGame = async (gameId: string) => {
        try {
            const response = await axios.get(`/api/games?id=${gameId}`);
            console.log(response);
            setGame(response.data.game);
        } catch (error) {
            console.error("Error while fetching game details", error);
        }
    };

    useEffect(() => {
        if (id) {
            fetchSingleGame(id as string);
        }
    }, [id]);

    if (!game) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <p className="text-lg font-semibold text-gray-700 animate-pulse">
                    Loading game details...
                </p>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6 bg-gray-50">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                <img
                    src={game.image}
                    alt={game.name}
                    className="w-full h-64 object-cover"
                />
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-800">{game.name}</h2>
                    <p className="text-gray-600 mt-2">{game.description}</p>
                    <div className="mt-4 flex items-center space-x-4">
                        <span className="text-lg font-semibold text-green-500">
                            ${game.price}
                        </span>
                        <span className="text-sm bg-blue-100 text-blue-500 px-2 py-1 rounded">
                            {game.category}
                        </span>
                    </div>
                    <div className="mt-6 space-y-2">
                        <p className="text-gray-700">
                            <strong>License Agreement:</strong> {game.licenseAgreement}
                        </p>
                        <p className="text-gray-700">
                            <strong>Latest Version:</strong> {game.latestVersion}
                        </p>
                        <p className="text-gray-700">
                            <strong>Latest Release Date:</strong> {game.latestReleaseDate}
                        </p>
                        <p className="text-gray-700">
                            <strong>Original Unity Version:</strong> {game.originalUnityVersion}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameDetails;
