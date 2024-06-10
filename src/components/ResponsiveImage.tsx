// ResponsiveVideo.tsx
import { FC } from 'react';

interface ResponsiveVideoProps {
  src: string;
  alt: string;
}

const ResponsiveVideo: FC<ResponsiveVideoProps> = ({ src, alt }) => (
  <div className=" w-full h-auto z-[1]">
    <video
      src={src}
      loop
      autoPlay
      muted
      playsInline // For å forhindre autoplay-restrictions på noen mobile nettlesere
      className="w-full h-full object-cover" // Endret fra object-contain til object-cover for å fylle skjermen
    />
  </div>
);

export default ResponsiveVideo;