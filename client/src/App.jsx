import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Footer from './components/Footer'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsConditions from './pages/TermsConditions'
import CookieSettings from './pages/CookieSettings'
import Rooms from './pages/Rooms'
import RoomDetails from './pages/RoomDetails'
import MyBookings from './pages/MyBookings'
import HotelReg from './components/HotelReg'
import Layout from './pages/hotelOwner/Layout'
import Dashboard from './pages/hotelOwner/Dashboard'
import AddRoom from './pages/hotelOwner/AddRoom'
import ListRoom from './pages/hotelOwner/ListRoom'

const App = () => {
  const isOwnerPath = useLocation().pathname.includes("owner")
  const [isHotelRegOpen, setIsHotelRegOpen] = React.useState(false);

  return (
    <div>
      {!isOwnerPath && <Navbar />}

      {!isOwnerPath && (
        <>
          {/* Temporary Test Button for HotelReg Modal */}
          <button
            onClick={() => setIsHotelRegOpen(true)}
            className="fixed bottom-10 right-10 z-[60] bg-black text-white px-6 py-3 rounded-full font-bold shadow-2xl hover:bg-gray-600 transition-all animate-bounce"
          >
            Register Your Hotel
          </button>

          <HotelReg isOpen={isHotelRegOpen} onClose={() => setIsHotelRegOpen(false)} />
        </>
      )}
      <div className='min-h-[70vh]'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/rooms' element={<Rooms />} />
          <Route path='/room/:id' element={<RoomDetails />} />
          <Route path='/my-bookings' element={<MyBookings />} />
          <Route path='/privacy' element={<PrivacyPolicy />} />
          <Route path='/terms' element={<TermsConditions />} />
          <Route path='/cookies' element={<CookieSettings />} />
          <Route path='/owner' element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path='add-room' element={<AddRoom />} />
            <Route path='list-of-rooms' element={<ListRoom />} />
          </Route>
        </Routes>
      </div>
      {!isOwnerPath && <Footer />}
    </div>
  )
}

export default App
