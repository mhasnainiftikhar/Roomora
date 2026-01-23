import React, { useContext } from 'react'
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
import VerifyPayment from './pages/VerifyPayment'
import HotelReg from './components/HotelReg'
import Layout from './pages/hotelOwner/Layout'
import Dashboard from './pages/hotelOwner/Dashboard'
import AddRoom from './pages/hotelOwner/AddRoom'
import ListRoom from './pages/hotelOwner/ListRoom'
import About from './pages/About'
import Experience from './pages/Experience'
import HelpCenter from './pages/HelpCenter'
import SafetyInformation from './pages/SafetyInformation'
import CancellationPolicy from './pages/CancellationPolicy'
import CovidResponse from './pages/CovidResponse'
import ReportConcern from './pages/ReportConcern'
import { useUser } from '@clerk/clerk-react'
import { Toaster } from 'react-hot-toast'
import { AppContext } from './context/appContext'
import Loader from './components/loader'

const App = () => {
  const { user } = useUser()
  const { userData, isOwner } = useContext(AppContext)
  const isOwnerPath = useLocation().pathname.includes("owner")
  const [isHotelRegOpen, setIsHotelRegOpen] = React.useState(false);


  return (
    <div>
      <Toaster />
      {!isOwnerPath && <Navbar />}

      {!isOwnerPath && (
        <>
          {/* Register Hotel Button - Hidden once user becomes an owner */}
          {user && !isOwner && (
            <button
              onClick={() => setIsHotelRegOpen(true)}
              className="fixed bottom-10 right-10 z-[60] bg-black text-white px-6 py-3 rounded-full font-bold shadow-2xl hover:bg-gray-600 transition-all animate-bounce"
            >
              Register Your Hotel
            </button>
          )}

          <HotelReg isOpen={isHotelRegOpen} onClose={() => setIsHotelRegOpen(false)} />
        </>
      )}
      <div className='min-h-[70vh]'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/rooms' element={<Rooms />} />
          <Route path='/room/:id' element={<RoomDetails />} />
          <Route path='/my-bookings' element={<MyBookings />} />
          <Route path='/about' element={<About />} />
          <Route path='/experience' element={<Experience />} />
          <Route path='/privacy' element={<PrivacyPolicy />} />
          <Route path='/terms' element={<TermsConditions />} />
          <Route path='/cookies' element={<CookieSettings />} />
          <Route path='/loader/:nextUrl' element={<Loader />} />
          <Route path='/verify' element={<VerifyPayment />} />
          <Route path='/help-center' element={<HelpCenter />} />
          <Route path='/safety' element={<SafetyInformation />} />
          <Route path='/cancellation-policy' element={<CancellationPolicy />} />
          <Route path='/covid-response' element={<CovidResponse />} />
          <Route path='/report-concern' element={<ReportConcern />} />

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
