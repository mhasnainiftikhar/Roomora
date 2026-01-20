import React from 'react';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-100 pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Section */}
                    <div className="flex flex-col gap-6">
                        <img src={assets.logo} alt="RoomOra Logo" className="w-32 brightness-0" />
                        <p className="text-gray-500 leading-relaxed max-w-sm">
                            Discover the world's most luxurious stays. We curate unforgettable experiences
                            in the most breathtaking destinations across the globe.
                        </p>
                        <div className="flex gap-4">
                            {[assets.facebookIcon, assets.instagramIcon, assets.twitterIcon, assets.linkendinIcon].map((icon, index) => (
                                <a key={index} href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center hover:bg-gray-900 transition-all group">
                                    <img src={icon} alt="social" className="w-5 h-5 group-hover:invert transition-all brightness-0" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-gray-900 font-bold mb-6 text-lg">Destinations</h4>
                        <ul className="flex flex-col gap-4">
                            {['New York', 'London', 'Dubai', 'Singapore', 'Paris'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors">{item}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="text-gray-900 font-bold mb-6 text-lg">Support</h4>
                        <ul className="flex flex-col gap-4">
                            {['Help Centre', 'Safety Information', 'Cancellation Options', 'Our COVID-19 Response', 'Report a Concern'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors">{item}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="text-gray-900 font-bold mb-6 text-lg">Company</h4>
                        <ul className="flex flex-col gap-4">
                            <li><Link to="/about" className="text-gray-500 hover:text-gray-900 transition-colors">About Us</Link></li>
                            {['Careers', 'Latest News', 'Investors', 'RoomOra Plus'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors">{item}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-gray-500 text-sm">
                        © {new Date().getFullYear()} RoomOra. All rights reserved.
                    </p>
                    <div className="flex gap-8 text-sm text-gray-500">
                        <Link to="/privacy" className="hover:text-gray-900 uppercase tracking-tighter font-bold">Privacy Policy</Link>
                        <Link to="/terms" className="hover:text-gray-900 uppercase tracking-tighter font-bold">Terms of Service</Link>
                        <Link to="/cookies" className="hover:text-gray-900 uppercase tracking-tighter font-bold">Cookies Settings</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
