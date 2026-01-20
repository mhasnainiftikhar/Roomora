import { UserButton } from '@clerk/clerk-react';
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/Vector.svg';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white border-b border-gray-100 px-4 md:px-12 py-4 flex items-center justify-between">
      <div className="flex items-center gap-8">
        {/* Logo */}
        <Link to="/owner" className="flex items-center gap-2">
          <img src={logo} alt="Roomora Logo" className="h-8 w-auto brightness-0" />
          <span className="text-xl font-black text-gray-900 font-playfair tracking-tight">
            Roomora
          </span>
          <span className="ml-2 px-3 py-1 bg-gray-100 text-[10px] font-black uppercase tracking-widest text-gray-500 rounded-full">
            Owner
          </span>
        </Link>
      </div>

      <div className="flex items-center gap-6">
        <Link
          to="/"
          className="hidden md:block text-[11px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-colors"
        >
          View Site
        </Link>
        <div className="h-6 w-px bg-gray-100 hidden md:block" />
        <UserButton afterSignOutUrl="/" />
      </div>
    </nav>
  );
};

export default Navbar;
