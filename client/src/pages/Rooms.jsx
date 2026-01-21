import React, { useState, useMemo, useContext } from 'react';
import { assets } from '../assets/assets';
import HotelCardList from '../components/HotelCardList';
import { AppContext } from '../context/appContext';

const Rooms = () => {
    const { rooms } = useContext(AppContext);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedType, setSelectedType] = useState('All');
    const [maxPrice, setMaxPrice] = useState(1000);
    const [selectedAmenities, setSelectedAmenities] = useState([]);

    const roomTypes = ['All', 'Single Bed', 'Double Bed', 'Suite', 'Deluxe'];
    const allAmenities = ['Free WiFi', 'Free Breakfast', 'Room Service', 'Mountain View', 'Pool Access'];

    const filteredRooms = useMemo(() => {
        return rooms.filter(room => {
            const hotelName = room.hotel?.name || '';
            const city = room.hotel?.city || '';
            const matchesSearch = hotelName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                city.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesType = selectedType === 'All' || room.roomType === selectedType;
            const matchesPrice = room.pricePerNight <= maxPrice;
            const matchesAmenities = selectedAmenities.every(amenity => room.amenities.includes(amenity));

            return matchesSearch && matchesType && matchesPrice && matchesAmenities;
        });
    }, [rooms, searchQuery, selectedType, maxPrice, selectedAmenities]);

    const toggleAmenity = (amenity) => {
        setSelectedAmenities(prev =>
            prev.includes(amenity) ? prev.filter(a => a !== amenity) : [...prev, amenity]
        );
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-20">
            <div className="flex flex-col lg:flex-row gap-10">

                {/* Results Area (On Left Now) */}
                <main className="flex-grow lg:order-1">
                    <div className="flex justify-between items-end mb-8">
                        <div>
                            <h1 className="text-3xl font-extrabold text-gray-900 mb-2 font-playfair">Available Stays</h1>
                            <p className="text-gray-500 text-sm font-medium">Showing {filteredRooms.length} properties</p>
                        </div>
                    </div>

                    {filteredRooms.length > 0 ? (
                        <div className="flex flex-col gap-6">
                            {filteredRooms.map((room, index) => (
                                <HotelCardList key={room._id} room={room} index={index} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-24 bg-white rounded-[3rem] border border-dashed border-gray-200">
                            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-10 h-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">No results found</h3>
                            <p className="text-gray-500 max-w-sm mx-auto">Try adjusting your filters or search query to find what you're looking for.</p>
                            <button
                                onClick={() => {
                                    setSearchQuery('');
                                    setSelectedType('All');
                                    setMaxPrice(1000);
                                    setSelectedAmenities([]);
                                }}
                                className="mt-8 text-gray-900 font-bold border-b-2 border-gray-900 hover:text-gray-600 hover:border-gray-600 transition-all"
                            >
                                Clear all filters
                            </button>
                        </div>
                    )}
                </main>

                {/* Filters Sidebar (On Right Now) */}
                <aside className="w-full lg:w-72 flex-shrink-0 lg:order-2">
                    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 sticky top-28">
                        <h2 className="text-xl font-bold mb-8 flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                            </svg>
                            Filters
                        </h2>

                        {/* Search */}
                        <div className="mb-8">
                            <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">Search</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Hotel or City..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all text-sm"
                                />
                                <img src={assets.searchIcon} alt="search" className="absolute left-3 top-3.5 h-4 opacity-40 brightness-0" />
                            </div>
                        </div>

                        {/* Room Type */}
                        <div className="mb-8">
                            <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">Property Type</label>
                            <div className="flex flex-wrap gap-2">
                                {roomTypes.map(type => (
                                    <button
                                        key={type}
                                        onClick={() => setSelectedType(type)}
                                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${selectedType === type
                                            ? 'bg-gray-900 text-white shadow-lg'
                                            : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                                            }`}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Price Range */}
                        <div className="mb-8">
                            <div className="flex justify-between items-center mb-3">
                                <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider">Max Price</label>
                                <span className="text-sm font-bold text-gray-900">${maxPrice}</span>
                            </div>
                            <input
                                type="range"
                                min="100"
                                max="1000"
                                step="50"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-900"
                            />
                        </div>

                        {/* Amenities */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">Amenities</label>
                            <div className="space-y-3 font-semibold">
                                {allAmenities.map(amenity => (
                                    <label key={amenity} className="flex items-center gap-3 cursor-pointer group">
                                        <div className="relative flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={selectedAmenities.includes(amenity)}
                                                onChange={() => toggleAmenity(amenity)}
                                                className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-gray-200 transition-all checked:bg-gray-900 checked:border-gray-900"
                                            />
                                            <svg className="absolute left-1 h-3 w-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                                                <path d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">{amenity}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default Rooms;
