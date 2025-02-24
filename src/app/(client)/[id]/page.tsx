"use client";
import { useParams } from "next/navigation";
import axios from "axios";
import { useEffect, useState, useCallback, useMemo } from "react";
import parse from "html-react-parser";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import PaymentMethods from "@/components/paymentmethods/page";

interface Platform {
    platform: string;
    price: number;
    _id: string;
}

interface Version {
    version: string;
    price: number;
    _id: string;
}

interface Game {
    _id: string;
    name: string;
    description: string;
    category: string;
    image: string;
    gallery: string[];
    platforms: Platform[];
    versions: Version[];
}

const GameDetails: React.FC = () => {
    const { id } = useParams();
    const [game, setGame] = useState<Game | null>(null);
    const [selectedOptions, setSelectedOptions] = useState<{
        platform: Platform | null;
        version: Version | null;
    }>({
        platform: null,
        version: null,
    });

    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);

    // Fetch Game Data
    const fetchSingleGame = useCallback(async (gameId: string) => {
        try {
            const response = await axios.get(`/api/games?id=${gameId}`);
            const fetchedGame = response.data.game;
            setGame(fetchedGame);

            // Set default selections
            setSelectedOptions({
                platform: fetchedGame.platforms[0] || null,
                version: fetchedGame.versions[0] || null,
            });
        } catch (error) {
            console.error("Error while fetching game details", error);
        }
    }, []);

    useEffect(() => {
        if (id) {
            fetchSingleGame(id as string);
        }
    }, [id, fetchSingleGame]);

    // Compute Total Price
    const totalPrice = useMemo(() => {
        return (
            (selectedOptions.platform?.price || 0) +
            (selectedOptions.version?.price || 0)
        );
    }, [selectedOptions]);

    if (!game) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <p className="text-lg font-semibold text-gray-700 animate-pulse">
                    Loading game details...
                </p>
            </div>
        );
    }

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        customPaging: () => (
            <div className="w-3 h-3 bg-gray-400 rounded-full cursor-pointer"></div>
        ),
    };

    return (
        <div style={{ marginTop: "90px" }} className="container px-4 mx-auto">
            <div className="grid grid-cols-3 gap-6">
                {/* Image Carousel */}
                <div className="col-span-2">
                    <Slider {...sliderSettings}>
                        {game.gallery.map((image, index) => (
                            <div key={index}>
                                <img
                                    src={image}
                                    alt={`Slide ${index + 1}`}
                                    className="w-full h-[400px] object-cover"
                                />
                            </div>
                        ))}
                    </Slider>
                </div>

                {/* Game Details */}
                <div className="col-span-1">
                    <h2 className="text-2xl font-bold text-gray-800">{game.name}</h2>

                    <div className="mt-2 text-lg text-gray-600">
                        <p>Platform Price: ${selectedOptions.platform?.price?.toFixed(2) || "0.00"}</p>
                        <p>Version Price: ${selectedOptions.version?.price?.toFixed(2) || "0.00"}</p>
                        <p className="font-bold">Total Price: ${totalPrice.toFixed(2)}</p>
                    </div>

                    {/* Platform Selection */}
                    <h4 className="text-lg font-semibold text-gray-800 mt-4">Select Platform:</h4>
                    <div className="flex space-x-4 mt-3">
                        {game.platforms.map((platform) => (
                            <button
                                key={platform._id}
                                onClick={() =>
                                    setSelectedOptions((prev) => ({
                                        ...prev,
                                        platform,
                                    }))
                                }
                                className={`px-4 py-2 border ${
                                    selectedOptions.platform?._id === platform._id
                                        ? "bg-indigo-600 text-white"
                                        : "bg-white text-gray-700"
                                } rounded-md shadow-sm hover:bg-indigo-500 hover:text-white focus:outline-none`}
                            >
                                {platform.platform.charAt(0).toUpperCase() + platform.platform.slice(1)}
                            </button>
                        ))}
                    </div>

                    {/* Version Selection */}
                    {game.versions.length > 0 && (
                        <div className="mt-4">
                            <label htmlFor="unity-version" className="block text-gray-700 font-medium">
                                Select Unity Version:
                            </label>
                            <select
                                id="unity-version"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                onChange={(e) => {
                                    const selected = game.versions.find((v) => v.version === e.target.value);
                                    if (selected) {
                                        setSelectedOptions((prev) => ({
                                            ...prev,
                                            version: selected,
                                        }));
                                    }
                                }}
                                value={selectedOptions.version?.version || ""}
                            >
                                {game.versions.map((version) => (
                                    <option key={version._id} value={version.version}>
                                        {version.version} - ${version.price.toFixed(2)}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* Payment Methods */}
                    <PaymentMethods onSelect={setSelectedPaymentMethod} />

                    {/* Key Features */}
                    <div className="mt-6 space-y-2">
                        <h4 className="text-lg font-semibold text-gray-800">Key Features:</h4>
                        <ul className="list-disc pl-5">
                            <li className="flex items-center space-x-2 text-gray-700">
                                <span className="text-green-500">✔</span>
                                <span>3-months free support</span>
                            </li>
                            <li className="flex items-center space-x-2 text-gray-700">
                                <span className="text-green-500">✔</span>
                                <span>Error-free</span>
                            </li>
                            <li className="flex items-center space-x-2 text-gray-700">
                                <span className="text-green-500">✔</span>
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
