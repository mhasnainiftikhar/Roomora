import React from 'react';
import { assets } from '../assets/assets';

const SignUpCTA = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 mb-20">
            <div className="relative overflow-hidden rounded-[2rem] bg-gray-900">
                {/* Background Pattern/Overlay */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-[100px] -mr-48 -mt-48" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500 rounded-full blur-[100px] -ml-48 -mb-48" />
                </div>

                <div className="relative flex flex-col lg:flex-row items-stretch">
                    {/* Text Content */}
                    <div className="flex-1 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                        <img src={assets.logo} alt="RoomOra Logo" className="w-32 mb-8 brightness-0 invert opacity-60" />
                        <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 font-playfair leading-tight">
                            Ready to Experience <br />
                            <span className="text-gray-400">The Extraordinary?</span>
                        </h2>
                        <p className="text-gray-300 text-lg mb-10 max-w-xl leading-relaxed">
                            Join our exclusive community of travelers and access members-only deals,
                            personalized recommendations, and seamless booking experiences.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3 max-w-md">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-grow px-6 py-4 bg-gray-800/50 border border-gray-700 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-700 transition-all"
                            />
                            <button className="px-8 py-4 bg-white text-gray-900 font-bold rounded-2xl hover:bg-gray-100 transition-all active:scale-95 shadow-xl whitespace-nowrap">
                                Subscribe
                            </button>
                        </div>

                        <div className="mt-12 flex items-center gap-6">
                            <div className="flex -space-x-3">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="w-10 h-10 rounded-full border-2 border-gray-900 bg-gray-800 overflow-hidden">
                                        <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="user" />
                                    </div>
                                ))}
                            </div>
                            <p className="text-sm text-gray-400">
                                Join <span className="text-white font-bold">10,000+</span> happy travelers
                            </p>
                        </div>
                    </div>

                    {/* Image Area */}
                    <div className="flex-1 relative min-h-[300px] lg:min-h-auto overflow-hidden">
                        <img
                            src={assets.regImage}
                            alt="Registration"
                            className="absolute inset-0 w-full h-full object-cover lg:object-center opacity-80 lg:opacity-100"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-transparent to-transparent lg:block hidden" />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent block lg:hidden" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUpCTA;
