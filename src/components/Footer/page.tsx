import React from 'react';

function Footer() {
    return (
        <footer id='gradient' className="text-white py-8 mt-5">
            <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Column 1: Logo and Description */}
                <div>
                    <h2 className="text-2xl font-bold mb-3">GetUnityCodes</h2>
                    <p className="text-sm">
                        Your one-stop solution for premium Unity game source codes. Start building amazing games today!
                    </p>
                </div>
                {/* Column 2: Links */}
                <div>
                    <h3 className="font-semibold mb-3">Company</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-gray-400">About Us</a></li>
                        <li><a href="#" className="hover:text-gray-400">Careers</a></li>
                        <li><a href="#" className="hover:text-gray-400">Press</a></li>
                    </ul>
                </div>
                {/* Column 3: Links */}
                <div>
                    <h3 className="font-semibold mb-3">Resources</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-gray-400">Blog</a></li>
                        <li><a href="#" className="hover:text-gray-400">Documentation</a></li>
                        <li><a href="#" className="hover:text-gray-400">Support</a></li>
                    </ul>
                </div>
                {/* Column 4: Links */}
                <div>
                    <h3 className="font-semibold mb-3">Contact</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-gray-400">Email Us</a></li>
                        <li><a href="#" className="hover:text-gray-400">FAQs</a></li>
                        <li><a href="#" className="hover:text-gray-400">Live Chat</a></li>
                    </ul>
                </div>
            </div>
            <div className="text-center text-sm text-gray-400 mt-8">
                © 2024 GetUnityCodes. All rights reserved.
            </div>
        </footer>
    );
}

export default Footer;
