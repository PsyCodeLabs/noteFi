import Image from 'next/image'
import React from 'react'
import hero from "@/public/hero.svg"
import svg from "@/public/blurry-gradient-haikei.svg";
import Link from 'next/link';
function HeroSection() {
  return (
    <div
      className="bg-no-repeat bg-cover min-h-screen"
      style={{
        backgroundImage: `url(${svg.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <section className="py-20">  {/* Changed background color to dark */}
      <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-white"><span className='text-emerald-600'>noteFi,</span>Truly Decentralized Options on Canto</h1>  {/* Changed text color to white */}
          <p className="max-w-2xl mb-6 font-light text-gray-400 lg:mb-8 md:text-lg lg:text-xl">Empowering Financial Freedom through Decentralized Options Trading</p>  {/* Changed text color to light gray */}
          <Link href="/buy" className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:ring-emerald-300 dark:focus:ring-emerald-900">
            Buy an Option
            <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
          </Link>
          <Link href="/write" className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-200 border border-gray-600 rounded-lg hover:bg-gray-700 focus:ring-4 focus:ring-gray-700 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
            Write an Option
          </Link> 
        </div>
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
          <Image src={hero} className='' alt="mockup" />  {/* Make sure to update the image src */}
        </div>                
      </div>
    </section>
    </div>
  )
}

export default HeroSection