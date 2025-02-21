"use client";
import React, { useState, useCallback } from "react";
import { FaArrowRightLong } from "react-icons/fa6";

interface HeroProps {
  onSearch: (query: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  // Memoized function to handle search input change
  const handleSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setQuery(value);
      onSearch(value);
    },
    [onSearch]
  );

  return (
    <div id="gradient" className="container mx-auto rounded-3xl">
      <div className="text-center py-28 text-white">
        <h1 className="text-2xl sm:text-5xl font-semibold leading-normal">
          Welcome to GetUnityCodes
        </h1>
        <p className="mt-2">
          Buy premium Unity game source codes exclusively at GetUnityCodes.
        </p>

        {/* Search Form */}
        <form
          onSubmit={(e) => e.preventDefault()}
          className="relative flex items-center max-w-lg mx-auto mt-8"
        >
          <input
            type="text"
            value={query}
            onChange={handleSearch}
            className="p-3 pr-12 border border-gray-300 rounded-3xl w-full text-gray-800 outline-none"
            placeholder="Search..."
          />
          {/* <button
            type="submit"
            className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 bg-black text-white rounded-3xl px-4 py-2 flex items-center space-x-2"
          >
            <span>Search</span>
            <span className="p-1 rounded-full border-2 border-white flex items-center justify-center">
              <FaArrowRightLong className="text-white" />
            </span>
          </button> */}
        </form>
      </div>
    </div>
  );
};

export default Hero;
