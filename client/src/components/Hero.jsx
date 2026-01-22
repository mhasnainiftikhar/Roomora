import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import heroImage from '../assets/heroImage1.jpg';
import { cities } from '../assets/assets';

const Hero = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    destination: '',
    checkIn: '',
    checkOut: '',
    guests: 1
  });

  const handleSearch = (e) => {
    e.preventDefault();
    const queryParams = new URLSearchParams({
      location: formData.destination,
      checkIn: formData.checkIn,
      checkOut: formData.checkOut,
      guests: formData.guests
    }).toString();
    navigate(`/rooms?${queryParams}`);
  };
  return (
    <div
      className="relative flex flex-col items-start justify-center px-6 md:px-16 lg:px-24 xl:px-32 text-white min-h-screen bg-cover bg-center bg-no-repeat pt-20 md:pt-0"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      {/* Overlay for better text visibility */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content Section */}
      <div className="relative z-10 w-full mb-12">
        <p className="bg-[#4989FF]/50 px-4 py-1 rounded-full w-fit text-sm md:text-base">
          The Ultimate Hotel Experience
        </p>

        <h1 className="font-playfair text-4xl md:text-5xl lg:text-7xl font-bold mb-4 mt-6">
          Welcome to Roomora
        </h1>

        <p className="text-lg md:text-xl lg:text-2xl max-w-xl opacity-90">
          Discover the best rooms and experiences for your perfect stay.
        </p>
      </div>

      {/* Form Section - Positioned relative to ensure it stays above overlay */}
      <form
        onSubmit={handleSearch}
        className="relative z-10 bg-white text-gray-500 rounded-xl p-4 md:p-6 flex flex-col md:flex-row items-stretch md:items-end gap-4 w-full lg:w-fit shadow-2xl"
      >

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1.5">
            <svg className="w-4 h-4 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <label htmlFor="destinationInput" className="text-xs font-semibold uppercase tracking-wider">Destination</label>
          </div>
          <input
            list="destinations"
            id="destinationInput"
            type="text"
            className="w-full rounded border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#4989FF]"
            placeholder="Where are you going?"
            required
            value={formData.destination}
            onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
          />
          <datalist id="destinations">
            {cities.map((city, index) => (
              <option key={index} value={city} />
            ))}
          </datalist>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <svg className="w-4 h-4 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <label htmlFor="checkIn" className="text-xs font-semibold uppercase tracking-wider">Check in</label>
          </div>
          <input
            id="checkIn"
            type="date"
            className="w-full rounded border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#4989FF]"
            value={formData.checkIn}
            onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
          />
        </div>

        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <svg className="w-4 h-4 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <label htmlFor="checkOut" className="text-xs font-semibold uppercase tracking-wider">Check out</label>
          </div>
          <input
            id="checkOut"
            type="date"
            className="w-full rounded border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#4989FF]"
            value={formData.checkOut}
            onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
          />
        </div>

        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <label htmlFor="guests" className="text-xs font-semibold uppercase tracking-wider">Guests</label>
          </div>
          <input
            min={1}
            max={10}
            id="guests"
            type="number"
            className="w-full md:w-20 rounded border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#4989FF]"
            placeholder="1"
            value={formData.guests}
            onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
          />
        </div>

        <button type="submit" className="flex items-center justify-center gap-2 rounded-lg bg-black hover:bg-gray-800 transition-colors py-2.5 px-8 text-white font-medium cursor-pointer h-[42px]">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span>Search</span>
        </button>

      </form>
    </div>
  );
};

export default Hero;