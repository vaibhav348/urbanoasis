


import Filters from "@/components/Filters"
import Header1 from "@/components/Header1"
import Hotel from "@/components/Hotel"
import axios from "axios"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const myproperty = ({ hotels }) => {
  const [list, setList] = useState([]);
  const [price, setPrice] = useState(1222);
  const [checkList, setCheckList] = useState([])
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const handleCheckList = async () => {
    const { data } = await axios.get(`/api/facilities/search?val=${checkList}`)
    if (data?.hotels) {
      setList(data.hotels)
    }
  }
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  };
  const router = useRouter();
  useEffect(() => {
    if (checkList) {
      handleCheckList();
    }
    const checkUserCookie = () => {

      const userCookie = document.cookie.split('; ').find(row => row.startsWith('user='));
      if (userCookie) {
        setIsUserLoggedIn(true);
      } else {
        setIsUserLoggedIn(false);
        router.push('/login');
      }
    };

    checkUserCookie();
  },
    [checkList, router])

  const handlePrice = async () => {
    try {
      const { data } = await axios.get(`/api/facilities/range?price=${price}`)

      if (data?.hotels) {
        setList(data.hotels)
      }

    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div >
 <Head>
      <title>UrbanOasis : My Property</title>
        </Head>
      <Header1 />
      <h2 className="flex justify-center  pt-4 font-semibold text-xl text-gray-600">Your property </h2>
      {isUserLoggedIn ? (


        <div className="w-full">
          {/* myproperty List */}


          { hotels.length>0
              ?
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 p-2 ">
{
              hotels.map((e) => (
                <div key={e._id} className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col">
                  <Hotel e={e} />
                </div>
              ))
            }
              </div> 
              : (<>
                  <div className="flex m-4 md:mx-auto  flex-col items-center justify-center p-10 bg-gradient-to-r from-blue-500 to-red-500  rounded-md  
                   w-fit ">
                <img
                  src="/nopro.png"
                  alt="No Property"
                  className="w-50 md:w-56 rounded-md h-auto mb-4"
                  />
                <h1 className="text-2xl font-semibold text-gray-200 mb-2">No Property Added</h1>
                <p className="text-gray-100/80 text-center">
                You have no properties yet. Add one to manage your listings.
                </p>
                <Link href="/listproperty">
                <button className="mt-4 px-6 py-2 bg-gray-100/30   text-white rounded-full   hover:bg-gray-200/30 hover:rounded-xl transition duration-6000 ease-in-out">
                  Add Property
                </button>
                </Link>
              </div>
                  </>
              )}


        </div>


      ) : (
        <p>Please login</p>
      )}

    </div>
  )
}

export async function getServerSideProps(ctx) {

  const res = await fetch(
    `${process.env.BASE_URL}/api/hotels?owner=${ctx.query.owner}`
  )
  const data = await res.json();

  return {
    props: {
      hotels: data.hotels ? data.hotels : data.allhotels
    }
  }

}

export default myproperty