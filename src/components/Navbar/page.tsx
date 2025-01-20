"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { BsCart3 } from "react-icons/bs";
import AuthDialog from "../dialog/authDialog";

interface NavbarProps {
    cartDetails: number; // Expects the cart count as a prop
    wishlistDetails: number; // Expects the wishlist count as a prop
}

const Navbar: React.FC<NavbarProps> = ({ cartDetails, wishlistDetails }) => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    const handleLogout = () => {
        setIsLoggedIn(false); // Set user as logged out
    };

    useEffect(() => {
        // Placeholder for any side effects
    }, []);

    return (
        <nav
            id="nav-bar"
            className="bg-white fixed top-0 left-0 w-full z-50 shadow-md"
        >
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                {/* Logo */}
                <div className="font-bold text-gray-800 text-3xl">
                    <Link href="/">
                        Get<span style={{ color: "#F95919" }}>Unity</span>Codes
                    </Link>
                </div>

                {/* Desktop Links */}
                <div
                    id="nav-link"
                    className="hidden md:flex items-center space-x-6"
                >
                    <Link href="/" className="text-gray-800 hover:text-blue-500">
                        Home
                    </Link>
                    <Link
                        href="/games/Mobile"
                        className="text-gray-800 hover:text-blue-500"
                    >
                        Mobile Games
                    </Link>
                    <Link
                        href="/games/PC"
                        className="text-gray-800 hover:text-blue-500"
                    >
                        PC Games
                    </Link>
                    <Link
                        href="/articles"
                        className="text-gray-800 hover:text-blue-500"
                    >
                        Article
                    </Link>

                    {/* Wish List */}
                    {/* Wish List */}
                    <Link href="/wishlist">
                        <span className="relative flex items-center">
                            <MdOutlineFavoriteBorder className="text-xl" />
                            {wishlistDetails > 0 && (
                                <span
                                    className="absolute top-0 right-0 rounded-full h-5 w-5 flex items-center justify-center"
                                    style={{
                                        transform: "translate(50%, -50%)",
                                        background: "#F5465A",
                                        color: "white",
                                    }}
                                >
                                    {wishlistDetails}
                                </span>
                            )}
                        </span>
                    </Link>


                    {/* Cart */}
                    <Link href="/cart">
                        <span className="relative flex items-center">
                            <BsCart3 className="text-xl" />
                            {cartDetails > 0 && (
                                <span
                                    className="absolute top-0 right-0 rounded-full h-5 w-5 flex items-center justify-center"
                                    style={{
                                        transform: "translate(50%, -50%)",
                                        background: "#F5465A",
                                        color: "white",
                                    }}
                                >
                                    {cartDetails}
                                </span>
                            )}
                        </span>
                    </Link>

                    {/* Auth Buttons */}
                    {isLoggedIn ? (
                        <Button onClick={handleLogout}>Logout</Button>
                    ) : (
                        <Button
                            className="custom-btn"
                            onClick={() => setIsDialogOpen(true)}
                        >
                            Get Started
                        </Button>
                    )}
                </div>

                {/* Mobile Toggle Button */}
                <div className="md:hidden">
                    <button
                        onClick={toggleMenu}
                        className="text-gray-800 hover:text-blue-500 focus:outline-none"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white shadow-lg">
                    <div className="px-4 py-2 flex flex-col space-y-2">
                        <Link
                            href="/"
                            className="text-gray-800 hover:text-blue-500"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            href="/games/Mobile"
                            className="text-gray-800 hover:text-blue-500"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Mobile Games
                        </Link>
                        <Link
                            href="/games/PC"
                            className="text-gray-800 hover:text-blue-500"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            PC Games
                        </Link>
                        <Link
                            href="/articles"
                            className="text-gray-800 hover:text-blue-500"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Article
                        </Link>
                        {isLoggedIn ? (
                            <Button onClick={handleLogout}>Logout</Button>
                        ) : (
                            <Button
                                className="custom-btn"
                                onClick={() => setIsDialogOpen(true)}
                            >
                                Get Started
                            </Button>
                        )}
                    </div>
                </div>
            )}

            {/* Auth Dialog */}
            <AuthDialog
                isDialogOpen={isDialogOpen}
                setIsDialogOpen={setIsDialogOpen}
            />
        </nav>
    );
};

export default Navbar;
