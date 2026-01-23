import React from 'react';
import { assets } from '../assets/assets';

const LatestNews = () => {
    return (
        <div className="max-w-6xl mx-auto px-4 py-20 mt-6">
            <h1 className="text-4xl font-extrabold mb-4 font-playfair text-gray-900">Latest News</h1>
            <p className="text-gray-600 mb-12 text-lg">Updates, stories, and announcements from the RoomOra team.</p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Featured Article */}
                <div className="col-span-full md:grid md:grid-cols-2 gap-8 mb-8 bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                    <div className="h-64 md:h-auto bg-gray-200 relative overflow-hidden">
                       <img src={assets.roomImg6} alt="" />
                    </div>
                    <div className="p-8 flex flex-col justify-center">
                        <span className="text-amber-600 font-bold text-sm tracking-wider mb-2">PRODUCT UPDATE</span>
                        <h2 className="text-3xl font-bold mb-4 text-gray-900">RoomOra Launches "Plus" for Premium Travelers</h2>
                        <p className="text-gray-600 mb-6">
                            Today we are excited to announce RoomOra Plus, a new selection of homes verified for quality and design.
                        </p>
                        <a href="#" className="font-bold text-black border-b-2 border-black inline-block w-max hover:text-amber-600 hover:border-amber-600 transition-colors">Read Full Story</a>
                    </div>
                </div>

                {/* Article Cards */}
                {[
                    { category: 'COMMUNITY', title: 'Celebrating 1 Million Guest Arrivals', date: 'Oct 24, 2025' },
                    { category: 'SUSTAINABILITY', title: 'Our Commitment to Carbon Neutral Travel', date: 'Sep 15, 2025' },
                    { category: 'TRAVEL TRENDS', title: 'Top 10 Destinations for Remote Work in 2026', date: 'Aug 02, 2025' },
                ].map((news, index) => (
                    <div key={index} className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow group">
                        <div className="h-48 bg-gray-100 relative">
                            <div className="absolute inset-0 bg-gray-200 group-hover:bg-gray-300 transition-colors"></div>
                        </div>
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-xs font-bold text-amber-600">{news.category}</span>
                                <span className="text-xs text-gray-400">{news.date}</span>
                            </div>
                            <h3 className="font-bold text-xl mb-3 text-gray-900 group-hover:text-amber-600 transition-colors">{news.title}</h3>
                            <a href="#" className="text-sm font-semibold underline cursor-pointer">Read More</a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LatestNews;
