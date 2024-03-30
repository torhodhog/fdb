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
          src="/hero.png"
          alt="Hero Logo"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div
        className="relative w-full pl-0 pr-0 block lg:hidden"
        style={{ height: "100vh" }}
      >
        <Image
          src="/cellhero.png"
          alt="Hero Logo Mobile"
          layout="fill"
          objectFit="cover"
          objectPosition="top"
        />
        <Link href="/products">
          <div
            className="absolute left-1/2 transform -translate-x-1/2 z-10 bg-slate-50 rounded-md p-1"
            style={{ top: "90%" }}
          >
            <span className="text-sm font-extrabold text-pink-700 hover:text-blue-500">
              Se hele kolleksjonen
            </span>{" "}
            <span aria-hidden="true">&rarr;</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
