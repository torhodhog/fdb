import React from "react";
import Lottie from "react-lottie";
import animationData from "../../public/lottie/football-loader.json"; // Bruk relativ sti

const LottieAnimation: React.FC = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return <Lottie options={defaultOptions} height={800} width={400} />;
};

export default LottieAnimation;
