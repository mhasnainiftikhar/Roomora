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
    <aside className="w-64 bg-white border-r border-gray-100 hidden md:flex flex-col h-[calc(100vh-80px)] sticky top-20">
      <div className="flex-1 py-10 px-6 space-y-2">
        {sidebarLinks.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            end={link.path === '/owner'}
            className={({ isActive }) => `
              flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-sm transition-all duration-300 group
              ${isActive
                ? 'bg-gray-900 text-white shadow-xl shadow-gray-200 translate-x-1'
                : 'text-gray-400 hover:text-gray-900 hover:bg-gray-50'
              }
            `}
          >
            {({ isActive }) => (
              <>
                <img
                  src={link.icon}
                  alt={link.name}
                  className={`w-5 h-5 transition-all ${isActive ? 'brightness-0 invert' : 'opacity-40 group-hover:opacity-100'}`}
                />
                {link.name}
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
