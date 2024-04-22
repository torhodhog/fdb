import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

const Hero: FC = () => {
  return (
    <div className="relative flex lg:flex-row flex-col-reverse">
      <div
        className="relative w-full lg:block hidden mt-6"
        style={{ height: "600px" }}
      >
        <Image
          src="https://forsoker-ny-botte.s3.amazonaws.com/hero.png"
          alt="Hero Logo"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div
        className="relative w-full pl-0 pr-0 block lg:hidden flex flex-col items-center"
        style={{ height: "90vh" }} // Increase the height
      >
        <Image
          src="/cellheroimage.jpg"
          alt="Hero Logo Mobile"
          layout="intrinsic"
          width={800}
          height={700}
          objectFit="cover"
          objectPosition="top"
        />
        <div className="text-center mt-4"> 
          <h3>Ditt hjem for fotballhistorie</h3>
        </div>
        <Link href="/products">
  <div
    className="absolute left-1/2 transform -translate-x-1/2 z-10 bg-slate-50 rounded-md p-1"
    style={{ bottom: "30%" }} // Adjust the position
  >
    <span className="text-sm font-extrabold text-pink-700 hover:text-blue-500">
      Se hele kolleksjonen
    </span>{" "}
    <span aria-hidden="true">&rarr;</span>
  </div>
</Link>
<Link href="/contact">
  <div
    className="absolute left-1/2 transform -translate-x-1/2 z-10 bg-slate-50 rounded-md p-1"
    style={{ bottom: "25%" }} // Adjust the position
  >
    <span className="text-sm font-extrabold text-pink-700 hover:text-blue-500">
      Kontakt
    </span>{" "}
    <span aria-hidden="true">&rarr;</span>
  </div>
</Link>
      </div>
    </div>
  );
};

export default Hero;
