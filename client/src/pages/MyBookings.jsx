import React, { useState, useEffect, useContext } from 'react';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/appContext';
import axios from 'axios';

const MyBookings = () => {
    const { getToken, currency, toast } = useContext(AppContext);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUserBookings = async () => {
        try {
            setLoading(true);
            const token = await getToken();
            const { data } = await axios.get('/api/booking/user', {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (data.success) {
                setBookings(data.bookings);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to fetch bookings");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserBookings();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center pt-24">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-500 font-bold">Loading your luxury stays...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-20">
            <div className="mb-12">
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 font-playfair">
                    My Bookings
                </h1>
                <p className="text-gray-600 max-w-2xl font-medium">
                    Manage and view your upcoming and past luxury stays. All your reservation details in one place.
                </p>
            </div>

            {bookings.length > 0 ? (
                <div className="grid grid-cols-1 gap-8">
                    {bookings.map((booking) => (
                        <div
                            key={booking._id}
                            className="bg-white border border-gray-100 rounded-[2.5rem] p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden group"
                        >
                            <div className="flex flex-col lg:flex-row gap-8">
                                {/* Property Image */}
                                <div className="w-full lg:w-72 h-48 rounded-[2rem] overflow-hidden flex-shrink-0 relative">
                                    <img
                                        src={booking.room?.images?.[0] || assets.regImage}
                                        alt={booking.hotel?.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-gray-900">
                                        {booking.room?.roomType}
                                    </div>
                                </div>

                                {/* Booking Details */}
                                <div className="flex-grow">
                                    <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
                                        <div>
                                            <h3 className="text-2xl font-black text-gray-900 mb-1 font-playfair group-hover:text-gray-600 transition-colors">
                                                {booking.hotel?.name}
                                            </h3>
                                            <p className="text-gray-500 text-sm font-bold flex items-center gap-2">
                                                <img src={assets.locationIcon} alt="loc" className="w-4 h-4 opacity-40" />
                                                {booking.hotel?.city}, Maldives
                                            </p>
                                        </div>
                                        <div className="flex flex-wrap gap-3">
                                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${booking.status === 'completed' ? 'bg-green-50 text-green-600' :
                                                booking.status === 'pending' ? 'bg-orange-50 text-orange-600' :
                                                    'bg-blue-50 text-blue-600'
                                                }`}>
                                                {booking.status}
                                            </span>
                                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${booking.isPaid ? 'bg-green-900 text-white' : 'bg-gray-100 text-gray-400'
                                                }`}>
                                                {booking.isPaid ? 'Paid' : 'Unpaid'}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-6 border-y border-gray-50">
                                        <div>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Check-in</p>
                                            <p className="text-sm font-black text-gray-900">
                                                {new Date(booking.checkInDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Check-out</p>
                                            <p className="text-sm font-black text-gray-900">
                                                {new Date(booking.checkOutDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Guests</p>
                                            <p className="text-sm font-black text-gray-900">{booking.guests} {booking.guests > 1 ? 'Adults' : 'Adult'}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Payment</p>
                                            <p className="text-sm font-black text-gray-900">{booking.paymentMethod}</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-6">
                                        <div className="text-center sm:text-left">
                                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Total Amount</span>
                                            <p className="text-2xl font-black text-gray-900">{currency}{booking.totalPrice}</p>
                                        </div>
                                        <div className="flex gap-4 w-full sm:w-auto">
                                            {!booking.isPaid && (
                                                <button className="flex-1 sm:flex-none px-6 py-3 bg-green-600 text-white rounded-2xl font-bold text-sm hover:bg-green-700 hover:shadow-lg transition-all active:scale-95 shadow-lg shadow-green-100">
                                                    Pay Now
                                                </button>
                                            )}
                                            <Link
                                                to={`/room/${booking.room?._id}`}
                                                className="flex-1 sm:flex-none text-center px-6 py-3 border-2 border-gray-900 rounded-2xl font-bold text-sm hover:bg-gray-900 hover:text-white transition-all active:scale-95"
                                            >
                                                View Listing
                                            </Link>
                                            <button className="flex-1 sm:flex-none px-6 py-3 bg-gray-900 text-white rounded-2xl font-bold text-sm hover:bg-gray-700 hover:shadow-lg transition-all active:scale-95">
                                                Manage
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-24 bg-white rounded-[3rem] border border-dashed border-gray-200">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-10 h-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No bookings found</h3>
                    <p className="text-gray-500 max-w-sm mx-auto">You haven't made any reservations yet. Start exploring our premium destinations.</p>
                    <Link
                        to="/rooms"
                        className="inline-block mt-8 text-white bg-gray-900 px-8 py-3 rounded-2xl font-bold hover:bg-gray-700 transition-all shadow-xl"
                    >
                        Explore Rooms
                    </Link>
                </div>
            )}
        </div>
    );
};

export default MyBookings;
