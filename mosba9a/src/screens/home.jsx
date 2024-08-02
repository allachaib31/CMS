import React from 'react'
import backgroundImage from "../images/background.png"
import { Outlet } from 'react-router-dom'

function Home() {
  return (
    <div className='hero min-h-screen delay-[3000] duration-1000 ease-out' style={{
      backgroundImage: `url(${backgroundImage})`,
    }}>
      <Outlet />
    </div>
  )
}

export default Home