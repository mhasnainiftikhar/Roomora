import React, { useState, useContext } from 'react';
import { assets } from '../../assets/assets';
import { AppContext } from '../../context/appContext';
import axios from 'axios';

const AddRoom = () => {
  const { toast, getToken, getRoomsData } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    roomType: '',
    pricePerNight: '',
    description: '',
    amenities: [],
  });

  const [newAmenity, setNewAmenity] = useState('');

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
    <div className="max-w-5xl space-y-12 pb-20">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black text-gray-900 font-playfair mb-2">Refine Your Collection</h1>
          <p className="text-gray-400 font-bold text-sm tracking-widest uppercase">Add a new dimension of luxury</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-12">
        {/* Gallery Section */}
        <div className="bg-white p-10 md:p-14 rounded-[3.5rem] border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.02)] space-y-8">
          <div className="flex items-center gap-4">
            <span className="w-10 h-[2px] bg-gray-900 rounded-full" />
            <p className="text-[11px] font-black uppercase tracking-[0.3em] text-gray-500">Visual Narrative</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            <label className="aspect-square bg-gray-50 border-2 border-dashed border-gray-200 rounded-[2.5rem] flex flex-col items-center justify-center gap-3 hover:bg-gray-100 hover:border-gray-900 hover:scale-95 transition-all cursor-pointer group">
              <input type="file" multiple hidden onChange={handleImageChange} accept="image/*" />
              <img src={assets.uploadArea} alt="upload" className="w-8 h-8 opacity-20 group-hover:opacity-100 transition-all duration-500" />
              <span className="text-[9px] font-black text-gray-400 group-hover:text-gray-900 uppercase tracking-widest transition-colors">Add Visual</span>
            </label>

            {images.map((img, index) => (
              <div key={index} className="aspect-square relative group bg-gray-100 rounded-[2.5rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
                <img src={URL.createObjectURL(img)} alt="preview" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-2xl opacity-0 group-hover:opacity-100 hover:bg-white hover:rotate-90 transition-all duration-300"
                >
                  <img src={assets.closeIcon} className="w-3 h-3 invert" alt="remove" />
                </button>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-gray-400 font-medium italic">Add up to 5 high-resolution perspectives of your space.</p>
        </div>

        {/* Intelligence Section */}
        <div className="bg-white p-10 md:p-14 rounded-[3.5rem] border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.02)] space-y-12">
          <div className="flex items-center gap-4">
            <span className="w-10 h-[2px] bg-gray-900 rounded-full" />
            <p className="text-[11px] font-black uppercase tracking-[0.3em] text-gray-500">Property Details</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4 group">
              <label className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-400 group-focus-within:text-gray-900 transition-colors ml-4">Suite Classification</label>
              <input
                required
                type="text"
                placeholder="e.g., Royal Observatory Suite"
                className="w-full px-8 py-6 bg-gray-50 border-transparent rounded-[2.2rem] focus:bg-white focus:border-gray-900 focus:shadow-xl transition-all outline-none font-bold text-gray-900"
                value={formData.roomType}
                onChange={(e) => setFormData({ ...formData, roomType: e.target.value })}
              />
            </div>
            <div className="space-y-4 group">
              <label className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-400 group-focus-within:text-gray-900 transition-colors ml-4">Nightly Investment ($)</label>
              <input
                required
                type="number"
                placeholder="0.00"
                className="w-full px-8 py-6 bg-gray-50 border-transparent rounded-[2.2rem] focus:bg-white focus:border-gray-900 focus:shadow-xl transition-all outline-none font-bold text-gray-900"
                value={formData.pricePerNight}
                onChange={(e) => setFormData({ ...formData, pricePerNight: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-4 group">
            <label className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-400 group-focus-within:text-gray-900 transition-colors ml-4">Experience Narrative</label>
            <textarea
              required
              rows="5"
              placeholder="Articulate the unique sensory experience of this suite..."
              className="w-full px-8 py-8 bg-gray-50 border-transparent rounded-[2.5rem] focus:bg-white focus:border-gray-900 focus:shadow-xl transition-all outline-none font-bold text-gray-900 resize-none leading-relaxed"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          {/* Amenities Management */}
          <div className="space-y-6">
            <label className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-400 ml-4">Curated Amenities</label>
            <div className="flex flex-wrap gap-4 px-4">
              {formData.amenities.map(amenity => (
                <div key={amenity} className="bg-gray-900 text-white pl-6 pr-4 py-3 rounded-full flex items-center gap-3 text-xs font-black tracking-widest uppercase hover:scale-105 transition-transform cursor-default shadow-lg">
                  {amenity}
                  <button type="button" onClick={() => removeAmenity(amenity)} className="hover:rotate-90 transition-transform">
                    <img src={assets.closeIcon} alt="remove" className="w-3 h-3 invert" />
                  </button>
                </div>
              ))}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Private Pool..."
                  className="px-6 py-3 bg-gray-50 border-2 border-dashed border-gray-200 rounded-full outline-none font-bold text-xs"
                  value={newAmenity}
                  onChange={(e) => setNewAmenity(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAmenity())}
                />
                <button
                  type="button"
                  onClick={addAmenity}
                  className="bg-gray-100 hover:bg-gray-200 p-3 rounded-full transition-colors"
                >
                  <img src={assets.plusIcon || "https://img.icons8.com/material-rounded/24/000000/plus--v1.png"} className="w-4 h-4" alt="add" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-8">
            <button
              type="submit"
              disabled={loading}
              className="bg-gray-900 text-white px-16 py-6 rounded-full font-black text-sm uppercase tracking-[0.3em] hover:bg-black hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] hover:-translate-y-2 transition-all active:scale-95 disabled:bg-gray-400 shadow-2xl shadow-gray-200 group flex items-center gap-4"
            >
              {loading ? "Archiving..." : "Publish Listing"}
              {!loading && <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddRoom;
