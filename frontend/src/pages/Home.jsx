import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <div className="bg-cover bg-bottom drop-shadow-lg bg-[url(https://cdn.pixabay.com/photo/2023/08/30/12/52/ai-generated-8223258_1280.jpg)] h-screen pt-8 w-full flex justify-between flex-col bg-red-200">
        <h1 className='text-3xl ml-9 font-semibold text-gray-800'>dropU</h1>
        <div className="bg-white py-5 px-4 pb-7">
          <h2 className='text-[1.65rem] font-semibold'>Get Started with dropU</h2>
          <Link to='/login' className='flex text-lg items-center justify-center w-full bg-gradient-to-br from-purple-900 to-sky-600 text-white py-4 rounded-lg mt-5'>Continue</Link>
        </div>
      </div>
    </div>
  )
}

export default Home