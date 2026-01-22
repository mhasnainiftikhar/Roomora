import React, { useState, useEffect, useContext } from 'react';
import { assets } from '../../assets/assets';
import { AppContext } from '../../context/appContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ListRoom = () => {
  const { toast, getToken, currency } = useContext(AppContext);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOwnerRooms();
  }, []);

  const fetchOwnerRooms = async () => {
    try {
      setLoading(true);
      const token = await getToken();
      const { data } = await axios.get('/api/room/owner-rooms', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (data.success) {
        setRooms(data.rooms);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch rooms");
    } finally {
      setLoading(false);
    }
  };

  const toggleAvailability = async (roomId) => {
    try {
      const token = await getToken();
      const { data } = await axios.post(`/api/room/toggle-availability/${roomId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (data.success) {
        toast.success("Availability updated");
        fetchOwnerRooms(); // Refresh list
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update availability");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500 font-bold">Loading your rooms...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-10">
        <div className="space-y-2">
          <h1 className="text-5xl font-extrabold text-gray-900 font-playfair tracking-tight">My Rooms</h1>
          <div className="flex items-center gap-3">
            <span className="w-12 h-1 bg-orange-500 rounded-full" />
            <p className="text-gray-400 font-black text-[11px] tracking-[0.3em] uppercase">Manage your listings ({rooms.length})</p>
          </div>
        </div>
        <button
          onClick={() => navigate('/owner/add-room')}
          className="bg-gray-900 text-white px-10 py-5 rounded-full font-black text-xs uppercase tracking-[0.3em] hover:bg-black hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] hover:-translate-y-1 transition-all active:scale-95 shadow-xl flex items-center gap-4 group"
        >
          Add New Room
          <div className="w-8 h-8 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-orange-500 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
          </div>
        </button>
      </div>

      {rooms.length === 0 ? (
        <div className="text-center py-32 bg-white rounded-[4rem] border border-dashed border-gray-200 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.02)]">
          <div className="w-24 h-24 bg-gray-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 group hover:bg-gray-900 transition-colors duration-500">
            <svg className="w-10 h-10 text-gray-300 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h3 className="text-2xl font-black text-gray-900 mb-3 font-playfair uppercase tracking-tight">No rooms yet</h3>
          <p className="text-gray-400 font-bold text-sm max-w-xs mx-auto mb-10 leading-relaxed uppercase tracking-widest">Start building your collection by adding your first luxury room.</p>
          <button
            onClick={() => navigate('/owner/add-room')}
            className="bg-gray-100 text-gray-900 px-10 py-5 rounded-full font-black text-xs uppercase tracking-[0.2em] hover:bg-gray-900 hover:text-white transition-all shadow-sm"
          >
            Create Your First Listing
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-10">
          {rooms.map((room) => (
            <div key={room._id} className="bg-white rounded-[3.5rem] border border-gray-100 p-8 md:p-10 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.03)] hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] transition-all duration-700 group hover:-translate-y-2">
              <div className="flex flex-col lg:flex-row gap-12">
                <div className="w-full lg:w-80 h-64 rounded-[2.5rem] overflow-hidden flex-shrink-0 shadow-2xl shadow-gray-200">
                  <img src={room.images[0]} alt={room.roomType} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                </div>
                <div className="flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-500 bg-orange-50 px-3 py-1 rounded-lg">Featured Suite</span>
                          <h3 className="text-3xl font-black text-gray-900 font-playfair leading-tight uppercase tracking-tight">{room.roomType}</h3>
                        </div>
                        <p className="text-gray-400 text-xs font-black uppercase tracking-[0.2em] flex items-center gap-2">
                          <svg className="w-3.5 h-3.5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-11h.01M9 17h.01M9 13h.01M13 17h.01M13 13h.01M13 9h.01M13 5h.01M17 11h.01M17 7h.01" /></svg>
                          {room.hotel?.name || 'Your Hotel'}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Visibility</p>
                        <button
                          onClick={() => toggleAvailability(room._id)}
                          className={`relative w-14 h-7 rounded-full transition-all duration-500 focus:outline-none shadow-inner ${room.isAvailable ? 'bg-gray-900 shadow-gray-700' : 'bg-gray-100'}`}
                        >
                          <div className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-all duration-500 shadow-lg transform ${room.isAvailable ? 'translate-x-7 scale-110' : 'translate-x-0'}`} />
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3 mb-10">
                      {room.amenities.slice(0, 4).map(amenity => (
                        <span key={amenity} className="px-4 py-2 bg-gray-50 border border-gray-100 text-[10px] font-black text-gray-500 rounded-2xl uppercase tracking-widest group-hover:bg-white group-hover:border-gray-200 transition-colors">{amenity}</span>
                      ))}
                      {room.amenities.length > 4 && (
                        <span className="px-4 py-2 bg-gray-100 text-[10px] font-black text-gray-400 rounded-2xl uppercase tracking-widest">+{room.amenities.length - 4} More</span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-10 border-t border-gray-50 gap-6">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-1">Nightly Investment</span>
                      <p className="text-3xl font-black text-gray-900 font-playfair">{currency}{room.pricePerNight}<span className="text-sm text-gray-400 font-bold lowercase tracking-normal"> / night</span></p>
                    </div>
                    <div className="flex gap-4 w-full sm:w-auto">
                      <button
                        onClick={() => navigate(`/room/${room._id}`)}
                        className="flex-1 sm:flex-none px-8 py-4 border-2 border-gray-100 rounded-2xl font-black text-[10px] uppercase tracking-[0.25em] hover:bg-gray-50 hover:border-gray-900 hover:text-gray-900 transition-all text-gray-400"
                      >
                        Preview
                      </button>
                      <button className="flex-1 sm:flex-none px-10 py-4 bg-gray-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.25em] hover:bg-orange-500 hover:shadow-[0_15px_30px_-10px_rgba(249,115,22,0.4)] transition-all">
                        Edit Collection
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListRoom;
