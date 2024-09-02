"use client"

import Head from "next/head"
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import Cookies from "js-cookie"
import { useRouter } from "next/router"
import Header1 from "@/components/Header1"
import MyContext from "@/context/MyContext"
import { toast } from "react-toastify"


const Login = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [login, setLogin] = useState(false)


    const router = useRouter()

    const handleSingUp = async () => {
        try {
            const res = await axios.post(`/api/user/register`,
                {
                    name, email, password
                })
            if (res?.data) {
                Cookies.set("user", res.data.token, { expires: 7 })
                Cookies.set("profile", name, { expires: 7 })

                toast(res.data.msg)
                router.back()
            }
        } catch (error) {
            console.log(error)
        }
    }


    const handleLogin = async () => {
        try {
            const res = await axios.post(`/api/user/login`,
                {
                    email, password
                })
            if (res?.data) {
                Cookies.set("user", res.data.token, { expires: 7 })
                Cookies.set("profile", res.data.username, { expires: 7 })




                toast(res.data.msg)
                router.back()
            }
        } catch (error) {
            console.log(error)
        }
    }


    const handleToggle = () => {
        setLogin(!login);
    }



    return (
        <div>
            <Head>
                <title>UrbanOasis : Login!</title>
            </Head>
            <Header1 />
            <div className="flex    justify-center items-center relative    ">



                <div className="flex flex-col  pb-10 m-[10vw] md:m-[2vw]  md:max-w-lg border bg-gradient-to-r from-gray-200 to-gray-400 rounded-lg ">
                    <p className="py-2 md:py-2 flex items-center  px-4 text-lg md:text-sm font-bold text-white bg-gradient-to-r from-blue-400 to bg-red-300 rounded-b-lg">Unique Stays, Impeccable Service, Timeless Elegance.
                    </p>
                    <div className="px-10 ">
                        <h3 className="text-3xl font-bold my-5">Login / Signup</h3>
                        <p className="font-bold text-sm mb-1 ">Please enter your Email to continue</p>

                        {
                            login ? ("")
                                :
                                (
                                    <input type="text"
                                        placeholder="Enter your Name..."
                                        className="outline-none border-black px-3 my-3 py-1 w-full h-10  "
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                )
                        }

                        <input type="email" placeholder="Enter your email..." className="outline-none border-black px-3 my-3 py-1 w-full h-10 "
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <input type="password" placeholder="Enter your password..."
                            className="outline-none border-black  px-3 my-3 py-1 w-full h-10"
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <button
                            type="submit"
                            className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            onClick={login ? handleLogin : handleSingUp}
                        >
                            {
                                login ? "Login" : "Sign up"
                            }
                        </button>

                        <p className="my-3 text-xl">

                            <span>
                                {
                                    login ? "Don't have an account" : "Alredy have an account ?"
                                }
                            </span>

                            <span className="ml-1    text-blue-700 pb-1 hover:cursor-pointer"
                                onClick={handleToggle}>
                                {
                                    login ? "SignUp" : "Login"
                                }
                            </span>

                        </p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Login