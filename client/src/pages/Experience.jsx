import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const Experience = () => {
    const navigate = useNavigate();
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section className="relative h-[90vh] flex items-center justify-center overflow-hidden ">
                <div className="absolute inset-0 z-0">
                    <img
                        src={assets.experienceHero}
                        alt="The Experience"
                        className="w-full h-full object-cover scale-105 animate-slow-zoom"
                    />
                    <div className="absolute inset-0 bg-black/50" />
                </div>

                <div className="relative z-10 text-center px-4 max-w-4xl">
                    <h2 className="text-orange-400 font-black uppercase tracking-[0.4em] text-sm mb-6 mt-6">Elevate Your Stay</h2>
                    <h1 className="text-5xl md:text-8xl font-black text-white font-playfair mb-8 leading-tight">
                        The Art of <br /> Discovery
                    </h1>
                    <p className="text-xl text-white/80 font-medium max-w-xl mx-auto leading-relaxed">
                        Every stay is a curated journey designed to inspire, indulge, and immerse you in the extraordinary.
                    </p>
                </div>
            </section>

            {/* Experience Categories */}
            <section className="py-24 px-4 md:px-16 lg:px-24 xl:px-32 bg-white">
                <div className="flex flex-col md:flex-row gap-12 items-center mb-32">
                    <div className="w-full md:w-1/2">
                        <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl skew-y-1">
                            <img src={assets.roomImg7} alt="Culinary" className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000" />
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 md:pl-12">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-500 mb-4">Culinary Excellence</h3>
                        <h4 className="text-4xl font-black text-gray-900 font-playfair mb-8 leading-tight">A Symphony of Flavors</h4>
                        <p className="text-gray-600 leading-relaxed text-lg mb-8">
                            From Michelin-starred dining rooms overlooking the cityscape to private chef experiences under the stars, our culinary offerings are designed to be as memorable as the destinations themselves. We source only the finest local ingredients to create dishes that tell a story.
                        </p>
                        <div className="flex items-center gap-6">
                            <div className="h-0.5 w-12 bg-gray-200" />
                            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest italic">Gastronomic Journeys</p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row-reverse gap-12 items-center mb-32">
                    <div className="w-full md:w-1/2">
                        <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl -skew-y-1">
                            <img src={assets.roomImg5} alt="Wellness" className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000" />
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 md:pr-12">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500 mb-4">Holistic Wellness</h3>
                        <h4 className="text-4xl font-black text-gray-900 font-playfair mb-8 leading-tight">Sanctuaries for the Soul</h4>
                        <p className="text-gray-600 leading-relaxed text-lg mb-8">
                            Restore balance in our world-class spa facilities. From ancient healing traditions to modern wellness therapies, our curated treatments are designed to rejuvenate your mind, body, and spirit in an atmosphere of total tranquility.
                        </p>
                        <div className="flex items-center gap-6">
                            <div className="h-0.5 w-12 bg-gray-200" />
                            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest italic">Revitalizing Retreats</p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-12 items-center">
                    <div className="w-full md:w-1/2">
                        <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl skew-y-1">
                            <img src={assets.roomImg6} alt="Concierge" className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000" />
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 md:pl-12">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-900 mb-4">Bespoke Concierge</h3>
                        <h4 className="text-4xl font-black text-gray-900 font-playfair mb-8 leading-tight">Access the Inaccessible</h4>
                        <p className="text-gray-600 leading-relaxed text-lg mb-8">
                            Our lifestyle managers are dedicated to fulfilling your every whim. Whether it's securing a table at a sold-out venue or arranging a private gallery tour after hours, we ensure your experience is limited only by your imagination.
                        </p>
                        <div className="flex items-center gap-6">
                            <div className="h-0.5 w-12 bg-gray-200" />
                            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest italic">Ultimate Personalization</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Amenities Grid */}
            <section className="bg-gray-950 py-32 px-4 md:px-16 lg:px-24 xl:px-32 text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-96 h-96 bg-gray-800/20 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />

                <div className="relative z-10 text-center mb-24">
                    <h2 className="text-4xl md:text-5xl font-black font-playfair mb-6">The RoomOra Standard</h2>
                    <p className="text-gray-400 font-bold tracking-widest uppercase text-xs">Included in every stay</p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 relative z-10 ">
                    {[
                        { name: "24/7 Butler Service", icon: assets.userIcon },
                        { name: "Luxury Chauffeuring", icon: assets.locationIcon },
                        { name: "In-Room Spa", icon: assets.poolIcon },
                        { name: "Pillow Menu", icon: assets.homeIcon },
                        { name: "Smart Controls", icon: assets.starIconFilled },
                        { name: "Curated Bar", icon: assets.roomServiceIcon },
                        { name: "Fastest WiFi", icon: assets.freeWifiIcon },
                        { name: "Valet Shopping", icon: assets.badgeIcon },
                    ].map((item, index) => (
                        <div key={index} className="flex flex-col items-center text-center p-8 border border-white/5 bg-white/5 rounded-[2rem] hover:bg-white/10 transition-all cursor-pointer">
                            <div className="w-12 h-12 mb-6 flex items-center justify-center bg-white/10 rounded-xl">
                                <img src={item.icon} alt={item.name} className="w-6 h-6 invert" />
                            </div>
                            <p className="font-bold text-sm tracking-wide">{item.name}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-32 px-4 text-center">
                <h2 className="text-4xl md:text-6xl font-black text-gray-900 font-playfair mb-12">Ready to Discover?</h2>
                <button className="bg-gray-900 text-white px-12 py-5 rounded-full font-black uppercase tracking-widest hover:bg-gray-700 transition-all shadow-2xl hover:shadow-gray-400 active:scale-95 leading-none cursor-pointer"
                    onClick={() => navigate('/rooms')}>
                    Explore Our Hotels
                </button>
            </section>
        </div>
    );
};

export default Experience;
