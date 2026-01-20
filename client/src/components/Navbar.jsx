import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/Vector.svg';
import { assets } from '../assets/assets';
import { useClerk, useUser, UserButton } from '@clerk/clerk-react';

const BookIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);

const DashboardIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const Navbar = () => {
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Hotels', path: '/rooms' },
    { name: 'Experience', path: '/experience' },
    { name: 'About', path: '/about' },
  ];

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { openSignIn } = useClerk();
  const { user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (location.pathname !== '/') {
        setIsScrolled(true);
      } else {
        setIsScrolled(window.scrollY > 10);
      }
    };

    handleScroll(); // Initial check

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  // Disable background scroll when menu open
  React.useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
    return () => (document.body.style.overflow = 'auto');
  }, [isMenuOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled
        ? 'bg-white/80 shadow-md backdrop-blur-lg'
        : 'bg-transparent'
        }`}
    >
      <div className="flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 py-4 md:py-5">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Roomora Logo" className={`h-9 w-auto ${isScrolled ? 'brightness-0' : ''}`} />
          <span
            className={`text-2xl font-bold ${isScrolled ? 'text-gray-700' : 'text-white'
              }`}
          >
            Roomora
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-12">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`group ${isScrolled ? 'text-gray-700' : 'text-white'
                }`}
            >
              {link.name}
              <div
                className={`${isScrolled ? 'bg-gray-700' : 'bg-white'
                  } h-0.5 w-0 group-hover:w-full transition-all duration-300`}
              />
            </Link>
          ))}

          {user && (
            <button
              onClick={() => navigate('/owner')}
              className={`border px-4 py-1 text-sm rounded-full ${isScrolled ? 'text-black' : 'text-white'
                }`}
            >
              Dashboard
            </button>
          )}
        </div>

        {/* Desktop Right */}
        <div className="hidden md:flex items-center gap-4">
          <img
            src={assets.searchIcon}
            alt="Search"
            className={`h-7 ${isScrolled ? 'invert' : ''}`}
          />

          {user ? (
            <UserButton afterSignOutUrl="/">
              <UserButton.MenuItems>
                <UserButton.Action
                  label="My Bookings"
                  labelIcon={<BookIcon />}
                  onClick={() => navigate('/my-bookings')}
                />
              </UserButton.MenuItems>
            </UserButton>
          ) : (
            <button
              onClick={openSignIn}
              className={`px-8 py-2.5 rounded-full ${isScrolled ? 'bg-black text-white' : 'bg-white text-black'
                }`}
            >
              Login
            </button>
          )}
        </div>

        {/* Mobile Menu Button & User Avatar */}
        <div className="md:hidden flex items-center gap-4">
          {user && (
            <UserButton afterSignOutUrl="/">
              <UserButton.MenuItems>
                <UserButton.Action
                  label="My Bookings"
                  labelIcon={<BookIcon />}
                  onClick={() => navigate('/my-bookings')}
                />
              </UserButton.MenuItems>
            </UserButton>
          )}
          <button onClick={() => setIsMenuOpen(true)}>
            <img
              src={assets.menuIcon}
              alt="Menu"
              className={`h-6 ${isScrolled ? 'invert' : ''}`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-white z-50 flex flex-col items-center justify-center gap-6 transition-transform duration-500 md:hidden ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        {/* Close */}
        <button
          className="absolute top-6 right-6"
          onClick={() => setIsMenuOpen(false)}
        >
          <img src={assets.closeIcon} alt="Close" className="h-6" />
        </button>

        {/* User - Hidden in menu since it's in the header now */}

        {/* Links */}
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            onClick={() => setIsMenuOpen(false)}
            className="text-lg font-medium"
          >
            {link.name}
          </Link>
        ))}

        {/* Actions */}
        {user ? (
          <button
            onClick={() => navigate('/owner')}
            className="border px-6 py-2 rounded-full text-sm"
          >
            Dashboard
          </button>
        ) : (
          <button
            onClick={openSignIn}
            className="bg-black text-white px-8 py-2.5 rounded-full"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
