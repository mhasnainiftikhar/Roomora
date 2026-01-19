import React from 'react';
import { exclusiveOffers } from '../assets/assets';

const ExclusiveOffers = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 mb-20">
            <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 font-playfair">
                    Exclusive Offers
                </h2>
                <p className="text-gray-600 max-w-2xl">
                    Discover our specially curated deals and seasonal packages designed to give you
                    the best value for your luxury stays.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {exclusiveOffers.map((offer) => (
                    <div
                        key={offer._id}
                        className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100"
                    >
                        {/* Image Container */}
                        <div className="relative h-64 overflow-hidden">
                            <img
                                src={offer.image}
                                alt={offer.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            {/* Discount Badge */}
                            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-gray-900 px-4 py-2 rounded-2xl font-bold text-sm shadow-sm">
                                Up to {offer.priceOff}% Off
                            </div>
                        </div>

                        {/* Content Container */}
                        <div className="p-8">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-xl font-bold text-gray-900 leading-tight group-hover:text-gray-700 transition-colors">
                                    {offer.title}
                                </h3>
                            </div>

                            <p className="text-gray-600 text-sm mb-6 line-clamp-2 italic">
                                "{offer.description}"
                            </p>

                            <div className="flex items-center justify-between mt-auto">
                                <div className="flex flex-col">
                                    <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Valid Until</span>
                                    <span className="text-sm font-bold text-gray-900">{offer.expiryDate}</span>
                                </div>

                                <button className="bg-gray-900 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-gray-800 transition-all active:scale-95 shadow-lg hover:shadow-gray-200">
                                    Claim Offer
                                </button>
                            </div>
                        </div>

                        {/* Decorative Border on Hover */}
                        <div className="absolute inset-0 border-2 border-transparent group-hover:border-gray-900/10 rounded-3xl pointer-events-none transition-colors duration-500" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExclusiveOffers;
