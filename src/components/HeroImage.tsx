import Image from 'next/image';

const HeroImage = () => {
  return (
    <div className="relative w-auto h-auto">
      <Image
        src="https://forsoker-ny-botte.s3.eu-north-1.amazonaws.com/herojul1-Photoroom.png"
        alt="Hero Background"
        width={1920}
        height={500}
        priority
        className=""
      />
    </div>
  );
};

export default HeroImage;
