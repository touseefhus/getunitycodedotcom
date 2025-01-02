"use client";
import React, { useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";

const Hero: React.FC = () => {
    const [query, setQuery] = useState("");

    // Static games array for demonstration
    const games = [
        { id: 1, name: "Game 1" },
        { id: 2, name: "Game 2" },
        { id: 3, name: "Game 3" },
    ];

    // Filter games based on query
    const filteredGames = games.filter((game) =>
        game.name.toLowerCase().includes(query.toLowerCase())
    );

    // Handle input change
    const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    return (
        <div id="gradient" className="container mx-auto rounded-3xl">
            <div className="text-center py-28 text-white">
                <h1 className="leading-normal text-2xl sm:text-5xl font-semibold">
                    Welcome to GetUnityCodes
                </h1>
                <p>Buy premium Unity game source codes exclusively at GetUnityCodes.</p>
                <form
                    onSubmit={(e) => e.preventDefault()}
                    style={{ maxWidth: "600px", margin: "30px auto" }}
                    className="relative flex items-center px-4"
                >
                    <input
                        type="text"
                        value={query}
                        onChange={handleFilter}
                        className="p-3 pl-3 pr-10 border border-gray-300 rounded-3xl w-full"
                        placeholder="Search..."
                    />
                    <button
                        style={{ padding: "6px 10px" }}
                        type="submit"
                        className="absolute right-7 sm:right-6 top-1/2 transform -translate-y-1/2 bg-black text-white rounded-3xl flex items-center justify-center"
                    >
                        Search
                        <span style={{ padding: "5px" }} className="ml-3 rounded-full border-2 border-white flex items-center justify-center">
                            <FaArrowRightLong className="text-white" />
                        </span>
                    </button>
                </form>
                <div className="mt-4">
                    {filteredGames.length > 0 ? (
                        <ul>
                            {filteredGames.map((game) => (
                                <li key={game.id}>{game.name}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>No games found</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Hero;
