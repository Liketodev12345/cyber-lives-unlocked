
import React from 'react';

interface PhoneFrameProps {
  children: React.ReactNode;
}

const PhoneFrame: React.FC<PhoneFrameProps> = ({ children }) => {
  return (
    <div className="relative">
      {/* This is a placeholder for a more realistic phone frame */}
      {/* You can replace this with your own JPEG design later */}
      <div className="phone-frame">
        <div className="phone-bezel-realistic">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[120px] h-[30px] bg-black rounded-b-2xl z-20"></div>
          
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
