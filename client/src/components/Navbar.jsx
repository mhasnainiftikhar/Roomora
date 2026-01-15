import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/Vector.svg';
import { assets } from '../assets/assets';
import { useClerk, useUser, UserButton } from '@clerk/clerk-react';

const BookIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);

const Navbar = () => {
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Hotels', path: '/rooms' },
    { name: 'Experience', path: '/' },
    { name: 'About', path: '/' },
  ];

  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const { openSignIn } = useClerk();
  const { user } = useUser();
  const navigate = useNavigate();

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${
        isScrolled
          ? 'bg-white/80 shadow-md text-gray-700 backdrop-blur-lg py-3 md:py-4'
          : 'py-4 md:py-6 text-white'
      }`}
    >
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2">
        <img src={logo} alt="Roomora Logo" className="h-9 w-auto" />
        <span
          className={`text-2xl font-bold ${
            isScrolled ? 'text-gray-700' : 'text-white'
          }`}
        >
          Roomora
        </span>
      </Link>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-4 lg:gap-12">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className={`group flex flex-col gap-0.5 ${
              isScrolled ? 'text-gray-700' : 'text-white'
            }`}
          >
            {link.name}
            <div
              className={`${
                isScrolled ? 'bg-gray-700' : 'bg-white'
              } h-0.5 w-0 group-hover:w-full transition-all duration-300`}
            />
          </Link>
        ))}

        <button
          className={`border px-4 py-1 text-sm font-light rounded-full ${
            isScrolled ? 'text-black' : 'text-white'
          }`}
        >
          Dashboard
        </button>
      </div>

      {/* Desktop Right */}
      <div className="hidden md:flex items-center gap-4">
        <img
          src={assets.searchIcon}
          alt="Search"
          className={`h-7 ${isScrolled ? 'invert' : ''}`}
        />

        {user ? (
          <UserButton>
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
            className={`px-8 py-2.5 rounded-full ml-4 ${
              isScrolled ? 'bg-black text-white' : 'bg-white text-black'
            }`}
          >
            Login
          </button>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button onClick={() => setIsMenuOpen(true)}>
          <img
            src={assets.menuIcon}
            alt="Menu"
            className={`h-6 ${isScrolled ? 'invert' : ''}`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-white flex flex-col items-center justify-center gap-6 transition-all duration-500 md:hidden ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <button
          className="absolute top-4 right-4"
          onClick={() => setIsMenuOpen(false)}
        >
          <img src={assets.closeIcon} alt="Close" className="h-6" />
        </button>

        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            onClick={() => setIsMenuOpen(false)}
            className="text-lg"
          >
            {link.name}
          </Link>
        ))}

        <button className="border px-4 py-1 text-sm rounded-full">
          Dashboard
        </button>

        {user ? (
          <UserButton>
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
