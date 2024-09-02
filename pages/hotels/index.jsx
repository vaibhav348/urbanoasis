import Filters from "@/components/Filters";
import Header1 from "@/components/Header1";
import Hotel from "@/components/Hotel";
import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";

const Hotels = ({ hotels }) => {
  const [list, setList] = useState([]);
  const [price, setPrice] = useState(1222);
  const [checkList, setCheckList] = useState([]);

  const handleCheckList = async () => {
    const { data } = await axios.get(`/api/facilities/search?val=${checkList}`);
    if (data?.hotels) {
      setList(data.hotels);
    }
  };

  useEffect(() => {
    if (checkList.length > 0) {
      handleCheckList();
    }
  }, [checkList]);

  const handlePrice = async () => {
    try {
      const { data } = await axios.get(`/api/facilities/range?price=${price}`);

      if (data?.hotels) {
        setList(data.hotels);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Head>
        <title>UrbanOasis : Hotels</title>
      </Head>
      <Header1 />

      <div className="grid grid-cols-1 md:grid-cols-5 sticky hide-scrollbar z-10 overflow-x-hidden h-screen overflow-y-scroll">
        {/* Filters Component */}
        <div className="md:scrollbar col-span-1 md:sticky md:top-0 h-fit md:h-screen md:overflow-y-auto order-1">
          <Filters
            price={price}
            setPrice={setPrice}
            handlePrice={handlePrice}
            checkList={checkList}
            setCheckList={setCheckList}
          />
        </div>

        {/* Hotels List */}
        <div className="col-span-1 md:col-span-4 hide-scrollbar order-2">
          {(list.length === 0 && hotels.length === 0) ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-4">
              <img
                src="/logo.png" // Replace with your image path
                alt="No posts found"
                className="w-48 h-48 mb-4"
              />
              <h2 className="text-2xl font-semibold mb-2">No Posts Found</h2>
              <p className="text-gray-600">There are no posts to display for this query.</p>
            </div>
          ) : (
            (list.length > 0 ? list : hotels).map((e) => (
              <div key={e._id}>
                <Hotel e={e} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(ctx) {
  const res = await fetch(
    `${process.env.BASE_URL}/api/hotels?city=${ctx.query.city}`
  );
  const data = await res.json();

  return {
    props: {
      hotels: data.hotels ? data.hotels : data.allhotels,
    },
  };
}

export default Hotels;
