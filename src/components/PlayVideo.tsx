"use client"

import Image from "next/image";
import React from "react";
import { useRef, useState } from "react";


const PlayVideo = () => {  
   const videoRef = useRef<HTMLVideoElement>(null);
   const [isMuted, setIsMuted] = useState(true);

   const toggleMute = () => {
       if (videoRef.current) {
           videoRef.current.muted = !videoRef.current.muted;
           setIsMuted(videoRef.current.muted);
       }
   };

   return (
      <div className="relative w-full md:w-3/4 mx-auto mb-20">
         <video
            ref={videoRef}
            className="w-full" 
            loop
            autoPlay
            muted={isMuted}
            controls={false} // Skjuler standard kontroller
         >
            <source src="/fdb-promo.mp4" type="video/mp4" />
            Din nettleser støtter ikke video-taggen.
         </video>
         <button
            onClick={toggleMute}
            className="absolute bottom-3 right-3 bg-white bg-opacity-75 rounded p-2 text-sm text-gray-700 hover:bg-opacity-100"
         >
            {isMuted ? 'Slå på lyd' : 'Slå av lyd'}
         </button>
      </div>
  );
}



export default PlayVideo;
