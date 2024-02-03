import React from 'react'
import Home1 from '../assets/home1.png'
import {Input} from '@/components/ui/input.jsx'
import { Button } from '@/components/ui/button'
import Home2 from '../assets/home2.png'
import Home3 from '../assets/home3.png'
import Home4 from '../assets/home4.png'
import Home5 from '../assets/home5.png'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import Navbar from '@/components/Navbar'


function Home() {
  return (
  <>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
    <Navbar />
      <div className="text-center mt-16 h-screen">
        <h1 className="text-6xl font-bold">Find your perfect furry friend</h1>
        <div className="mt-16 flex justify-center items-center">
          <div className="flex border-2 border-gray-200 rounded items-center pr-2">
            <input className="px-4 py-2 w-80" placeholder="Search for a pet" type="text" />
            <MagnifyingGlassIcon className='h-6 w-6' />
          </div>
            <Button className="px-8 rounded-r-lg bg-black text-white">Search</Button>
        </div>
      </div>
      <div className="mt-12">
        <h2 className="text-3xl font-bold text-center">How it works</h2>
        <div className="flex justify-center mt-8">
          {/* <ChevronDownIcon className="w-6 h-6" /> */}
        </div>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center">
            <img
              alt="Step 1"
              className="mb-4"
              height="120"
              src={Home3}
              style={{
                  aspectRatio: "120/120",
                  objectFit: "cover",
                }}
                width="120"
                />
            <h3 className="text-xl font-semibold mb-2">Step 1</h3>
            <p>Enter your location. Type in your city or zip code to find pets available for adoption near you.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <img
              alt="Step 2"
              className="mb-4"
              height="120"
              src={Home4}
              style={{
                  aspectRatio: "120/120",
                  objectFit: "cover",
                }}
                width="120"
                />
            <h3 className="text-xl font-semibold mb-2">Step 2</h3>
            <p>
              Browse available pets and connect with their owners. You're one step closer to finding your perfect furry
              friend.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <img
              alt="Step 3"
              className="mb-4"
              height="120"
              src={Home5}
              style={{
                  aspectRatio: "120/120",
                  objectFit: "cover",
                }}
                width="120"
                />
            <h3 className="text-xl font-semibold mb-2">Step 3</h3>
            <p>Finalize the adoption process. Then, welcome your new pet into your loving home!</p>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Home