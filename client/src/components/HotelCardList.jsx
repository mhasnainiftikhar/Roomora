import React from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { assets } from "../assets/assets"

const HotelCardList = ({ room }) => {
    const [searchParams] = useSearchParams();
    const hotelName = room?.hotel?.name || "Premium Hotel";
    const mainImage = room?.images?.[0] || assets.regImage;
    const price = room?.price || room?.pricePerNight || "150";
    const rating = room?.rating || "4.8";
    const location = room?.location || room?.hotel?.city || "Maldives";
    const type = room?.roomType || "Double Bed";

    return (
        <Link
            to={`/room/${room?._id}?${searchParams.toString()}`}
            onClick={() => window.scrollTo(0, 0)}
            className="group flex flex-col md:flex-row bg-white rounded-[2rem] overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
        >
            {/* Image Container */}
            <div className="relative w-full md:w-[40%] aspect-[4/3] md:aspect-auto overflow-hidden">
                <img
                    src={mainImage}
                    alt={hotelName}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase text-gray-900 shadow-sm">
                    {type}
                </div>
            </div>

            {/* Content Container */}
            <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
                <div>
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h3 className="text-xl md:text-2xl font-extrabold text-gray-900 mb-2 font-playfair group-hover:text-gray-600 transition-colors">
                                {hotelName}
                            </h3>
                            <p className="text-gray-500 text-sm flex items-center gap-2 font-medium">
                                <img src={assets.locationIcon} alt="loc" className="w-4 h-4 opacity-50" />
                                {location}
                            </p>
                        </div>
                        <div className="flex items-center gap-1.5 bg-gray-900 text-white px-3 py-1.5 rounded-xl font-bold text-sm">
                            <img src={assets.starIconFilled} alt="Rating" className="h-4 w-4 brightness-0 invert" />
                            {rating}
                        </div>
                    </div>

                    <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-2">
                        Experience unparalleled luxury in this exquisite {type.toLowerCase()} at {hotelName}.
                        Featuring world-class amenities and breathtaking views for an unforgettable stay.
                    </p>

                    <div className="flex flex-wrap gap-2 mb-8">
                        {room.amenities.slice(0, 3).map((amenity, idx) => (
                            <span key={idx} className="bg-gray-50 text-gray-400 px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider">
                                {amenity}
                            </span>
                        ))}
                        {room.amenities.length > 3 && (
                            <span className="text-[10px] font-bold text-gray-300 self-center">+{room.amenities.length - 3} more</span>
                        )}
                    </div>
                </div>

                <div className="flex items-center justify-between border-t border-gray-50 pt-6">
                    <div>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Nightly rate</span>
                        <p className="text-2xl font-black text-gray-900">
                            ${price}<span className="text-sm font-bold text-gray-400 ml-1">avg.</span>
                        </p>
                    </div>
                    <div className="bg-gray-900 text-white px-8 py-3.5 rounded-2xl font-bold text-sm hover:shadow-2xl hover:bg-gray-800 transition-all active:scale-95 cursor-pointer">
                        View Details
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default HotelCardList
