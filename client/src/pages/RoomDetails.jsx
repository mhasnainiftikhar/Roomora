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
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-16 rounded-[2rem] overflow-hidden">
                    <div className="md:col-span-2 md:row-span-2 relative aspect-[4/3] md:aspect-auto overflow-hidden group">
                        <img src={room.images[0]} alt="main" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors pointer-events-none" />
                    </div>
                    {room.images.slice(1, 5).map((img, idx) => (
                        <div key={idx} className="hidden md:block relative aspect-square overflow-hidden group">
                            <img src={img} alt={`img - ${idx} `} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors pointer-events-none" />
                        </div>
                    ))}
                    <button className="absolute bottom-6 right-6 md:right-10 md:bottom-10 bg-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-xl hover:bg-gray-50 transition-all flex items-center gap-2 border border-gray-100">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" /></svg>
                        Show all photos
                    </button>
                </div>

                <div className="flex flex-col lg:flex-row gap-16">
                    {/* Main Content */}
                    <div className="flex-grow">
                        <div className="border-b border-gray-100 pb-12 mb-12">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Experience the Best Stay</h2>
                            <p className="text-gray-600 text-lg leading-relaxed mb-10">
                                This {room.roomType.toLowerCase()} at {hotelName} offers a blend of luxury and comfort,
                                designed for those who appreciate the finer things. Every detail has been curated to
                                ensure your stay is as memorable as the destination itself.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                {roomCommonData.map((item, idx) => (
                                    <div key={idx} className="flex gap-4">
                                        <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                                            <img src={item.icon} alt="feature" className="w-6 h-6 brightness-0 opacity-70" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                                            <p className="text-sm text-gray-500">{item.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Amenities */}
                        <div className="border-b border-gray-100 pb-12 mb-12">
                            <h2 className="text-2xl font-bold text-gray-900 mb-8">What this place offers</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12">
                                {room.amenities.map(amenity => (
                                    <div key={amenity} className="flex items-center gap-4">
                                        <img src={facilityIcons[amenity] || assets.guestsIcon} alt={amenity} className="w-6 h-6 opacity-60 brightness-0" />
                                        <span className="text-gray-700 font-medium">{amenity}</span>
                                    </div>
                                ))}
                            </div>
                            <button className="mt-10 px-8 py-3 border border-gray-900 rounded-2xl font-bold text-sm hover:bg-gray-900 hover:text-white transition-all">
                                Show all 40 amenities
                            </button>
                        </div>

                        {/* Map Section */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Location</h2>
                            <p className="text-gray-500 mb-6 font-semibold">{city}, Maldives</p>
                            <div className="h-[450px] w-full bg-gray-100 rounded-[2.5rem] overflow-hidden relative border border-gray-100 group shadow-inner">
                                {/* Placeholder for actual map */}
                                <iframe
                                    className="w-full h-full grayscale-[20%] contrast-[1.1] opacity-90 group-hover:opacity-100 transition-opacity"
                                    src={`https://maps.google.com/maps?q=${city}+Maldives&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                ></iframe>
                                {/* Overlay to handle clicks or provide information */}
                                <div className="absolute inset-0 bg-black/5 pointer-events-none" />
                                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-6 py-3 rounded-2xl shadow-xl border border-white/50">
                                    <h4 className="font-bold text-xs uppercase tracking-widest text-gray-400 mb-1">Stay Location</h4>
                                    <p className="text-gray-900 font-extrabold">{hotelName}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar / Booking Form */}
                    <aside className="w-full lg:w-[400px] flex-shrink-0" >
                        <div className="bg-white border border-gray-100 shadow-2xl rounded-[2.5rem] p-8 md:p-10 sticky top-28">
                            <div className="flex justify-between items-end mb-8">
                                <div>
                                    <span className="text-3xl font-extrabold text-gray-900 font-playfair">${room.pricePerNight}</span>
                                    <span className="text-gray-500 font-bold ml-1">/ night</span>
                                </div>
                                <div className="flex items-center gap-1.5 font-bold text-sm">
                                    <img src={assets.starIconFilled} alt="star" className="w-4 h-4 brightness-0 invert" />
                                    <span>{room.rating || "4.8"}</span>
                                    <span className="text-gray-400 font-medium">· 128 reviews</span>
                                </div>
                            </div>

                            <div className="border border-gray-200 rounded-2xl overflow-hidden mb-8">
                                <div className="grid grid-cols-2">
                                    <div className="p-4 border-r border-gray-200">
                                        <label className="block text-[10px] font-bold text-gray-900 uppercase tracking-wider mb-1">Check-in</label>
                                        <input
                                            type="date"
                                            value={checkIn}
                                            onChange={(e) => {
                                                setCheckIn(e.target.value);
                                                setAvailabilityChecked(false);
                                            }}
                                            className="w-full text-sm font-semibold text-gray-500 focus:outline-none bg-transparent"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <label className="block text-[10px] font-bold text-gray-900 uppercase tracking-wider mb-1">Check-out</label>
                                        <input
                                            type="date"
                                            value={checkOut}
                                            onChange={(e) => {
                                                setCheckOut(e.target.value);
                                                setAvailabilityChecked(false);
                                            }}
                                            className="w-full text-sm font-semibold text-gray-500 focus:outline-none bg-transparent"
                                        />
                                    </div>
                                </div>
                                <div className="p-4 border-t border-gray-200">
                                    <label className="block text-[10px] font-bold text-gray-900 uppercase tracking-wider mb-1">Guests</label>
                                    <select
                                        value={guests}
                                        onChange={(e) => {
                                            setGuests(parseInt(e.target.value));
                                            setAvailabilityChecked(false);
                                        }}
                                        className="w-full text-sm font-semibold text-gray-500 focus:outline-none bg-transparent cursor-pointer"
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
                                    className="w-full bg-gray-900 text-white py-5 rounded-2xl font-bold text-lg hover:shadow-2xl hover:-translate-y-1 transition-all active:scale-95 shadow-xl shadow-gray-200 disabled:opacity-70 disabled:cursor-not-allowed group flex items-center justify-center gap-3"
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
                                <>
                                    <div className="bg-green-50 border border-green-100 p-4 rounded-2xl mb-8 flex items-center gap-3">
                                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                                            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <p className="text-sm font-bold text-green-700">Room is available for these dates!</p>
                                    </div>

                                    <button className="w-full bg-gray-900 text-white py-5 rounded-2xl font-bold text-lg hover:shadow-2xl hover:-translate-y-1 transition-all active:scale-95 shadow-xl shadow-gray-200 mb-6 font-primary">
                                        Reserve Now
                                    </button>

                                    <div className="space-y-4 mb-8">
                                        <div className="flex justify-between text-gray-600 font-semibold underline underline-offset-4 decoration-gray-200 decoration-2">
                                            <span>${room.pricePerNight} x {nights} nights</span>
                                            <span>${room.pricePerNight * nights}</span>
                                        </div>
                                        {nights >= 5 && (
                                            <div className="flex justify-between text-gray-600 font-semibold underline underline-offset-4 decoration-gray-200 decoration-2">
                                                <span>Weekly discount</span>
                                                <span className="text-green-600">-$250</span>
                                            </div>
                                        )}
                                        <div className="flex justify-between text-gray-600 font-semibold underline underline-offset-4 decoration-gray-200 decoration-2">
                                            <span>Service fee</span>
                                            <span>$120</span>
                                        </div>
                                    </div>

                                    <div className="pt-6 border-t border-gray-100 flex justify-between text-xl font-extrabold text-gray-900">
                                        <span>Total</span>
                                        <span>${(room.pricePerNight * nights) - (nights >= 5 ? 250 : 0) + 120}</span>
                                    </div>
                                </>
                            )}

                            <p className="mt-8 text-center text-sm text-gray-500 font-medium italic">
                                You won't be charged yet
                            </p>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default RoomDetails;
