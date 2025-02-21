"use client";
import React, { useEffect, useState, useMemo, useCallback } from "react";
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
  const router = useRouter();

  // Fetch games data
  const fetchGames = useCallback(async () => {
    try {
      const response = await axios.get("/api/games");
  
      // Sort games by `uploadDate` in descending order (newest first)
      const sortedGames = response.data.games.sort(
        (a: Game, b: Game) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime()
      );
  
      setGames(sortedGames);
    } catch (error) {
      console.error("Error while fetching games data", error);
    }
  }, []);
  

  useEffect(() => {
    fetchGames();
    
    // Retrieve cart & wishlist from localStorage
    setCartDetails(JSON.parse(localStorage.getItem("cart") || "[]"));
    setWishlist(JSON.parse(localStorage.getItem("wishlist") || "[]"));
  }, [fetchGames]);

  // Update LocalStorage when cart or wishlist changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartDetails));
  }, [cartDetails]);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // Cart Operations
  const addToCart = useCallback((e: React.MouseEvent<HTMLButtonElement>, item: Game) => {
    e.stopPropagation();
    if (!cartDetails.some((game) => game._id === item._id)) {
      setCartDetails((prev) => [...prev, item]);
    }
  }, [cartDetails]);

  const removeFromCart = useCallback((item: Game) => {
    setCartDetails((prev) => prev.filter((game) => game._id !== item._id));
  }, []);

  const isInCart = (game: Game) => cartDetails.some((item) => item._id === game._id);

  // Wishlist Operations
  const addToWishlist = useCallback((item: Game) => {
    if (!wishlist.some((game) => game._id === item._id)) {
      setWishlist((prev) => [...prev, item]);
    }
  }, [wishlist]);

  const removeFromWishlist = useCallback((item: Game) => {
    setWishlist((prev) => prev.filter((game) => game._id !== item._id));
  }, []);

  const isInWishlist = (game: Game) => wishlist.some((item) => item._id === game._id);

  // Filter and Paginate Games
  const filteredGames = useMemo(() => {
    return games.filter(
      (game) =>
        game.category.toLowerCase() === category.toLowerCase() &&
        (game.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          game.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [games, category, searchQuery]);

  const paginatedGames = useMemo(() => {
    const startIndex = (currentPage - 1) * gamesPerPage;
    return filteredGames.slice(startIndex, startIndex + gamesPerPage);
  }, [filteredGames, currentPage, gamesPerPage]);

  const totalPages = Math.ceil(filteredGames.length / gamesPerPage);

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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedGames.map((game) => (
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
                {/* <p className="text-gray-800 mt-2">
                  <strong>Price:</strong> ${game.price.toFixed(2)}
                </p> */}

                <div className="flex justify-between items-center mt-4">
                  <Button onClick={() => router.push(`/games/${category}/${game._id}`)} className="custom-btn">
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

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-4 mt-8">
          <Button className="custom-btn" disabled={currentPage === 1} onClick={() => setCurrentPage((prev) => prev - 1)}>
            Previous
          </Button>
          <span>Page {currentPage} of {totalPages}</span>
          <Button className="custom-btn" disabled={currentPage === totalPages} onClick={() => setCurrentPage((prev) => prev + 1)}>
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default GamesList;
