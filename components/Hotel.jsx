import Image from "next/image"
import Link from "next/link"

const Hotel = ({ e }) => {
  var discountedPrice = Math.floor(e?.price - ((e?.price * e?.discount) / 100))
  return (
    <div className=" block md:flex justify-center items-center rounded-md bg-gray-200 p-4  m-2">

      <img className="h-auto  md:h-full w-full md:w-[40%] object-cover my-auto rounded-md   " src={e?.banner} alt="image description"></img>

      <div className="px-0 md:px-5" >
        <h2 className="font-semibold pt-2 md:pt-0 text-xl line-clamp-1" >
          {e?.name}
        </h2>
        <p className="text-zinc-800 line-clamp-1">
          {e?.location}
        </p>
        <p className="text-justify line-clamp-3 text-zinc-600 text-sm" >
          {e?.description}
        </p>
        <div className=" my-2 ">
          {/* <h2 className="font-bold text-md " >
            Facilities
          </h2> */}


          <ul className="flex items-center" >

            {
              e ?
                e.facilities?.map((ele) => {
                  return (
                    <li key={ele.name} className="text-zinc-600 flex items-center mr-4 ">
                      <span>
                        <Image src={ele.img} width={200} height={200} className="text-zinc-600 w-4 h-4 rounded-full" />
                      </span>

                      {/* <p className=" text-md ml-2">
                          {ele.name}
                        </p> */}
                    </li>


                  )
                })
                : ""
            }
          </ul>
        </div> 
          <h2 className="font-bold flex justify-left items-center text-xl">&#8377;{discountedPrice}  <span className="line-through pl-2 text-gray-600 font-medium text-sm">  &#8377; {e?.price}</span> <span className="pl-2 font-medium text-orange-500 text-sm">{e?.discount}% off</span>
          </h2> 
        <Link href={`/hotels/${e?._id}`} className="text-xl font-bold  ">
          <button className="
          bg-blue-500 text-white font-semibold text-sm py-1.5 px-3 rounded-lg border border-blue-700 shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transform hover:scale-105 transition-transform duration-300 ease-in-out
                    
                        cursor-pointer my-2
          
           " >View Details</button>

        </Link>
      </div>

    </div>
  )
}

export default Hotel