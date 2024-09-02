"use client";
import Head from "next/head";
import Image from "next/image";
import Cookies from "js-cookie";
import Link from "next/link";
import { useEffect, useState } from "react";
import Header1 from "@/components/Header1";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const SingleHotel = ({ hotel }) => {
  const [auth, setAuth] = useState(false);
  var discountedPrice = Math.floor(hotel?.price - ((hotel?.price * hotel?.discount) / 100))
  const { gallery } = hotel;

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === gallery.length - 1 ? 0 : prevIndex + 1));
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Clean up on component unmount
  }, [gallery.length]);


  useEffect(() => {
    const cookie = Cookies.get("user");
    console.log({ hotel });
    console.log({ gallery });

    if (cookie) {
      setAuth(true);
      return;
    }


    setAuth(false);
  }, []);

  return (
    <>
      <Head>
        <title>{hotel?.name}</title>
      </Head>

      <Header1 />
      <div className="bg-gray-100 p-5">

        <div className="w-full md:w-7/12  mx-auto my-2 md:my-10">

          <div className="relative w-full overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out "
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {gallery.map((url, index) => (
                <div key={index} className="flex-shrink-0 w-full h-auto md:h-[60vh] ">
                  <img
                    src={url}
                    alt={`Slide ${index + 1}`}
                    className="object-cover rounded-md w-full h-full "
                  />
                </div>
              ))}
            </div>
            <button
              onClick={() => setCurrentIndex((prevIndex) => (prevIndex === 0 ? gallery.length - 1 : prevIndex - 1))}
              className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-400/50 text-white p-2 rounded-full"
            >
              &#8249;
            </button>
            <button
              onClick={() => setCurrentIndex((prevIndex) => (prevIndex === gallery.length - 1 ? 0 : prevIndex + 1))}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-400/50 text-white p-2 rounded-full"
            >
              &#8250;
            </button>
          </div>



          {/* <Image
          src={hotel?.gallery[0]}
          alt="hotel"
          className="w-full h-full my-5"
          width={1500}
          height={1500}
          style={{ width: "30rem" }}
          /> */}
          <div className=" my-6">
            <h3 className="text-3xl font-bold">{hotel?.name}</h3>
            <p className="text-gray-600 font-medium">{hotel?.location}</p>
            <p className="text-gray-600">Provide By  {hotel?.owner}</p>

            <p className="mt-4 font-medium text-xl"> About</p>
            <div className="text-gray-600  text-justify ">
              {hotel?.description.split('\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <p className="mt-4 font-medium text-xl">Amenities</p>
            <ul className="grid grid-cols-2 md:grid-cols-4 
            grid-rows-4 md:grid-rows-3 gap-2 justify-between ">
              {hotel
                ? hotel.facilities?.map((ele) => {
                  return (
                    <li key={ele.name} className="flex  items-center mr-5 mt-2">
                      <span>
                        <Image
                          src={ele.img}
                          width={200}
                          height={200}
                          className="w-4 h-4 rounded-full"
                        />
                      </span>
                      <span className="ml-5 text-gray-600">{ele.name}</span>
                    </li>
                  );
                })
                : ""}
            </ul>


            <h2 className="font-bold mt-4 flex justify-left items-center text-xl">&#8377;{discountedPrice}  <span className="line-through pl-2 text-gray-600 font-medium text-sm">  &#8377; {hotel?.price}</span> <span className="pl-2 font-medium text-orange-500 text-sm">{hotel?.discount}% off</span>
            </h2>


            {auth ? (
              <Link href={`/payment/${hotel?._id}`}>
                <button className="  bg-blue-500 text-white font-semibold text-sm py-1.5 px-3 rounded-lg border border-blue-700 shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transform hover:scale-105 transition-transform duration-300 ease-in-out
                    
                    cursor-pointer my-2">
                  Book Now
                </button>
              </Link>
            ) : (
              <span className="text-2xl ">
                Please{" "}
                <Link href={"/login"} className="text-blue-500">
                  login
                </Link>{" "}
                to Book hotel
              </span>
            )}
        </div>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(ctx) {
  const res = await fetch(`${process.env.BASE_URL}/api/hotels/${ctx.query.id}`);
  const data = await res.json();
  return {
    props: {
      hotel: data.hotel,
    },
  };
}

export default SingleHotel;
