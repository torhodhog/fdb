"use client";

import { FC, useRef, useState, useEffect } from "react";
import Image from "next/image";

const Hero: FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const toggleMute = () => {
    if (videoRef.current) {
      const currentMutedState = videoRef.current.muted;
      videoRef.current.muted = !currentMutedState;
      setIsMuted(!currentMutedState);
      console.log('Muted:', !currentMutedState);
    }
  };

  return (
    <div className="relative z-[-10] flex lg:flex-row flex-col-reverse lg:h-auto h-[40vh]">
      {/* Desktop View with Video */}
      <div className="relative w-full lg:block hidden mt-6" style={{ height: "600px" }}>
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover cursor-pointer"
          src="https://forsoker-ny-botte.s3.eu-north-1.amazonaws.com/herovideo.mp4"
          autoPlay
          loop
          muted={isMuted}
          controls={false}
          onClick={toggleMute} // Legg til en klikkhendelse for å slå lyd av/på
        />
        <button
          onClick={toggleMute}
          className="absolute bottom-3 right-3 bg-white bg-opacity-75 rounded p-2 text-sm text-gray-700 hover:bg-opacity-100"
        >
          {isMuted ? 'Slå på lyd' : 'Slå av lyd'}
        </button>
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="w-80 h-80 rounded-full overflow-hidden spin" style={{ margin: 0, padding: 0 }}>
            {/* Her kan du legge til eventuelle andre bilder eller innhold */}
          </div>
        </div>
      </div>

      {/* Mobile View with Image */}
      <div
        className="relative w-full pl-0 pr-0 block lg:hidden flex flex-col items-center"
        style={{ height: "90vh" }}
      >
        <div className="relative z-10 flex flex-col items-center w-full h-full">
          <Image
            src="https://forsoker-ny-botte.s3.eu-north-1.amazonaws.com/herotv.jpg"
            alt="Hero Logo"
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;