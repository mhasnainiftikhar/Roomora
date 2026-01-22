import React, { useState, useContext } from 'react';
import { assets, roomTypes } from '../../assets/assets';
import { AppContext } from '../../context/appContext';
import axios from 'axios';

const AddRoom = () => {
  const { toast, getToken, getRoomsData } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    roomType: roomTypes[0],
    pricePerNight: '',
    description: '',
    amenities: [],
  });

  const [newAmenity, setNewAmenity] = useState('');

  const commonAmenities = ["Free WiFi", "Free Breakfast", "Room Service", "Mountain View", "Pool Access", "Gym Access", "Air Conditioning", "Mini Bar", "24/7 Concierge", "Spa Access", "Ocean View", "Pet Friendly", "Parking", "Laundry Service", "In-room Safe"];

  const handleAmenityToggle = (amenity) => {
    setFormData(prev => {
      const amenities = prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity];
      return { ...prev, amenities };
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (images.length + files.length > 5) {
      toast.error("Maximum 5 images allowed");
      return;
    }
    setImages([...images, ...files]);
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const addAmenity = () => {
    if (newAmenity && !formData.amenities.includes(newAmenity)) {
      setFormData({ ...formData, amenities: [...formData.amenities, newAmenity] });
      setNewAmenity('');
    }
  };

  const removeAmenity = (name) => {
    setFormData({ ...formData, amenities: formData.amenities.filter(a => a !== name) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (images.length === 0) {
      return toast.error("Please upload at least one image");
    }

    setLoading(true);
    try {
      const token = await getToken();
      const data = new FormData();
      data.append('roomType', formData.roomType);
      data.append('pricePerNight', formData.pricePerNight);
      data.append('description', formData.description);
      data.append('amenities', JSON.stringify(formData.amenities));
      images.forEach(image => data.append('images', image));

      const response = await axios.post('/api/room/create-room', data, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.success) {
        toast.success("Listing created successfully!");
        setFormData({ roomType: '', pricePerNight: '', description: '', amenities: [] });
        setImages([]);
        getRoomsData(); // Refresh global rooms
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create listing");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
        <div className="space-y-2">
          <h1 className="text-5xl font-extrabold text-gray-900 font-playfair tracking-tight">Refine Your Collection</h1>
          <div className="flex items-center gap-3">
            <span className="w-12 h-1 bg-orange-500 rounded-full" />
            <p className="text-gray-400 font-black text-[11px] tracking-[0.3em] uppercase">Add a new dimension of luxury</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-16">
        {/* Gallery Section */}
        <section className="bg-white p-12 md:p-16 rounded-[4rem] border border-gray-300 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.03)] space-y-10 group/section">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gray-50 rounded-2xl flex items-center justify-center group-hover/section:bg-gray-900 transition-colors duration-500">
              <svg className="w-5 h-5 text-gray-500 group-hover/section:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-[12px] font-black uppercase tracking-[0.4em] text-gray-900">Visual Narrative</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            <label className="aspect-square bg-gray-50/50 border-2 border-dashed border-gray-200 rounded-[3rem] flex flex-col items-center justify-center gap-4 hover:bg-white hover:border-orange-500 hover:shadow-2xl hover:shadow-orange-100 hover:-translate-y-2 transition-all cursor-pointer group/upload">
              <input type="file" multiple hidden onChange={handleImageChange} accept="image/*" />
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover/upload:bg-orange-500 transition-colors duration-500">
                <img src={assets.uploadArea} alt="upload" className="w-6 h-6 opacity-40 group-hover/upload:opacity-100 group-hover/upload:invert transition-all" />
              </div>
              <span className="text-[10px] font-black text-gray-400 group-hover/upload:text-gray-900 uppercase tracking-widest">Add Perspective</span>
            </label>

            {images.map((img, index) => (
              <div key={index} className="aspect-square relative group bg-gray-100 rounded-[3rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-700 hover:-translate-y-2">
                <img src={URL.createObjectURL(img)} alt="preview" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="bg-white text-gray-900 p-4 rounded-3xl hover:bg-red-500 hover:text-white hover:rotate-90 transition-all duration-500 shadow-2xl"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-gray-400 font-medium italic pl-4 border-l-2 border-gray-100">Capture the soul of your space. Add up to 5 cinematic views.</p>
        </section>

        {/* Intelligence Section */}
        <section className="bg-white p-12 md:p-16 rounded-[4rem] border border-gray-300 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.03)] space-y-16 group/intel">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gray-50 rounded-2xl flex items-center justify-center group-hover/intel:bg-gray-900 transition-colors duration-500">
              <svg className="w-5 h-5 text-gray-500 group-hover/intel:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-[12px] font-black uppercase tracking-[0.4em] text-gray-900">Suite Intelligence</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="space-y-4 group">
              <label className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 group-focus-within:text-orange-500 transition-colors ml-2">Suite Classification</label>
              <div className="relative">
                <select
                  required
                  className="w-full px-10 py-7 bg-gray-50/50 border-2 border-gray-300 rounded-[2.5rem] focus:bg-white focus:border-gray-900 focus:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.08)] transition-all outline-none font-bold text-gray-900 appearance-none cursor-pointer"
                  value={formData.roomType}
                  onChange={(e) => setFormData({ ...formData, roomType: e.target.value })}
                >
                  {roomTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                <div className="absolute right-10 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>
            </div>
            <div className="space-y-4 group">
              <label className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 group-focus-within:text-orange-500 transition-colors ml-2">Nightly Investment ($)</label>
              <div className="relative">
                <input
                  required
                  type="number"
                  placeholder="0.00"
                  className="w-full px-10 py-7 bg-gray-50/50 border-2 border-gray-300 rounded-[2.5rem] focus:bg-white focus:border-gray-900 focus:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.08)] transition-all outline-none font-bold text-gray-900 placeholder:text-gray-300 placeholder:font-medium"
                  value={formData.pricePerNight}
                  onChange={(e) => setFormData({ ...formData, pricePerNight: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4 group">
            <label className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 group-focus-within:text-orange-500 transition-colors ml-2">Experience Narrative</label>
            <textarea
              required
              rows="6"
              placeholder="Articulate the unique sensory experience of this suite..."
              className="w-full px-10 py-10 bg-gray-50/50 border-2 border-gray-300 rounded-[3rem] focus:bg-white focus:border-gray-900 focus:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.08)] transition-all outline-none font-bold text-gray-900 resize-none leading-relaxed placeholder:text-gray-300 placeholder:font-medium"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          {/* Amenities Management */}
          <div className="space-y-12">
            <div className="space-y-6">
              <div className="flex items-center justify-between px-2">
                <label className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400">Curated Amenities</label>
                <span className="text-[10px] font-bold text-orange-500 bg-orange-50 px-3 py-1 rounded-full">{formData.amenities.length} Selected</span>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-6 px-6 py-8 bg-gray-50/50 rounded-[3rem]">
                {commonAmenities.map((amenity) => (
                  <label key={amenity} className="flex items-center gap-4 cursor-pointer group/label select-none">
                    <div className="relative flex items-center justify-center">
                      <input
                        type="checkbox"
                        className="peer appearance-none w-6 h-6 rounded-xl border-2 border-gray-200 checked:bg-gray-900 checked:border-gray-900 transition-all duration-300 cursor-pointer"
                        checked={formData.amenities.includes(amenity)}
                        onChange={() => handleAmenityToggle(amenity)}
                      />
                      <svg className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-[12px] font-bold text-gray-500 group-hover/label:text-gray-900 transition-colors">{amenity}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-8 pt-10 border-t border-gray-100">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-2">
                <label className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400">Custom Signatures</label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="e.g., Personal Butler..."
                    className="px-8 py-4 bg-gray-50 border-2 border-transparent focus:border-gray-900 focus:bg-white rounded-full outline-none font-bold text-xs w-64 transition-all shadow-sm"
                    value={newAmenity}
                    onChange={(e) => setNewAmenity(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAmenity())}
                  />
                  <button
                    type="button"
                    onClick={addAmenity}
                    className="bg-gray-900 hover:bg-orange-500 p-4 rounded-full transition-all hover:shadow-[0_10px_20px_-5px_rgba(249,115,22,0.4)] active:scale-90"
                  >
                    <img src={assets.addIcon} className="w-4 h-4 invert" alt="add" />
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 px-2">
                {formData.amenities.map(amenity => (
                  <div key={amenity} className="group/chip bg-white border-2 border-gray-100 pl-6 pr-4 py-4 rounded-[2rem] flex items-center gap-4 text-[11px] font-black tracking-widest uppercase hover:border-gray-900 hover:shadow-xl transition-all cursor-default animate-in fade-in zoom-in duration-300">
                    <span className="text-gray-900">{amenity}</span>
                    <button
                      type="button"
                      onClick={() => removeAmenity(amenity)}
                      className="p-1.5 rounded-xl hover:bg-red-50 text-gray-300 hover:text-red-500 transition-all"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>
                ))}
                {formData.amenities.length === 0 && (
                  <p className="text-xs font-bold text-gray-300 py-4 italic">No amenities curated yet...</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-12 border-t border-gray-50">
            <button
              type="submit"
              disabled={loading}
              className="bg-gray-900 text-white px-10 py-4 rounded-full font-black text-xs uppercase tracking-[0.4em] hover:bg-black hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.35)] hover:-translate-y-2 transition-all active:scale-95 disabled:bg-gray-400 shadow-2xl shadow-gray-200 group flex items-center gap-6"
            >
              {loading ? "Creating Masterpiece..." : "Publish Room"}
              {!loading && (
                <div className="w-10 h-10 bg-white/10 rounded-2xl flex items-center justify-center group-hover:bg-orange-500 transition-colors">
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </div>
              )}
            </button>
          </div>
        </section>
      </form>
    </div>
  );
};

export default AddRoom;
