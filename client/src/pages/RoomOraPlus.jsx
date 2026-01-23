import React from 'react';

const RoomOraPlus = () => {
    return (
        <div>
            {/* Hero Section */}
            <div className="bg-gray-900 text-white py-32 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-10"></div>
                {/* Decorative background circle */}
                <div className="absolute -right-20 -top-20 w-[600px] h-[600px] bg-purple-900 rounded-full blur-[100px] opacity-40"></div>

                <div className="max-w-7xl mx-auto px-4 relative z-20">
                    <span className="text-purple-400 tracking-[0.3em] text-sm font-bold uppercase mb-4 block">Introducing</span>
                    <h1 className="text-6xl md:text-8xl font-playfair mb-6">RoomOra <span className="text-purple-400 italic">Plus</span></h1>
                    <p className="text-xl md:text-2xl text-gray-300 max-w-2xl leading-relaxed mb-10">
                        A selection of homes verified for quality and design. Exceptional homes, exceptional hosts.
                    </p>
                    <button className="bg-white text-gray-900 px-10 py-4 rounded-full font-bold hover:bg-purple-50 transition-colors">
                        Explore Plus Homes
                    </button>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-24">
                <div className="grid md:grid-cols-3 gap-12 text-center">
                    <div className="p-8">
                        <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">✓</div>
                        <h3 className="text-2xl font-bold mb-4 font-playfair">Verified Quality</h3>
                        <p className="text-gray-600">Every home is visited in person to ensure it meets our 100+ point quality inspection.</p>
                    </div>
                    <div className="p-8">
                        <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">★</div>
                        <h3 className="text-2xl font-bold mb-4 font-playfair">One-of-a-kind Design</h3>
                        <p className="text-gray-600">Thoughtfully designed homes with character, from modern lofts to historic villas.</p>
                    </div>
                    <div className="p-8">
                        <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">♥</div>
                        <h3 className="text-2xl font-bold mb-4 font-playfair">Exceptional Hospitality</h3>
                        <p className="text-gray-600">Hosts with a track record of great reviews and attention to detail.</p>
                    </div>
                </div>
            </div>

            {/* Showcase Section Placeholder */}
            <div className="bg-gray-50 py-24">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-4xl font-bold font-playfair mb-12 text-center text-gray-900">Curated Collections</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="h-96 bg-white rounded-2xl shadow-md p-8 flex items-end relative overflow-hidden group cursor-pointer">
                            <div className="absolute inset-0 bg-gray-300 group-hover:scale-105 transition-transform duration-700"></div>
                            <div className="relative z-10 bg-white/90 backdrop-blur-sm p-6 rounded-xl w-full">
                                <h3 className="text-2xl font-bold mb-2">Design Gems</h3>
                                <p className="text-gray-600">Architectural marvels and interior design masterpieces.</p>
                            </div>
                        </div>
                        <div className="h-96 bg-white rounded-2xl shadow-md p-8 flex items-end relative overflow-hidden group cursor-pointer">
                            <div className="absolute inset-0 bg-gray-300 group-hover:scale-105 transition-transform duration-700"></div>
                            <div className="relative z-10 bg-white/90 backdrop-blur-sm p-6 rounded-xl w-full">
                                <h3 className="text-2xl font-bold mb-2">City Sanctuaries</h3>
                                <p className="text-gray-600">Peaceful retreats in the heart of the world's busiest cities.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomOraPlus;
