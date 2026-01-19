import React from 'react'
import Hero from '../components/Hero'
import Featured from '../components/Featured'
import ExclusiveOffers from '../components/ExclusiveOffers'


const Home = () => {

  return (
    <div className="bg-gray-50 pb-20">
      <Hero />
      <Featured />
      <ExclusiveOffers />
    </div>
  )
}

export default Home
