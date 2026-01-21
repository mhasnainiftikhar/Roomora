import React, { useState, useEffect, useContext } from 'react';
import { assets } from '../../assets/assets';
import { AppContext } from '../../context/appContext';
import axios from 'axios';

const Dashboard = () => {
  const { toast, getToken, currency } = useContext(AppContext);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalBookings: 0,
    activeRooms: 0,
    totalRooms: 0
  });
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const token = await getToken();
      const { data } = await axios.get('/api/dashboard/owner-stats', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (data.success) {
        setStats(data.stats);
        setRecentBookings(data.recentBookings);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { name: 'Total Revenue', value: `${currency}${stats.totalRevenue.toLocaleString()}`, icon: assets.totalRevenueIcon, color: 'text-green-600', bg: 'bg-green-50' },
    { name: 'Total Bookings', value: stats.totalBookings, icon: assets.totalBookingIcon, color: 'text-orange-600', bg: 'bg-orange-50' },
    { name: 'Active Rooms', value: `${stats.activeRooms}/${stats.totalRooms}`, icon: assets.listIcon, color: 'text-blue-600', bg: 'bg-blue-50' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500 font-bold">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-black text-gray-900 font-playfair mb-2">Welcome Back, Owner</h1>
        <p className="text-gray-400 font-bold text-sm tracking-widest uppercase">Performance Overview</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {statCards.map((stat) => (
          <div key={stat.name} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 group">
            <div className="flex items-center gap-6">
              <div className={`w-16 h-16 ${stat.bg} rounded-[1.5rem] flex items-center justify-center transition-transform group-hover:scale-110`}>
                <img src={stat.icon} alt={stat.name} className="w-8 h-8" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">{stat.name}</p>
                <p className="text-2xl font-black text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-10 py-8 border-b border-gray-50 flex items-center justify-between">
          <h2 className="text-xl font-black text-gray-900 font-playfair">Recent Reservations</h2>
          <button className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-colors">View All</button>
        </div>

        {recentBookings.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="px-10 py-6 text-left text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Guest</th>
                  <th className="px-10 py-6 text-left text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Check In</th>
                  <th className="px-10 py-6 text-left text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Room</th>
                  <th className="px-10 py-6 text-left text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Total</th>
                  <th className="px-10 py-6 text-left text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentBookings.map((booking) => (
                  <tr key={booking._id} className="hover:bg-gray-50/30 transition-colors group">
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
                          {booking.user?.image ? (
                            <img src={booking.user.image} alt={booking.user.username} className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-gray-500 font-bold text-sm">{booking.user?.username?.charAt(0).toUpperCase()}</span>
                          )}
                        </div>
                        <p className="font-bold text-gray-900">{booking.user?.username || 'Guest'}</p>
                      </div>
                    </td>
                    <td className="px-10 py-8 text-sm font-bold text-gray-500">
                      {new Date(booking.checkInDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td className="px-10 py-8 text-sm font-bold text-gray-900">{booking.room?.roomType || 'N/A'}</td>
                    <td className="px-10 py-8 font-black text-gray-900">{currency}{booking.totalPrice}</td>
                    <td className="px-10 py-8">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${booking.status === 'completed' ? 'bg-green-50 text-green-600' :
                          booking.status === 'pending' ? 'bg-orange-50 text-orange-600' :
                            'bg-blue-50 text-blue-600'
                        }`}>
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-16 px-10">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">No bookings yet</h3>
            <p className="text-gray-500 text-sm">Your recent reservations will appear here once guests start booking.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
