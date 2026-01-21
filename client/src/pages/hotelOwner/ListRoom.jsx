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
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900 font-playfair mb-2">My Rooms</h1>
          <p className="text-gray-400 font-bold text-sm tracking-widest uppercase">Manage your listings ({rooms.length})</p>
        </div>
        <button
          onClick={() => navigate('/owner/add-room')}
          className="bg-gray-900 text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-gray-700 transition-all active:scale-95 shadow-xl shadow-gray-200"
        >
          Add New Room
        </button>
      </div>

      {rooms.length === 0 ? (
        <div className="text-center py-24 bg-white rounded-[3rem] border border-dashed border-gray-200">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No rooms yet</h3>
          <p className="text-gray-500 max-w-sm mx-auto mb-8">Start building your collection by adding your first luxury room.</p>
          <button
            onClick={() => navigate('/owner/add-room')}
            className="bg-gray-900 text-white px-8 py-3 rounded-2xl font-bold hover:bg-gray-700 transition-all"
          >
            Add Your First Room
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8">
          {rooms.map((room) => (
            <div key={room._id} className="bg-white rounded-[2.5rem] border border-gray-100 p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-500 group">
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="w-full lg:w-64 h-48 rounded-[2rem] overflow-hidden flex-shrink-0">
                  <img src={room.images[0]} alt={room.roomType} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="flex-grow">
                  <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
                    <div>
                      <h3 className="text-2xl font-black text-gray-900 mb-1 font-playfair">{room.roomType}</h3>
                      <p className="text-gray-500 text-sm font-bold">{room.hotel?.name || 'Your Hotel'}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col items-end">
                        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1.5">Visibility</p>
                        <button
                          onClick={() => toggleAvailability(room._id)}
                          className={`relative w-12 h-6 rounded-full transition-all duration-300 focus:outline-none ${room.isAvailable ? 'bg-green-500' : 'bg-gray-200'}`}
                        >
                          <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-all duration-300 shadow-sm ${room.isAvailable ? 'translate-x-6' : 'translate-x-0'}`} />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 mb-6">
                    {room.amenities.slice(0, 5).map(amenity => (
                      <span key={amenity} className="px-3 py-1 bg-gray-50 text-[10px] font-bold text-gray-500 rounded-lg">{amenity}</span>
                    ))}
                    {room.amenities.length > 5 && (
                      <span className="px-3 py-1 bg-gray-100 text-[10px] font-bold text-gray-600 rounded-lg">+{room.amenities.length - 5} more</span>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                    <p className="text-xl font-black text-gray-900">{currency}{room.pricePerNight}<span className="text-sm text-gray-400 font-bold"> / night</span></p>
                    <div className="flex gap-4">
                      <button
                        onClick={() => navigate(`/room/${room._id}`)}
                        className="px-6 py-2 border-2 border-gray-200 rounded-xl font-bold text-xs hover:border-gray-900 hover:bg-gray-50 transition-all"
                      >
                        View Details
                      </button>
                      <button className="px-6 py-2 border-2 border-gray-900 rounded-xl font-bold text-xs hover:bg-gray-900 hover:text-white transition-all">
                        Edit Details
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
