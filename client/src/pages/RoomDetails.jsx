import React, { useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { roomsDummyData, assets, roomCommonData, facilityIcons } from '../assets/assets';

const RoomDetails = () => {
    const { id } = useParams();
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [guests, setGuests] = useState(1);
    const [isChecking, setIsChecking] = useState(false);
    const [availabilityChecked, setAvailabilityChecked] = useState(false);

    const room = useMemo(() => {
        return roomsDummyData.find(r => r._id === id) || roomsDummyData[0];
    }, [id]);

    if (!room) return <div className="py-20 text-center">Room not found</div>;

    const hotelName = room.hotel?.name || "Premium Hotel";
    const city = room.hotel?.city || "Maldives";

    const handleCheckAvailability = () => {
        if (!checkIn || !checkOut) {
            alert("Please select both check-in and check-out dates.");
            return;
        }
        setIsChecking(true);
        // Simulate an API call
        setTimeout(() => {
            setIsChecking(false);
            setAvailabilityChecked(true);
        }, 1500);
    };

    const calculateNights = () => {
        if (!checkIn || !checkOut) return 0;
        const start = new Date(checkIn);
        const end = new Date(checkOut);
        const diffTime = Math.abs(end - start);
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    };

    const nights = calculateNights();

    return (
        <div className="bg-white min-h-screen pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-4 font-bold uppercase tracking-widest">
                        <Link to="/" className="hover:text-gray-900">Home</Link>
                        <span>/</span>
                        <Link to="/rooms" className="hover:text-gray-900">Rooms</Link>
                        <span>/</span>
                        <span className="text-gray-900">{hotelName}</span>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 font-playfair tracking-tight">
                                {hotelName} - {room.roomType}
                            </h1>
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center gap-1 bg-gray-900 text-white px-2 py-0.5 rounded text-xs font-bold">
                                        <img src={assets.starIconFilled} alt="star" className="w-3 h-3 brightness-0 invert" />
                                        {room.rating || "4.8"}
                                    </div>
                                    <span className="text-sm text-gray-500 font-semibold underline underline-offset-4 decoration-gray-300">
                                        128 reviews
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600 font-semibold">
                                    <img src={assets.locationIcon} alt="location" className="w-4 h-4 opacity-70" />
                                    {city}, Maldives
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <button className="p-3 bg-gray-50 rounded-full hover:bg-gray-100 transition-all border border-gray-100 group">
                                <svg className="w-5 h-5 text-gray-600 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                </svg>
                            </button>
                            <button className="p-3 bg-gray-50 rounded-full hover:bg-gray-100 transition-all border border-gray-100 group">
                                <svg className="w-5 h-5 text-gray-600 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Image Gallery Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 rounded-[2rem] overflow-hidden relative">
                    <div className="md:col-span-2 md:row-span-2 relative aspect-[4/3] md:aspect-auto overflow-hidden group">
                        <img src={room.images[0]} alt="main" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors pointer-events-none" />
                    </div>
                    {room.images.slice(1, 5).map((img, idx) => (
                        <div key={idx} className="hidden md:block relative aspect-square overflow-hidden group">
                            <img src={img} alt={`img-${idx}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors pointer-events-none" />
                        </div>
                    ))}
                    <button className="absolute bottom-6 right-6 md:right-10 md:bottom-10 bg-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-xl hover:bg-gray-50 transition-all flex items-center gap-2 border border-gray-100">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" /></svg>
                        Show all photos
                    </button>
                </div>

                {/* Horizontal Availability Check Bar */}
                <div className="bg-white border border-gray-100 shadow-xl rounded-[3rem] p-4 md:p-6 mb-16 flex flex-col md:flex-row items-center gap-6 relative">
                    <div className="flex-grow grid grid-cols-1 sm:grid-cols-3 gap-0 border border-gray-200 rounded-3xl overflow-hidden w-full">
                        <div className="p-4 border-r border-gray-200 hover:bg-gray-50 transition-all">
                            <label className="block text-[10px] font-bold text-gray-900 uppercase tracking-wider mb-1">Check-in</label>
                            <input
                                type="date"
                                value={checkIn}
                                onChange={(e) => {
                                    setCheckIn(e.target.value);
                                    setAvailabilityChecked(false);
                                }}
                                className="w-full text-sm font-semibold text-gray-500 focus:outline-none bg-transparent cursor-pointer"
                            />
                        </div>
                        <div className="p-4 border-r border-gray-200 hover:bg-gray-50 transition-all">
                            <label className="block text-[10px] font-bold text-gray-900 uppercase tracking-wider mb-1">Check-out</label>
                            <input
                                type="date"
                                value={checkOut}
                                onChange={(e) => {
                                    setCheckOut(e.target.value);
                                    setAvailabilityChecked(false);
                                }}
                                className="w-full text-sm font-semibold text-gray-500 focus:outline-none bg-transparent cursor-pointer"
                            />
                        </div>
                        <div className="p-4 hover:bg-gray-50 transition-all">
                            <label className="block text-[10px] font-bold text-gray-900 uppercase tracking-wider mb-1">Guests</label>
                            <select
                                value={guests}
                                onChange={(e) => {
                                    setGuests(parseInt(e.target.value));
                                    setAvailabilityChecked(false);
                                }}
                                className="w-full text-sm font-semibold text-gray-500 focus:outline-none bg-transparent cursor-pointer appearance-none"
                            >
                                <option value={1}>1 guest</option>
                                <option value={2}>2 guests</option>
                                <option value={3}>3 guests</option>
                                <option value={4}>4 guests</option>
                            </select>
                        </div>
                    </div>

                    {!availabilityChecked ? (
                        <button
                            onClick={handleCheckAvailability}
                            disabled={isChecking}
                            className="w-full md:w-[250px] bg-gray-900 text-white py-5 rounded-3xl font-bold text-lg hover:shadow-2xl hover:-translate-y-1 transition-all active:scale-95 shadow-xl shadow-gray-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 whitespace-nowrap"
                        >
                            {isChecking ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Checking...
                                </>
                            ) : 'Check Availability'}
                        </button>
                    ) : (
                        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                            <div className="bg-green-50 border border-green-100 px-6 py-4 rounded-3xl flex items-center gap-3 w-full sm:w-auto">
                                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <p className="text-sm font-bold text-green-700 whitespace-nowrap">Available!</p>
                            </div>
                            <button className="w-full md:w-[200px] bg-gray-900 text-white py-5 rounded-3xl font-bold text-lg hover:shadow-2xl hover:-translate-y-1 transition-all active:scale-95 shadow-xl shadow-gray-200">
                                Reserve Now
                            </button>
                        </div>
                    )}
                </div>

                {/* Main Content Flow */}
                <div className="max-w-4xl mx-auto">
                    {/* Booking Breakdown (Conditional) */}
                    {availabilityChecked && (
                        <div className="bg-gray-50 border border-gray-100 rounded-[2.5rem] p-8 md:p-12 mb-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <h3 className="text-2xl font-bold text-gray-900 mb-8 font-playfair">Your Stay Summary</h3>
                            <div className="space-y-6 mb-10">
                                <div className="flex justify-between text-gray-600 font-semibold text-lg">
                                    <span>${room.pricePerNight} x {nights} nights</span>
                                    <span>${room.pricePerNight * nights}</span>
                                </div>
                                {nights >= 5 && (
                                    <div className="flex justify-between text-gray-600 font-semibold text-lg">
                                        <span>Weekly discount</span>
                                        <span className="text-green-600">-$250</span>
                                    </div>
                                )}
                                <div className="flex justify-between text-gray-600 font-semibold text-lg pb-6 border-b border-gray-200">
                                    <span>Service fee</span>
                                    <span>$120</span>
                                </div>
                                <div className="flex justify-between text-2xl font-black text-gray-900">
                                    <span>Total Price</span>
                                    <span>${(room.pricePerNight * nights) - (nights >= 5 ? 250 : 0) + 120}</span>
                                </div>
                            </div>
                            <p className="text-center text-sm text-gray-400 font-medium italic">
                                * Final total including local taxes will be shown at checkout
                            </p>
                        </div>
                    )}

                    {/* Description & Experience */}
                    <div className="border-b border-gray-100 pb-16 mb-16">
                        <div className="flex justify-between items-start mb-10">
                            <div>
                                <h2 className="text-3xl font-extrabold text-gray-900 mb-6 font-playfair">Experience the Best Stay</h2>
                                <p className="text-gray-600 text-xl leading-relaxed max-w-2xl">
                                    This {room.roomType.toLowerCase()} at {hotelName} offers a blend of luxury and comfort,
                                    designed for those who appreciate the finer things. Every detail has been curated to
                                    ensure your stay is as memorable as the destination itself.
                                </p>
                            </div>
                            <div className="hidden sm:flex flex-col items-end">
                                <span className="text-4xl font-black text-gray-900 font-playfair">${room.pricePerNight}</span>
                                <span className="text-gray-400 font-bold tracking-widest uppercase text-[10px]">Per Night</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                            {roomCommonData.map((item, idx) => (
                                <div key={idx} className="flex gap-6 group">
                                    <div className="w-14 h-14 bg-gray-50 rounded-[1.25rem] flex items-center justify-center flex-shrink-0 group-hover:bg-gray-900 transition-colors duration-300">
                                        <img src={item.icon} alt="feature" className="w-7 h-7 brightness-0 opacity-70 group-hover:invert group-hover:opacity-100 transition-all" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 mb-1.5 text-lg">{item.title}</h4>
                                        <p className="text-gray-500 leading-relaxed">{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Amenities Full Width */}
                    <div className="border-b border-gray-100 pb-16 mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-10 font-playfair">What this place offers</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-8 gap-x-12">
                            {room.amenities.map(amenity => (
                                <div key={amenity} className="flex items-center gap-5 group">
                                    <div className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center group-hover:bg-gray-50 transition-colors">
                                        <img src={facilityIcons[amenity] || assets.guestsIcon} alt={amenity} className="w-5 h-5 opacity-60 brightness-0" />
                                    </div>
                                    <span className="text-gray-700 font-bold tracking-tight">{amenity}</span>
                                </div>
                            ))}
                        </div>
                        <button className="mt-12 w-full sm:w-auto px-10 py-4 border-2 border-gray-900 rounded-2xl font-bold text-sm hover:bg-gray-900 hover:text-white transition-all active:scale-95">
                            Show all 40 amenities
                        </button>
                    </div>

                    {/* Location Full Context */}
                    <div>
                        <div className="flex justify-between items-end mb-8">
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900 mb-2 font-playfair">Location</h2>
                                <p className="text-gray-500 font-bold tracking-tight">{city}, Maldives</p>
                            </div>
                        </div>
                        <div className="h-[500px] w-full bg-gray-100 rounded-[3rem] overflow-hidden relative border border-gray-100 group shadow-2xl">
                            <iframe
                                className="w-full h-full grayscale-[20%] contrast-[1.1] opacity-90 group-hover:opacity-100 transition-opacity"
                                src={`https://maps.google.com/maps?q=${city}+Maldives&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                            ></iframe>
                            <div className="absolute inset-0 bg-black/5 pointer-events-none" />
                            <div className="absolute top-8 left-8 bg-white/95 backdrop-blur-md px-8 py-4 rounded-[2rem] shadow-2xl border border-white/50">
                                <h4 className="font-bold text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-2">Private Retreat</h4>
                                <p className="text-gray-900 font-black text-xl font-playfair">{hotelName}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomDetails;
