import Block from '@/components/Block'
import Header1 from '@/components/Header1'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'




const Property = () => {
const [owner, setOwner] = useState("");

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  };

useEffect(() => {
  const checkUserCookie = () => {
    const profileCookie = getCookie('profile');
     setOwner(profileCookie);  
     };
  checkUserCookie();
}, );



  return (
     
    <>
     <Head>
      <title>UrbanOasis : Property</title>
        </Head>
    <Header1/>
    <div className="min-h-screen py-[10vh] flex flex-col md:flex-row justify-evenly items-center bg-gradient-to-r from-blue-500 to-red-500">
  {/* Show My Hotels */}
  <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm text-center w-4/5 md:w-auto mb-8 md:mb-0">
    <h2 className="text-2xl font-bold mb-4 text-gray-800">Show My Property</h2>
    <Image
      src="/hotellist.jpeg" // Replace with the correct path to your image
      alt="Show My Hotels"
      width={300}
      height={200}
      className="rounded-lg mb-6"
    />
    <Link href={`/myproperty?owner=${owner}`}>
      <button className="bg-gradient-to-r from-blue-500 to-red-500 text-white py-2 px-6 rounded-full hover:from-blue-600 hover:to-red-600 transition duration-300 ease-in-out">
        Your Property
      </button>
    </Link>
  </div>

  {/* Add My Property */}
  <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm text-center w-4/5 md:w-auto">
    <h2 className="text-2xl font-bold mb-4 text-gray-800">Add My Property</h2>
    <Image
      src="/addhotel.jpeg" // Replace with the correct path to your image
      alt="Add My Property"
      width={300}
      height={200}
      className="rounded-lg mb-6"
    />
    <Link href="/listproperty">
      <button className="bg-gradient-to-r from-blue-500 to-red-500 text-white py-2 px-6 rounded-full hover:from-blue-600 hover:to-red-600 transition duration-300 ease-in-out">
        Add Property
      </button>
    </Link>
  </div>
</div>

    
     
    </>
  )
}

export default Property