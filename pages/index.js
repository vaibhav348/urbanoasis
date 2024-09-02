import Header1 from '../components/Header1.jsx'
import Header2 from '@/components/Header2.jsx'
import Header3 from '@/components/Header3.jsx'
import Image from 'next/image.js'
import Head from 'next/head.js'
import Header4 from '@/components/Header4.jsx'
import Footer from '@/components/Footer.jsx'

const Home = () => {
  
  return (
    <div className='overflow-hidden'>
      <Head>
      <title>UrbanOasis : Indias bast Online Hotel Booking Site For Sanitized Stay</title>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
      </Head>
      <Header1/>
      <Header2/>
      <Header3/>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-10 m-4 md:m-10 lg:m-20">
  <div className="relative overflow-hidden group">
    <img 
      src={"/Designer.png"} 
      alt="Image 1" 
      className="w-full h-auto rounded-md transform transition-transform duration-500 ease-in-out group-hover:scale-110 group-hover:blur-sm"
    />
    <div className="absolute inset-0 flex items-center  justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black bg-opacity-50 rounded-md">
      <p className="text-white  md:text-xs text-xl   ">"Experience luxury like never before."</p>
    </div>
  </div>
  <div className="relative overflow-hidden group">
    <img 
      src={"/Designer1.png"} 
      alt="Image 2" 
      className="w-full h-auto rounded-md transform transition-transform duration-500 ease-in-out group-hover:scale-110 group-hover:blur-sm"
    />
    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black bg-opacity-50 rounded-md">
      <p className="text-white md:text-xs text-xl">"Where comfort meets elegance."</p>
    </div>
  </div>
  <div className="relative overflow-hidden group">
    <img 
      src={"/Designer2.png"} 
      alt="Image 3" 
      className="w-full h-auto rounded-md transform transition-transform duration-500 ease-in-out group-hover:scale-110 group-hover:blur-sm"
    />
    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black bg-opacity-50 rounded-md">
      <p className="text-white md:text-xs text-xl">"Your home away from home."</p>
    </div>
  </div>
  <div className="relative overflow-hidden group">
    <img 
      src={"/Designer3.png"} 
      alt="Image 4" 
      className="w-full h-auto rounded-md transform transition-transform duration-500 ease-in-out group-hover:scale-110 group-hover:blur-sm"
    />
    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black bg-opacity-50 rounded-md">
      <p className="text-white md:text-xs text-xl">"Indulge in exquisite hospitality."</p>
    </div>
  </div>
</div>


<div className="mx-4 md:mx-10 lg:mx-20">
  <div className="my-6 md:my-8 lg:my-10">
    <Image 
      src={"/banner1.avif"}  
      alt='banner1' 
      width={200} 
      height={200} 
      className='h-auto md:h-auto w-full bg-cover rounded-md'
    />
  </div>
  <div className="mb-8 md:mb-10 lg:mb-14">
    <Image 
      src={"/banner2.avif"}  
      alt='banner2' 
      width={200} 
      height={200} 
      className='h-30 md:h-auto w-full bg-cover rounded-md'
    />
  </div>
</div>

       
    </div>
  )
}

export default Home