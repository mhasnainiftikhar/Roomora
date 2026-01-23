import React, { useContext } from 'react'
import HotelCard from '../components/HotelCard'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/appContext'

const Featured = () => {
  const navigate = useNavigate();
  const { rooms } = useContext(AppContext);

  // Show first 4 rooms as featured
  const featuredRooms = rooms.slice(0, 4);

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
            className="text-black font-bold transition-all flex items-center gap-2 group whitespace-nowrap hover:text-gray-600 cursor-pointer"
          >
            View All Properties
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>

        {featuredRooms.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredRooms.map((room, index) => (
              <HotelCard key={room._id} room={room} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-[3rem] border border-dashed border-gray-200">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No rooms available yet</h3>
            <p className="text-gray-500 max-w-sm mx-auto">Check back soon for our featured luxury destinations.</p>
          </div>
        )}

        {featuredRooms.length > 0 && (
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
        )}
      </div>

    </>
  )
}

export default Featured
