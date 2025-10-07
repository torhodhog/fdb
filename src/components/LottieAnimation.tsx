import React from "react";

// Lightweight CSS-only loading animation instead of heavy Lottie
const LottieAnimation: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="relative">
        {/* Football rotating animation */}
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-red-500 rounded-full animate-spin">
          <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
            <div className="w-2 h-8 bg-gray-800 rounded-full"></div>
            <div className="w-8 h-2 bg-gray-800 rounded-full absolute"></div>
          </div>
        </div>
        <p className="text-center mt-4 text-gray-600 font-medium">
          Laster drakter...
        </p>
      </div>
    </div>
  );
};

export default LottieAnimation;
