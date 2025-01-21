import Image from 'next/image';

const HeroImage = () => {
  return (
    <div className="relative w-auto h-auto">
      <Image
        src="/HERO1.png"
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
