import React from 'react';
import { testimonials, assets } from '../assets/assets';

const Testimonials = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 mb-20">
            <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 font-playfair">
                    What Our Guests Say
                </h2>
                <p className="text-gray-600 max-w-2xl">
                    Don't just take our word for it. Read about the unforgettable experiences
                    shared by our global community of travelers.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {testimonials.map((testimonial) => (
                    <div
                        key={testimonial.id}
                        className="bg-white p-8 rounded-3xl shadow-lg border border-gray-50 flex flex-col hover:shadow-xl transition-shadow duration-300"
                    >
                        {/* Rating */}
                        <div className="flex gap-1 mb-6">
                            {[...Array(5)].map((_, i) => (
                                <img
                                    key={i}
                                    src={i < testimonial.rating ? assets.starIconFilled : assets.starIconOutlined}
                                    alt="star"
                                    className="w-5 h-5"
                                />
                            ))}
                        </div>

                        {/* Review Text */}
                        <p className="text-gray-700 text-lg leading-relaxed mb-8 italic flex-grow">
                            "{testimonial.review}"
                        </p>

                        {/* User Info */}
                        <div className="flex items-center gap-4">
                            <img
                                src={testimonial.image}
                                alt={testimonial.name}
                                className="w-14 h-14 rounded-full object-cover border-2 border-gray-100"
                            />
                            <div>
                                <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                                <p className="text-sm text-gray-500">{testimonial.address}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Testimonials;
