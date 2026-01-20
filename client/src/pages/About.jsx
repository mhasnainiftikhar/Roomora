import React from 'react';
import { assets } from '../assets/assets';

const About = () => {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src={assets.regImage}
                        alt="About RoomOra"
                        className="w-full h-full object-cover scale-105 animate-slow-zoom"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                </div>

                <div className="relative z-10 text-center px-4 max-w-4xl">
                    <h1 className="text-5xl md:text-7xl font-black text-white font-playfair mb-6 leading-tight">
                        Crafting Moments of <br /> Unrivaled Elegance
                    </h1>
                    <p className="text-xl text-white/90 font-medium tracking-wide uppercase">
                        The Story of RoomOra
                    </p>
                </div>
            </section>

            {/* Our Story Section */}
            <section className="py-24 px-4 md:px-16 lg:px-24 xl:px-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div>
                        <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-500 mb-4">Our Heritage</h2>
                        <h3 className="text-4xl md:text-5xl font-black text-gray-900 font-playfair mb-8 leading-tight">
                            A Vision Born from the <br /> Pursuit of Perfection
                        </h3>
                        <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
                            <p>
                                RoomOra was founded on a simple yet profound realization: that true luxury is not just about the space you occupy, but the feeling it evokes. Our journey began in the heart of the world's most vibrant cities, seeking out properties that didn't just meet standards, but set them.
                            </p>
                            <p>
                                From boutique retreats in hidden coastal enclaves to grand architectural icons in bustling metropolises, we've curated a collection that represents the pinnacle of global hospitality. Every property in our portfolio is a testament to our commitment to beauty, comfort, and character.
                            </p>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl">
                            <img
                                src={assets.roomImg1}
                                alt="Story Image"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="absolute -bottom-10 -left-10 bg-white p-10 rounded-3xl shadow-xl hidden md:block">
                            <p className="text-4xl font-black text-gray-900 mb-1">15+</p>
                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Years of Excellence</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="bg-gray-50 py-24 px-4 md:px-16 lg:px-24 xl:px-32">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 font-playfair mb-4">Our Core Philosophy</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto font-medium">The principles that guide our curation and define our promise to you.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {[
                        {
                            title: "Uncompromising Quality",
                            desc: "We vet every property with a meticulous eye, ensuring that every detail—from the thread count to the concierge service—meets our elite standards.",
                            icon: assets.starIconFilled
                        },
                        {
                            title: "Personalized Service",
                            desc: "Luxury is personal. We believe in providing experiences that are as unique as our guests, tailored to your specific desires and needs.",
                            icon: assets.badgeIcon
                        },
                        {
                            title: "Global Citizenship",
                            desc: "We celebrate the diversity of our destinations, fostering a deep respect for local cultures while maintaining a worldwide standard of excellence.",
                            icon: assets.locationFilledIcon
                        }
                    ].map((value, index) => (
                        <div key={index} className="bg-white p-12 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-500 group">
                            <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-gray-900 transition-colors">
                                <img src={value.icon} alt={value.title} className="w-8 h-8 group-hover:invert group-hover:brightness-0 transition-all" />
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h4>
                            <p className="text-gray-500 leading-relaxed">{value.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Quote Section */}
            <section className="py-24 px-4 text-center">
                <div className="max-w-3xl mx-auto">
                    <span className="text-6xl text-gray-200 block mb-8">"</span>
                    <p className="text-3xl font-playfair font-black text-gray-900 italic mb-8 leading-relaxed">
                        "Luxury must be comfortable, otherwise it is not luxury."
                    </p>
                    <div className="w-12 h-1 bg-orange-500 mx-auto mb-6 rounded-full" />
                    <p className="text-sm font-black uppercase tracking-widest text-gray-400">Coco Chanel</p>
                </div>
            </section>
        </div>
    );
};

export default About;
