"use client";
import React, { useEffect, useState, useMemo, useCallback } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Trash } from "lucide-react";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import Navbar from "@/components/Navbar/page";
import Pagination from "../pagination/page";

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
  const [currentPage, setCurrentPage] = useState<number>(() => {
    // Retrieve the current page from localStorage, default to 1 if not found
    const savedPage = localStorage.getItem("currentPage");
    return savedPage ? parseInt(savedPage, 10) : 1;
  });
  const gamesPerPage = 6;
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [cartLoading, setCartLoading] = useState<string | null>(null);
  const [wishlistLoading, setWishlistLoading] = useState<string | null>(null);
  const [viewDetailsLoading, setViewDetailsLoading] = useState<string | null>(null);
  const router = useRouter();

  // Fetch games
  const fetchGames = useCallback(async () => {
    try {
      const response = await axios.get("/api/games");
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

  // Save current page to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("currentPage", currentPage.toString());
  }, [currentPage]);

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

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // View Details Operation
  const handleViewDetails = useCallback(async (gameId: string) => {
    setViewDetailsLoading(gameId); 

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push(`/games/${category}/${gameId}`);
    } catch (error) {
      console.error("Error navigating to game details", error);
    } finally {
      setViewDetailsLoading(null); 
    }
  }, [category, router]);

  // Cart Operations
  const addToCart = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>, item: Game) => {
      e.stopPropagation();
      setCartLoading(item._id);

      try {
        await new Promise((resolve) => setTimeout(resolve, 1000)); 
        if (!cartDetails.some((game) => game._id === item._id)) {
          setCartDetails((prev) => [...prev, item]); 
        }
      } catch (error) {
        console.error("Error adding to cart", error);
      } finally {
        setCartLoading(null);
      }
    },
    [cartDetails]
  );

  const removeFromCart = useCallback(async (item: Game) => {
    setCartLoading(item._id); 

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); 
      setCartDetails((prev) => prev.filter((game) => game._id !== item._id));
    } catch (error) {
      console.error("Error removing from cart", error);
    } finally {
      setCartLoading(null); // Reset loading state
    }
  }, []);

  const isInCart = (game: Game) => cartDetails.some((item) => item._id === game._id);

  // Wishlist Operations
  const addToWishlist = useCallback(async (item: Game) => {
    setWishlistLoading(item._id); // Set loading state for this item

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); 
      if (!wishlist.some((game) => game._id === item._id)) {
        setWishlist((prev) => [...prev, item]);
      }
    } catch (error) {
      console.error("Error adding to wishlist", error);
    } finally {
      setWishlistLoading(null); // Reset loading state
    }
  }, [wishlist]);

  const removeFromWishlist = useCallback(async (item: Game) => {
    setWishlistLoading(item._id); 

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); 
      setWishlist((prev) => prev.filter((game) => game._id !== item._id));
    } catch (error) {
      console.error("Error removing from wishlist", error);
    } finally {
      setWishlistLoading(null); 
    }
  }, []);

  const isInWishlist = (game: Game) => wishlist.some((item) => item._id === game._id);

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
              onClick={() => handleViewDetails(game._id)}
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
                <div className="flex gap-2 items-center mt-4">
                  <Button
                    className="custom-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewDetails(game._id);
                    }}
                    disabled={viewDetailsLoading === game._id}
                  >
                    {viewDetailsLoading === game._id ? (
                      <div className="animate-spin">🌀</div>
                    ) : (
                      "View Details"
                    )}
                  </Button>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      isInCart(game) ? removeFromCart(game) : addToCart(e, game);
                    }}
                    disabled={cartLoading === game._id}
                  >
                    {cartLoading === game._id ? (
                      <div className="animate-spin">🌀</div>
                    ) : isInCart(game) ? (
                      <Trash size={16} />
                    ) : (
                      <ShoppingCart size={16} />
                    )}
                  </Button>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      isInWishlist(game) ? removeFromWishlist(game) : addToWishlist(game);
                    }}
                    disabled={wishlistLoading === game._id}
                  >
                    {wishlistLoading === game._id ? (
                      <div className="animate-spin">🌀</div>
                    ) : isInWishlist(game) ? (
                      <FaHeart size={16} />
                    ) : (
                      <CiHeart size={16} />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default GamesList;