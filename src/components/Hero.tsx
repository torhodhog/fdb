import Head from 'next/head';


const Hero = () => {
   return (
      <>
         <div className="flex lg:flex-row flex-col-reverse">
            <img src="/herotest.png" alt="Hero Logo" className="w-full lg:w-1/2 h-64 lg:h-auto object-cover lg:block hidden mt-6" />
            <img src="/logo.png" alt="Hero Logo Mobile" className="absolute pl-12 pr-12 z-20 block lg:hidden" />
         </div>
      </>
   )
}

export default Hero;