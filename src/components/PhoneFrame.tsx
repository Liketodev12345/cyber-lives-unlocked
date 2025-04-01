
import React from 'react';

interface PhoneFrameProps {
  children: React.ReactNode;
}

const PhoneFrame: React.FC<PhoneFrameProps> = ({ children }) => {
  return (
    <div className="relative">
      <div className="phone-frame relative w-[320px] sm:w-[375px] md:w-[390px]">
        {/* Phone bezel */}
        <div className="phone-bezel-realistic bg-black border-[14px] border-black rounded-[40px] overflow-hidden shadow-xl">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[120px] h-[30px] bg-black rounded-b-2xl z-20 flex items-center justify-center">
            <div className="w-[8px] h-[8px] bg-gray-600 rounded-full mr-2"></div>
            <div className="w-[12px] h-[12px] bg-gray-600 rounded-full"></div>
          </div>
          
          {/* Side volume buttons */}
          <div className="absolute -left-[17px] top-32 w-[3px] h-12 bg-gray-800 rounded-l-lg"></div>
          <div className="absolute -left-[17px] top-48 w-[3px] h-8 bg-gray-800 rounded-l-lg"></div>
          
          {/* Power button */}
          <div className="absolute -right-[17px] top-36 w-[3px] h-14 bg-gray-800 rounded-r-lg"></div>
          
          {/* Screen Content */}
          <div className="relative z-10 overflow-hidden">
            {children}
          </div>
          
          {/* Home Bar */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-[120px] h-[5px] bg-white/30 rounded-full z-20"></div>
        </div>
      </div>
    </div>
  );
};

export default PhoneFrame;
