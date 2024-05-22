import { FC, useEffect, useRef, useState } from "react";

const HeroVideo: FC = () => {
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
    <div className="relative w-full lg:block hidden mt-6" style={{ height: "600px" }}>
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover cursor-pointer"
        autoPlay
        loop
        muted={isMuted}
        controls={false}
        onClick={toggleMute}
      >
        <source src="https://forsoker-ny-botte.s3.eu-north-1.amazonaws.com/herovideo.mp4" type="video/mp4" />
      </video>
      <button
        onClick={toggleMute}
        className="absolute bottom-3 right-3 bg-white bg-opacity-75 rounded p-2 text-sm text-gray-700 hover:bg-opacity-100 z-10"
      >
        {isMuted ? 'Slå på lyd' : 'Slå av lyd'}
      </button>
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="w-80 h-80 rounded-full overflow-hidden spin" style={{ margin: 0, padding: 0 }}>
          {/* Her kan du legge til eventuelle andre bilder eller innhold */}
        </div>
      </div>
    </div>
  );
};

export default HeroVideo;