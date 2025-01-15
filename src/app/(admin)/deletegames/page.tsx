"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import EditGameModal from "@/components/dialog/updategames";

interface Game {
    _id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    image: string;
}

const GameList: React.FC = () => {
    const [games, setGames] = useState<Game[]>([]);
    const [editingGame, setEditingGame] = useState<Game | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 6;

    // Fetch games
    const fetchGames = async () => {
        try {
            const response = await axios.get("/api/games");
            setGames(response.data.games);
        } catch (error) {
            console.error("Error fetching games:", error);
        }
    };

    // Delete game
    const deleteGame = async (id: string) => {
        try {
            await axios.delete(`/api/games/deletegames?id=${id}`);
            setGames((prev) => prev.filter((game) => game._id !== id));
            alert("Game deleted successfully!");
        } catch (error) {
            console.error("Error deleting game:", error);
            alert("Failed to delete game.");
        }
    };

    // Set the game to edit
    const startEditing = (game: Game) => {
        setEditingGame(game);
    };

    // Calculate games to display on the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentGames = games.slice(indexOfFirstItem, indexOfLastItem);

    // Handle pagination
    const totalPages = Math.ceil(games.length / itemsPerPage);
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        fetchGames();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-6">Game List</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentGames.map((game) => (
                    <div
                        className="bg-white shadow-md rounded-lg overflow-hidden"
                        key={game._id}
                    >
                        <img
                            src={game.image}
                            alt={game.name}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h5 className="text-lg font-semibold">{game.name}</h5>
                            <p className="text-gray-600 mt-2">{game.description}</p>
                            <p className="text-gray-800 mt-2">
                                <strong>Price:</strong> ${game.price.toFixed(2)}
                            </p>
                            <p className="text-gray-800 mt-1">
                                <strong>Category:</strong> {game.category}
                            </p>
                            <div className="flex space-x-4 mt-4">
                                <button
                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                    onClick={() => deleteGame(game._id)}
                                >
                                    Delete
                                </button>
                                <button
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                    onClick={() => startEditing(game)}
                                >
                                    Update
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center items-center mt-6 space-x-2">
                {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                    <button
                        key={page}
                        className={`px-4 py-2 rounded ${page === currentPage
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 hover:bg-gray-300"
                            }`}
                        onClick={() => handlePageChange(page)}
                    >
                        {page}
                    </button>
                ))}
            </div>

            {/* Edit Modal */}
            {editingGame && (
                <EditGameModal
                    open
                    game={editingGame}
                    onClose={() => setEditingGame(null)}
                    onUpdate={fetchGames}
                />
            )}
        </div>
    );
};

export default GameList;
