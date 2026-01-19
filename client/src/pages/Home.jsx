import React from 'react'
import Hero from '../components/Hero'
import Featured from '../components/Featured'
import ExclusiveOffers from '../components/ExclusiveOffers'
import Testimonials from '../components/Testimonials'
import SignUpCTA from '../components/SignUpCTA'


const Home = () => {

  return (
    <div className="bg-gray-50 pb-20">
      <Hero />
      <Featured />
      <ExclusiveOffers />
      <Testimonials />
      <SignUpCTA/>
    </div>
  )
}

export default Home
