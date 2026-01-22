import React from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../../assets/assets';

const Sidebar = () => {
  const sidebarLinks = [
    { name: 'Overview', path: '/owner', icon: assets.dashboardIcon },
    { name: 'Add Room', path: '/owner/add-room', icon: assets.addIcon },
    { name: 'List Rooms', path: '/owner/list-of-rooms', icon: assets.listIcon },
  ];

  return (
    <aside className="w-72 bg-white border-r border-gray-100 hidden md:flex flex-col h-[calc(100vh-80px)] sticky top-20">
      <div className="flex-1 py-12 px-6 space-y-3">
        {sidebarLinks.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            end={link.path === '/owner'}
            className={({ isActive }) => `
              relative flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-[13px] transition-all duration-500 overflow-hidden group
              ${isActive
                ? 'bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-[0_10px_30px_-10px_rgba(0,0,0,0.3)] translate-x-2'
                : 'text-gray-400 hover:text-gray-900 hover:bg-gray-50 hover:translate-x-1'
              }
            `}
          >
            {({ isActive }) => (
              <>
                {/* Active Indicator Bar */}
                <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-orange-500 rounded-r-full transition-all duration-500 ${isActive ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'}`} />

                <img
                  src={link.icon}
                  alt={link.name}
                  className={`w-5 h-5 transition-all duration-500 ${isActive ? 'brightness-0 invert scale-110' : 'opacity-40 group-hover:opacity-100 group-hover:scale-110'}`}
                />
                <span className="relative z-10">{link.name}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>

      <div className="p-8 border-t border-gray-50">
        <div className="bg-orange-50 p-6 rounded-[2rem] relative overflow-hidden group hover:shadow-lg transition-all">
          <div className="relative z-10">
            <p className="text-[10px] font-black uppercase tracking-widest text-orange-600 mb-1">Support</p>
            <p className="text-xs font-bold text-orange-900">Need help with your property listing?</p>
          </div>
          <div className="absolute -top-4 -right-4 w-12 h-12 bg-orange-100 rounded-full group-hover:scale-150 transition-transform duration-700" />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
