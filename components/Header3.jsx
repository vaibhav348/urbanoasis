"use client";

import Link from "next/link";
import { useState } from "react";

const Header3 = () => {
  const [city, setCity] = useState("");

  return (
    <div className='bg-gradient-to-r from-gray-600 to-gray-400 h-auto py-10'>
      <div className="px-4 md:px-5">
        <h2 className='text-2xl md:text-3xl text-white text-center font-bold'>
          Unique Stays, Impeccable Service, Timeless Elegance.
        </h2>
        <div className="flex   justify-center items-center my-5    ">
          <input
            type="text"
            placeholder='Search...'
            className='rounded-l-full w-full md:w-96 h-14 md:h-16 outline-none px-3 text-lg border-r-0 md:border-r-2'
            onChange={(e) => { setCity(e.target.value) }}
          />

          <Link href={`/hotels?city=${city}`} className="w-full m-0 md:w-auto">
            <button type='submit' className='w-full md:w-60 h-14 md:h-16 px-3 py-2 bg-black rounded-r-full hover:cursor-pointer hover:bg-gray-900 text-white text-lg md:text-xl'>
              Search
            </button>
          </Link>
        </div>

        <div className="w-full md:w-fit mx-auto">
          <Link href={`/hotels?city=${city}`} className="flex justify-center items-center h-12 md:h-14 px-3 border-2 border-white text-white hover:cursor-pointer hover:bg-gray-200/30 hover:text-gray-800 rounded-full transform hover:scale-105 transition-transform duration-300 ease-in-out">
            Let's Explore More.
          </Link>  
        </div>
      </div>
    </div>
  );
}

export default Header3;
