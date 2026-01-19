import React from 'react';
import { exclusiveOffers } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const ExclusiveOffers = () => {
    const navigate = useNavigate();

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 mb-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                <div>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 font-playfair">
                        Exclusive Offers
                    </h2>
                    <p className="text-gray-600 max-w-2xl">
                        Discover our specially curated deals and seasonal packages designed to give you
                        the best value for your luxury stays.
                    </p>
                </div>
                <button
                    onClick={() => navigate('/rooms')}
                    className="text-black font-bold transition-all flex items-center gap-2 group whitespace-nowrap hover:text-gray-600"
                >
                    View All Offers
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {exclusiveOffers.map((offer) => (
                    <div
                        key={offer._id}
                        className="group relative h-[400px] rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer"
                        onClick={() => navigate('/rooms')}
                    >
                        {/* Background Image */}
                        <img
                            src={offer.image}
                            alt={offer.title}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500" />

                        {/* Content Overlay */}
                        <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                            {/* Discount Badge */}
                            <div className="absolute top-6 left-6 bg-white/20 backdrop-blur-md border border-white/30 text-white px-4 py-1.5 rounded-full font-bold text-[10px] uppercase tracking-wider">
                                Up to {offer.priceOff}% Off
                            </div>

                            <h3 className="text-2xl font-bold mb-2 font-playfair tracking-tight">
                                {offer.title}
                            </h3>

                            <p className="text-gray-200 text-sm mb-6 line-clamp-2 italic opacity-90 group-hover:opacity-100 transition-opacity">
                                "{offer.description}"
                            </p>

                            <div className="flex items-center justify-between">
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Expires</span>
                                    <span className="text-sm font-semibold">{offer.expiryDate}</span>
                                </div>

                                <button className="bg-white text-gray-900 px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-gray-100 transition-all active:scale-95 shadow-lg group-hover:px-8">
                                    View Offer
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExclusiveOffers;
