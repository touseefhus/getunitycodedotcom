"use client";
import React, { useEffect, useState, useCallback } from "react";
import Hero from "./home/page";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Trash } from "lucide-react";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import Navbar from "@/components/Navbar/page"; // Import the Navbar component

// Define the Game type
interface Game {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  uploadDate: string;
}

const GameCard: React.FC<{ game: Game; isInCart: (game: Game) => boolean; isInWishlist: (game: Game) => boolean; addToCart: (e: React.MouseEvent<HTMLButtonElement>, game: Game) => void; removeFromCart: (game: Game) => void; addToWishlist: (game: Game) => void; removeFromWishlist: (game: Game) => void; router: any }> = ({ game, isInCart, isInWishlist, addToCart, removeFromCart, addToWishlist, removeFromWishlist, router }) => (
  <div className="game-card p-5 border-2 rounded-2xl border-gray-300 shadow-md" onClick={() => router.push(`/games/${game.category}/${game._id}`)}>
    <img
      src={game.image || "/default-image.png"}
      alt={game.name}
      className="w-full h-48 object-cover rounded-lg"
    />
    <div className="p-4">
      <h5 className="font-semibold">{game.name}</h5>
      <p className="text-gray-800 mt-2">
        <strong>Price:</strong> ${game.price.toFixed(2)}
      </p>
      <div className="flex justify-between items-center mt-4">
        <Button onClick={() => router.push(`/games/${game.category}/${game._id}`)} className="custom-btn">
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
);

const Home: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [query, setQuery] = useState("");
  const [cartDetails, setCartDetails] = useState<Game[]>([]);
  const [wishlist, setWishlist] = useState<Game[]>([]);
  const router = useRouter();

  const fetchGames = useCallback(async () => {
    try {
      const response = await axios.get("/api/games");
      const sortedGames = response.data.games
        .sort(
          (a: Game, b: Game) =>
            new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime()
        ); // Sorting games in descending order by date
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

  const filteredGames = games
    .filter((game) =>
      game.name.toLowerCase().includes(query.toLowerCase())
    );

  const getGamesByCategory = (category: string) =>
    filteredGames
      .filter((game) => game.category.toLowerCase() === category.toLowerCase())
      .slice(0, 6); // Get only the first 6 games

  return (
    <div className="mt-24">
      {/* Add the Navbar component here */}
      <Navbar wishlistDetails={wishlist.length} cartDetails={cartDetails.length} />

      <Hero onSearch={setQuery} />

      {/* Featured Mobile Games */}
      <section className="container mx-auto px-4 my-8">
        <h2 className="text-center text-2xl font-semibold mb-6">Featured Mobile Games</h2>
        {filteredGames.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {getGamesByCategory("Mobile").map((game) => (
              <GameCard
                key={game._id}
                game={game}
                isInCart={isInCart}
                isInWishlist={isInWishlist}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
                addToWishlist={addToWishlist}
                removeFromWishlist={removeFromWishlist}
                router={router}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-xl">No games found matching your search.</p>
        )}
        <div className="text-center mt-6">
          <Button className="custom-btn" onClick={() => router.push("/games/Mobile")}>Load More</Button>
        </div>
      </section>

      {/* Featured PC Games */}
      <section className="container mx-auto px-4 my-8">
        <h2 className="text-center text-2xl font-semibold mb-6">Featured PC Games</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {getGamesByCategory("PC").map((game) => (
            <GameCard
              key={game._id}
              game={game}
              isInCart={isInCart}
              isInWishlist={isInWishlist}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              addToWishlist={addToWishlist}
              removeFromWishlist={removeFromWishlist}
              router={router}
            />
          ))}
        </div>
        <div className="text-center mt-6">
          <Button className="custom-btn" onClick={() => router.push("/games/PC")}>Load More</Button>
        </div>
      </section>
    </div>
  );
};

export default Home;