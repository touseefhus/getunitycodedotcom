"use client";
import React, { useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";

interface HeroProps {
    onSearch: (query: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onSearch }) => {
    const [query, setQuery] = useState("");

    // Handle search query change
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setQuery(value);
        onSearch(value);
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
                    {/* Search input field */}
                    <input
                        type="text"
                        value={query}
                        onChange={handleSearch}
                        className="p-3 pl-3 pr-10 border border-gray-300 rounded-3xl w-full"
                        placeholder="Search..."
                        style={{
                            color: "#333",
                            outline: "none",
                        }}
                    />

                    {/* Search button */}
                    <button
                        style={{ padding: "6px 10px" }}
                        type="submit"
                        className="absolute right-7 sm:right-6 top-1/2 transform -translate-y-1/2 bg-black text-white rounded-3xl flex items-center justify-center"
                    >
                        Search
                        <span
                            style={{ padding: "5px" }}
                            className="ml-3 rounded-full border-2 border-white flex items-center justify-center"
                        >
                            <FaArrowRightLong className="text-white" />
                        </span>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Hero;
