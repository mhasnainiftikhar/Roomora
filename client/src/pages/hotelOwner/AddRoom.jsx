import React, { useState } from 'react';
import { assets } from '../../assets/assets';

const AddRoom = () => {
  const [formData, setFormData] = useState({
    roomType: '',
    price: '',
    amenities: [],
    description: '',
  });

  return (
    <div className="max-w-4xl space-y-12">
      <div>
        <h1 className="text-3xl font-black text-gray-900 font-playfair mb-2">Add New Room</h1>
        <p className="text-gray-400 font-bold text-sm tracking-widest uppercase">Start your luxury listing</p>
      </div>

      <form className="space-y-10">
        {/* Image Upload Section */}
        <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm space-y-6">
          <p className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-500">Room Gallery</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="aspect-square bg-gray-50 border-2 border-dashed border-gray-200 rounded-[2rem] flex flex-col items-center justify-center gap-3 hover:bg-gray-100 hover:border-gray-300 transition-all cursor-pointer group">
              <img src={assets.uploadArea} alt="upload" className="w-8 h-8 opacity-20 group-hover:opacity-50 transition-opacity" />
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Add Photo</span>
            </div>
            <div className="aspect-square bg-gray-100 rounded-[2rem]" />
            <div className="aspect-square bg-gray-100 rounded-[2rem]" />
            <div className="aspect-square bg-gray-100 rounded-[2rem]" />
          </div>
        </div>

        {/* Details Section */}
        <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm space-y-8">
          <p className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-500">Room Details</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-3">
              <label className="text-[11px] font-black uppercase tracking-[0.1em] text-gray-400 ml-2">Room Title</label>
              <input
                type="text"
                placeholder="e.g., Ocean View Executive Suite"
                className="w-full px-8 py-5 bg-gray-50 border border-transparent rounded-[2rem] focus:bg-white focus:border-gray-900 transition-all outline-none font-bold text-gray-900"
              />
            </div>
            <div className="space-y-3">
              <label className="text-[11px] font-black uppercase tracking-[0.1em] text-gray-400 ml-2">Price Per Night ($)</label>
              <input
                type="number"
                placeholder="500"
                className="w-full px-8 py-5 bg-gray-50 border border-transparent rounded-[2rem] focus:bg-white focus:border-gray-900 transition-all outline-none font-bold text-gray-900"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[11px] font-black uppercase tracking-[0.1em] text-gray-400 ml-2">Description</label>
            <textarea
              rows="4"
              placeholder="Describe the unique luxury experience..."
              className="w-full px-8 py-6 bg-gray-50 border border-transparent rounded-[2rem] focus:bg-white focus:border-gray-900 transition-all outline-none font-bold text-gray-900 resize-none"
            />
          </div>

          <div className="flex justify-end pt-6">
            <button className="bg-gray-900 text-white px-12 py-5 rounded-[2rem] font-black text-sm uppercase tracking-widest hover:bg-gray-700 hover:shadow-2xl hover:-translate-y-1 transition-all active:scale-95 shadow-xl shadow-gray-200">
              Create Listing
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddRoom;
