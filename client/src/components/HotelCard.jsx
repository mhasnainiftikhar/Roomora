import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from "../assets/assets"

const HotelCard = ({ room, index }) => {
  // Safe extraction of properties
  const hotelName = room?.hotel?.name || "Premium Hotel";
  const mainImage = room?.images?.[0] || assets.regImage;
  const price = room?.price || room?.pricePerNight || "150";
  const rating = room?.rating || "4.8";
  const location = room?.location || room?.hotel?.city || "Maldives";

  return (
    <Link
      to={"/room/" + room?._id}
      onClick={() => window.scrollTo(0, 0)}
      className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={mainImage}
          alt={hotelName}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />

        {/* Badge */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase text-gray-800 shadow-sm">
          Best Seller
        </div>

        {/* Wishlist Button Placeholder */}
        <button className="absolute top-4 right-4 p-2 bg-white/50 backdrop-blur-md rounded-full hover:bg-white transition-colors">
          <svg className="w-4 h-4 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>

      {/* Content Container */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-800 line-clamp-1 group-hover:text-gray-600 transition-colors">
            {hotelName}
          </h3>
          <div className="flex items-center gap-1 bg-gray-100 px-2 py-0.5 rounded text-black font-semibold text-xs transition-colors group-hover:bg-black group-hover:text-white">
            <img src={assets.starIconFilled} alt="Rating" className="h-3 w-3 brightness-0 transition-all group-hover:invert" />
            {rating}
          </div>
        </div>

        <p className="text-gray-500 text-sm flex items-center gap-1 mb-4">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {location}
        </p>

        <div className="flex items-end justify-between border-t pt-4">
          <div>
            <span className="text-xs text-gray-400 block mb-0.5">Price from</span>
            <p className="text-xl font-extrabold text-gray-900">
              ${price}<span className="text-sm font-medium text-gray-500">/night</span>
            </p>
          </div>
          <button className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all hover:bg-gray-600 hover:shadow-lg hover:shadow-blue-200">
            Book Now
          </button>
        </div>
      </div>
    </Link>
  )
}

export default HotelCard
