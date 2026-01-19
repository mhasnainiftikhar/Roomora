import React from 'react'
import HotelCard from '../components/HotelCard'
import { roomsDummyData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Featured = () => {
  const navigate = useNavigate();
  // Use official dummy data from assets
  const featuredRooms = roomsDummyData.slice(0, 3);

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 font-playfair">
              Featured Destinations
            </h2>
            <p className="text-gray-600 max-w-2xl">
              Explore our handpicked selection of premium hotels and resorts around the world,
              curated for excellence and unforgettable experiences.
            </p>
          </div>
          <button
            onClick={() => navigate('/rooms')}
            className="text-black font-bold transition-all flex items-center gap-2 group whitespace-nowrap hover:text-gray-600"
          >
            View All Properties
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredRooms.map((room, index) => (
            <HotelCard key={room._id} room={room} index={index} />
          ))}
        </div>

        <div className='flex items-center justify-center'>
          <button
            onClick={() => navigate('/rooms')}
            className='relative inline-flex items-center justify-center px-8 py-4 mt-12 font-bold text-white transition-all duration-200 bg-gray-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-gray-700 shadow-xl hover:shadow-2xl hover:-translate-y-1 active:scale-95 group'
          >
            View All Destinations
            <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>

    </>
  )
}

export default Featured
