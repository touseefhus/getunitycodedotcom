"use client";
import { useParams } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";

interface Game {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  image: string;
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
    return <div>Loading game details...</div>;
  }

  return (
    <div className="container">
      <div className="">
        <Image src={game.image} alt={game.name} />
        <p>{game.name}</p>
        <strong>
          <p>{game.price}</p>
        </strong>
        {/* <p>{game.description}</p> */}
      </div>
    </div>
  );
};

export default GameDetails;
