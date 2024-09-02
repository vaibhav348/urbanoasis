"use client";

import Link from "next/link";

const Header2 = () => {
    const List = [
        { name: "Bangalore" },
        { name: "Mumbai" },
        { name: "Jaipur" },
        { name: "Lucknow" },
        { name: "Pune" },
        { name: "Delhi" },
        { name: "Kolkata" },
        { name: "Hyderabad" },
        { name: "Ahmedabad" }
    ];

    return (
        <div className='flex flex-wrap px-4 py-1 bg-gray-100 justify-center sm:justify-between'>
            {List.map((e) => (
                <Link
                    href={`/hotels?city=${e.name}`}
                    key={e.name}
                    className="bg-gray-300/50 m-1 sm:ml-2 uppercase text-black font-medium text-sm py-1 px-4 rounded-md hover:bg-gray-500/30 transition duration-300"
                >
                    {e.name}
                </Link>
            ))}
        </div>
    );
};

export default Header2;
