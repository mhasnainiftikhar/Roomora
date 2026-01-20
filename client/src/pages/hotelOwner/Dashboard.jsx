import React from 'react';
import { dashboardDummyData, assets } from '../../assets/assets';

const Dashboard = () => {
  const stats = [
    { name: 'Total Revenue', value: `$${dashboardDummyData.totalRevenue}`, icon: assets.totalRevenueIcon, color: 'text-green-600', bg: 'bg-green-50' },
    { name: 'Total Bookings', value: dashboardDummyData.totalBookings, icon: assets.totalBookingIcon, color: 'text-orange-600', bg: 'bg-orange-50' },
    { name: 'Active Rooms', value: '4', icon: assets.listIcon, color: 'text-blue-600', bg: 'bg-blue-50' },
  ];

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-black text-gray-900 font-playfair mb-2">Welcome Back, Owner</h1>
        <p className="text-gray-400 font-bold text-sm tracking-widest uppercase">Performance Overview</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((stat) => (
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
              {dashboardDummyData.bookings.map((booking) => (
                <tr key={booking._id} className="hover:bg-gray-50/30 transition-colors group">
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                        <img src={booking.user.image} alt={booking.user.username} className="w-full h-full object-cover" />
                      </div>
                      <p className="font-bold text-gray-900">{booking.user.username}</p>
                    </div>
                  </td>
                  <td className="px-10 py-8 text-sm font-bold text-gray-500">
                    {new Date(booking.checkInDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                  <td className="px-10 py-8 text-sm font-bold text-gray-900">{booking.room.roomType}</td>
                  <td className="px-10 py-8 font-black text-gray-900">${booking.totalPrice}</td>
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
      </div>
    </div>
  );
};

export default Dashboard;
