import React, { useEffect } from 'react';
import Navbar from '../../components/hotelOwner/Navbar';
import Sidebar from '../../components/hotelOwner/Sidebar';
import { Outlet } from 'react-router-dom';
import { AppContext } from '../../context/appContext';

const Layout = () => {
  const { isOwner, navigate } = React.useContext(AppContext);

  useEffect(() => {
    if (!isOwner) {
      navigate('/');
    }
  }, [isOwner]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex flex-1 pt-20"> {/* pt-20 to offset the fixed navbar */}
        <Sidebar />
        <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
