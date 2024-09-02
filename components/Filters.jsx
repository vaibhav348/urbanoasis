"use client"

import axios from "axios"
import { useEffect, useState } from "react"

const Filters = ({ price, setPrice, handlePrice, checkList, setCheckList}) => {
    const [list , setList] = useState([])

    const fatchFacilities = async ()=>{
        try {
            const {data} = await axios.get("/api/facilities")
            if(data ?.facilities){
                setList(data.facilities);
            }
        } catch (error) {
            console.log(err)
        }
    }

    const handleCheckList=(e)=>{
        let newList = [];
        if(e.target.checked){
            newList.push(e.target.value);
            setCheckList(newList)
        return;
        }
        newList = newList.filter((i)=>i !== e.target.value )
        setCheckList(newList);
    }    

    useEffect(()=>{
        fatchFacilities();
    },[])

    return (
        <>
            <div className="border-r-2 border-gray-200   px-4 pt-4 pb-2  md:mb-6  bg-gray-200 m-2 rounded-md ">
                
               
               
                <p htmlFor="price" className="text-sx mr-3 py-2  font-bold text-gray-800">
                    Price 
                </p>
                <div className="flex ">

                <input type="range" name="price" id="price" min={500}
                    max={5000} defaultValue={price ? price : 0} onChange={(e)=>setPrice(e.target.value)}
                    />
                <span className="ml-2">&#8377; {price ? price : ""} </span>
                </div>
                
                    <button className="
                    bg-blue-600 text-white font-semibold py-1 px-4 rounded-md transition duration-300 ease-in-out hover:bg-blue-400 hover:text-black
                    
                        cursor-pointer my-2" onClick={handlePrice}>
                        Search
                    </button>
                
 


                <p htmlFor="price" className="text-sx mr-3 my-1  text-gray-800 font-bold">
                Amenities 
                </p>
                <div className=" flex flex-wrap gap-4 md:block">

                   {
                    list.map((e)=>{
                        return(
                            <p  key={e} className=" w-40 flex-item md:flex   md:align-middle  h-auto md:justify-start  md:my-2 md:items-center  " >
                        
                       
                        <input 
                        type="checkbox" 
                        name="checkbox" 
                        id="checkbox" 
                        className="w-3 h-3    " 
                        value={e} 
                        onChange={handleCheckList}
                        />
                        <label htmlFor="checkbox " className="text-gray-600 text-base md:text-sm font-normal  px-2">{e}</label>
                    </p>
                        )
                    })
                   }
                   
                </div>

            </div>

        </>
    )
}

export default Filters