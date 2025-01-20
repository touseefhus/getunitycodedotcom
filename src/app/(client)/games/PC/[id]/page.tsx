"use client";
import { useParams } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import parse from "html-react-parser";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick"

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

    const hardcodedImages = [
        game.image,
        "/images/sample1.jpg", // Replace with actual image URLs
        "/images/sample2.jpg",
        "/images/sample3.jpg",
    ];

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
    };

    return (
        <>
            <div style={{ marginTop: "80px" }} className="container px-1 mx-auto">
                <div className="grid grid-cols-2 gap-4">
                    {/* Image Carousel */}
                    <div>
                        <Slider {...sliderSettings}>
                            {hardcodedImages.map((image, index) => (
                                <div key={index}>
                                    <img
                                        src={image}
                                        alt={`Slide ${index + 1}`}
                                        className="w-full object-cover"
                                    />
                                </div>
                            ))}
                        </Slider>
                    </div>

                    {/* Game Details */}
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">{game.name}</h2>
                        <div className="mt-6 space-y-2">
                            <ul>
                                <li>{game.licenseAgreement}</li>
                                <li>{game.latestVersion}</li>
                                <li>{game.latestReleaseDate}</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div className="mt-4">
                    <div className="text-gray-600">{parse(game.description)}</div>
                </div>
            </div>
        </>
    );
};

export default GameDetails;
