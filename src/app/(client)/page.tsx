"use client";
import React, { useEffect, useState, useCallback } from "react";
import Hero from "./home/page";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";


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

const GameCard: React.FC<{ game: Game }> = ({ game }) => (
  <div className="game-card p-5 border-2 rounded-2xl border-gray-300 shadow-md">
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
    </div>
  </div>
);

const Home: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [query, setQuery] = useState("");
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

  const filteredGames = games
    .filter((game) =>
      game.name.toLowerCase().includes(query.toLowerCase())
    );

  const getGamesByCategory = (category: string) =>
    filteredGames
      .filter((game) => game.category.toLowerCase() === category.toLowerCase())
      .slice(0, 6); // Get only the first 6 games

  useEffect(() => {
    fetchGames();
  }, [fetchGames]);

  return (
    <div className="mt-24">
      <Hero onSearch={setQuery} />

      {/* Featured Mobile Games */}
      <section className="container mx-auto px-4 my-8">
        <h2 className="text-center text-2xl font-semibold mb-6">Featured Mobile Games</h2>
        {filteredGames.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {getGamesByCategory("Mobile").map((game) => (
              <GameCard key={game._id} game={game} />
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
            <GameCard key={game._id} game={game} />
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
