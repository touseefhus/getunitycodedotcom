"use client"
import { useParams } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import parse from "html-react-parser";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

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
    availableVersions?: string[];
    platforms: string[];
    platformPricing: Record<string, { [key: string]: number }>; // Store pricing by platform and version
}

const GameDetails: React.FC = () => {
    const { id } = useParams();
    const [game, setGame] = useState<Game | null>(null);
    const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
    const [selectedVersion, setSelectedVersion] = useState<string | null>(null);
    const [updatedPrice, setUpdatedPrice] = useState<number | null>(null);

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

    useEffect(() => {
        if (game && selectedPlatform && selectedVersion) {
            // Update price based on selected platform and version
            const platformPricing = game.platformPricing[selectedPlatform];
            if (platformPricing) {
                setUpdatedPrice(platformPricing[selectedVersion] || game.price);
            }
        }
    }, [selectedPlatform, selectedVersion, game]);

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
        "/images/sample1.jpg",
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
        <div style={{ marginTop: "90px" }} className="container px-4 mx-auto">
            <div className="grid grid-cols-3 gap-6">
                {/* Image Carousel (2/3 of the width) */}
                <div className="col-span-2">
                    <Slider {...sliderSettings}>
                        {hardcodedImages.map((image, index) => (
                            <div key={index}>
                                <img
                                    src={image}
                                    alt={`Slide ${index + 1}`}
                                    className=" object-cover"
                                />
                            </div>
                        ))}
                    </Slider>
                </div>

                {/* Game Details (1/3 of the width) */}
                <div className="col-span-1">
                    <h2 className="text-2xl font-bold text-gray-800">{game.name}</h2>
                    <p className="mt-2 text-lg text-gray-600">Price: ${updatedPrice?.toFixed(2) || game.price.toFixed(2)}</p>

                    {/* Platform Selection */}
                    <h4 className="text-lg font-semibold text-gray-800">Select Platform:</h4>
                    <div className="flex space-x-4 mt-3">
                        {game?.platforms?.length > 0 ? (
                            game.platforms.map((platform) => (
                                <button
                                    key={platform}
                                    onClick={() => setSelectedPlatform(platform)}
                                    className={`px-4 py-2 border ${selectedPlatform === platform
                                        ? "bg-indigo-600 text-white"
                                        : "bg-white text-gray-700"
                                        } rounded-md shadow-sm hover:bg-indigo-500 hover:text-white focus:outline-none`}
                                >
                                    {platform.charAt(0).toUpperCase() + platform.slice(1)}
                                </button>
                            ))
                        ) : (
                            <p className="text-gray-600">No platforms available.</p>
                        )}
                    </div>

                    {/* Version Selection */}
                    <div className="mt-4">
                        <label htmlFor="unity-version" className="block text-gray-700 font-medium">
                            Select Unity Version:
                        </label>
                        <select
                            id="unity-version"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            onChange={(e) => setSelectedVersion(e.target.value)}
                        >
                            {game.availableVersions && game.availableVersions.length > 0 ? (
                                game.availableVersions.map((version, index) => (
                                    <option key={index} value={version}>
                                        {version}
                                    </option>
                                ))
                            ) : (
                                <option value="">No versions available</option>
                            )}
                        </select>
                    </div>

                    <div className="mt-6 space-y-2">
                        <ul className="list-disc pl-5">
                            <li>License: {game.licenseAgreement}</li>
                            <li>Latest Version: {game.latestVersion}</li>
                            <li>Release Date: {game.latestReleaseDate}</li>
                        </ul>
                    </div>
                    {/* Static Features */}
                    <div className="mt-6 space-y-2">
                        <h4 className="text-lg font-semibold text-gray-800">Key Features:</h4>
                        <ul className="list-disc pl-5">
                            <li className="flex items-center space-x-2 text-gray-700">
                                <span className="text-green-500">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        className="w-6 h-6"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                </span>
                                <span>3-months free support</span>
                            </li>
                            <li className="flex items-center space-x-2 text-gray-700">
                                <span className="text-green-500">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        className="w-6 h-6"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                </span>
                                <span>Error-free</span>
                            </li>
                            <li className="flex items-center space-x-2 text-gray-700">
                                <span className="text-green-500">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        className="w-6 h-6"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                </span>
                                <span>Reskinning available</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Description */}
            <div className="mt-8">
                <h3 className="text-xl font-semibold text-gray-800">Description</h3>
                <div className="mt-2 text-gray-600">{parse(game.description)}</div>
            </div>
        </div>
    );
};

export default GameDetails;
