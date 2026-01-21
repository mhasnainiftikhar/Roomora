import React, { useState, useContext } from 'react';
import { assets } from '../assets/assets';
import { AppContext } from '../context/appContext';

const HotelReg = ({ isOpen, onClose }) => {
  const { registerHotel } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    address: '',
    contact: '',
  });

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const success = await registerHotel(formData);
    setLoading(false);
    if (success) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md px-4 py-6 overflow-y-auto">
      <div
        className="bg-white w-full max-w-5xl rounded-[3rem] overflow-hidden shadow-2xl relative animate-in fade-in zoom-in duration-300 flex flex-col md:flex-row min-h-[600px]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left Side: Decorative Image */}
        <div className="hidden md:block md:w-2/5 relative">
          <img
            src={assets.regImage}
            alt="registration"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-12 flex flex-col justify-end text-white">
            <div className="w-12 h-1 bg-white mb-6 rounded-full" />
            <h3 className="text-4xl font-black mb-4 font-playfair leading-tight">Partnership for Excellence</h3>
            <p className="text-white/80 font-medium text-lg leading-relaxed">
              Every property in the RoomOra collection is a testament to architectural beauty and refined hospitality.
            </p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full md:w-3/5 p-8 md:p-14 lg:p-16 flex flex-col">
          <div className="mb-10 relative">
            <button
              onClick={onClose}
              className="absolute -top-4 -right-4 md:-top-10 md:-right-10 p-3 bg-gray-50 rounded-full hover:bg-gray-100 transition-all border border-gray-100 group"
            >
              <img src={assets.closeIcon} alt="close" className="w-5 h-5 opacity-40 group-hover:opacity-100 transition-opacity" />
            </button>
            <h2 className="text-4xl font-black text-gray-900 mb-2 font-playfair tracking-tight">Register Property</h2>
            <p className="text-gray-400 font-bold text-sm tracking-widest uppercase">Property Information</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8 flex-grow">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Name */}
              <div className="space-y-3">
                <label className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-500">Hotel Name</label>
                <input
                  required
                  type="text"
                  placeholder="e.g., Azure Sands Resort"
                  className="w-full px-6 py-4.5 bg-white border-2 border-gray-100 rounded-2xl focus:border-gray-900 transition-all outline-none font-bold text-gray-900 placeholder:text-gray-300 shadow-sm"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              {/* City */}
              <div className="space-y-3">
                <label className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-500">City / Region</label>
                <input
                  required
                  type="text"
                  placeholder="e.g., Baa Atoll"
                  className="w-full px-6 py-4.5 bg-white border-2 border-gray-100 rounded-2xl focus:border-gray-900 transition-all outline-none font-bold text-gray-900 placeholder:text-gray-300 shadow-sm"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                />
              </div>
            </div>

            {/* Address */}
            <div className="space-y-3">
              <label className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-500">Full Address</label>
              <input
                required
                type="text"
                placeholder="Enter specific location details"
                className="w-full px-6 py-4.5 bg-white border-2 border-gray-100 rounded-2xl focus:border-gray-900 transition-all outline-none font-bold text-gray-900 placeholder:text-gray-300 shadow-sm"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>

            {/* Contact */}
            <div className="space-y-3">
              <label className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-500">Contact Number</label>
              <input
                required
                type="tel"
                placeholder="+1 234 567 890"
                className="w-full px-6 py-4.5 bg-white border-2 border-gray-100 rounded-2xl focus:border-gray-900 transition-all outline-none font-bold text-gray-900 placeholder:text-gray-300 shadow-sm"
                value={formData.contact}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
              />
            </div>

            {/* Footer Actions */}
            <div className="flex items-center justify-end gap-8 pt-10">
              <button
                type="button"
                onClick={onClose}
                className="text-gray-400 font-black text-xs uppercase tracking-[0.2em] hover:text-gray-900 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="bg-gray-900 text-white px-12 py-5 rounded-3xl font-black text-sm uppercase tracking-[0.2em] hover:bg-gray-700 hover:shadow-2xl hover:-translate-y-1 transition-all active:scale-95 disabled:bg-gray-400 shadow-xl shadow-gray-200"
              >
                {loading ? "Registering..." : "Register"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HotelReg;
