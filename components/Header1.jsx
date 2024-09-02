"use client";

import Image from 'next/image';
import Block from "./Block";
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const Header1 = () => {
    const [auth, setAuth] = useState(false);
    const [profile, setProfile] = useState("");

    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    };

    useEffect(() => {
        const cookieValue = getCookie('profile');
        setProfile(cookieValue || 'Dear');

        const key = Cookies.get("user");
        if (key) {
            setAuth(true);
            return;
        }
        setAuth(false);
    }, [auth]);

    const router = useRouter();

    const handleLogout = () => {
        Cookies.remove("profile");
        Cookies.remove("user");
        setProfile("");
        setAuth(false);
        toast("Logout successfully !!!");
        router.push('/');
    };

    return (
        <div className='z-50 sticky top-0 flex justify-between bg-gradient-to-l from-gray-100 to-gray-300 items-center h-20 px-4 md:px-10'>
            <Link href={"/"} >
                <p className="text-2xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-400">
                    Urban
                    <span className="text-2xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-400">Osis</span>
                </p>
            </Link>

            <div className='flex h-full items-center space-x-2 md:space-x-8'>
                
                <Link href={"/property"}>
                    <Block title={`Add property`} para={"Start with UrbanOsis"} titleClass="text-lg md:text-xl" />
                </Link>
                <div className="flex items-center p-2 md:p-3">
                    {
                        auth ? (
                            <p onClick={handleLogout} className='cursor-pointer'>
                                <Block title={`Logout`} para={profile} titleClass="text-lg md:text-xl" />
                            </p>
                        ) : (
                            <Link href={"/login"}>
                                <Block title={`Login`} para={"Sign-up"} titleClass="text-lg md:text-xl" />
                            </Link>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default Header1;
