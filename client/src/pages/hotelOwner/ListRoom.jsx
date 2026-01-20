import React from 'react';
import { roomsDummyData, assets } from '../../assets/assets';

const ListRoom = () => {
  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900 font-playfair mb-2">My Rooms</h1>
          <p className="text-gray-400 font-bold text-sm tracking-widest uppercase">Manage your listings</p>
        </div>
        <button className="bg-gray-900 text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-gray-700 transition-all active:scale-95 shadow-xl shadow-gray-200">
          Add New Room
        </button>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {roomsDummyData.map((room) => (
          <div key={room._id} className="bg-white rounded-[2.5rem] border border-gray-100 p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-500 group">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="w-full lg:w-64 h-48 rounded-[2rem] overflow-hidden flex-shrink-0">
                <img src={room.images[0]} alt={room.roomType} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="flex-grow">
                <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
                  <div>
                    <h3 className="text-2xl font-black text-gray-900 mb-1 font-playfair">{room.roomType}</h3>
                    <p className="text-gray-500 text-sm font-bold">{room.hotel.name}</p>
                  </div>
                  <div className="flex gap-3">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${room.isAvailable ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                      {room.isAvailable ? 'Available' : 'Booked'}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 mb-6">
                  {room.amenities.map(amenity => (
                    <span key={amenity} className="px-3 py-1 bg-gray-50 text-[10px] font-bold text-gray-500 rounded-lg">{amenity}</span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                  <p className="text-xl font-black text-gray-900">${room.pricePerNight}<span className="text-sm text-gray-400 font-bold"> / night</span></p>
                  <div className="flex gap-4">
                    <button className="p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                      <img src={assets.addIcon} alt="edit" className="w-4 h-4 opacity-40 rotate-45" />
                    </button>
                    <button className="px-6 py-2 border-2 border-gray-900 rounded-xl font-bold text-xs hover:bg-gray-900 hover:text-white transition-all">Edit Details</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListRoom;
