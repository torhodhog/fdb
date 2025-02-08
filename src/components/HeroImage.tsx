const HeroImage = () => {
  return (
    <div className="relative w-auto h-auto">
      <video
        src="https://forsoker-ny-botte.s3.eu-north-1.amazonaws.com/HERO2.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-auto object-cover"
      />
    </div>
  );
};

export default HeroImage;