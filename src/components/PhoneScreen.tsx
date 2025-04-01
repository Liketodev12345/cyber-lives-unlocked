
import React from 'react';
import AppIcon from './AppIcon';
import PhoneFrame from './PhoneFrame';
import { AppInfo } from '../types';
import { Wifi, Battery, Signal } from 'lucide-react';

interface PhoneScreenProps {
  apps: AppInfo[];
  passwordManagerActive: boolean;
  animatingAppIndex: number | null;
  onAnimationComplete: () => void;
  backgroundImage?: string;
  useRealisticPhone?: boolean;
}

const PhoneScreen: React.FC<PhoneScreenProps> = ({ 
  apps, 
  passwordManagerActive, 
  animatingAppIndex, 
  onAnimationComplete,
  backgroundImage,
  useRealisticPhone = false
}) => {
  // Get current time for status bar
  const timeString = new Date().toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

  // Filter out the password safe app
  const displayApps = apps.filter(app => app.id !== 'passwordSafe');

  // Default background gradient if no image is provided
  const defaultBackground = 'linear-gradient(to bottom, rgba(26, 26, 26, 0.9), rgba(26, 26, 26, 0.95))';
  
  // Background style with image if provided
  const backgroundStyle = backgroundImage 
    ? {
        backgroundImage: `linear-gradient(to bottom, rgba(26, 26, 26, 0.4), rgba(26, 26, 26, 0.6)), url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }
    : { backgroundImage: defaultBackground };

  const phoneContent = (
    <>
      {/* Status Bar */}
      <div className="status-bar flex justify-between items-center px-5 py-1 bg-black/30 backdrop-blur-sm z-10">
        <div className="text-xs font-medium text-white">{timeString}</div>
        <div className="flex items-center gap-2">
          <Signal size={12} className="text-white" />
          <Wifi size={12} className="text-white" />
          <div className="flex items-center">
            <Battery size={14} className="text-green-500" />
            <span className="text-xs text-white ml-1">86%</span>
          </div>
        </div>
      </div>

      {/* App Grid */}
      <div className="p-5 min-h-[500px] flex flex-col" style={backgroundStyle}>
        <div className="grid grid-cols-4 gap-4 mt-8">
          {displayApps.map((app, index) => (
            <AppIcon
              key={app.id}
              app={app}
              animating={animatingAppIndex === index}
              onAnimationComplete={onAnimationComplete}
            />
          ))}
        </div>

        {/* Dock at the bottom */}
        <div className="mt-auto mb-4">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-2 mx-auto w-[90%]">
            <div className="flex justify-around">
              <AppIcon
                app={{
                  id: "phone",
                  name: "Phone",
                  icon: "📞",
                  bgColor: "#34C759",
                  textColor: "#FFFFFF",
                  status: "normal",
                  hasShield: false,
                  hackedMessage: "",
                  safeMessage: ""
                }}
                animating={false}
                onAnimationComplete={() => {}}
                isDockIcon={true}
              />
              <AppIcon
                app={{
                  id: "messages",
                  name: "Messages",
                  icon: "💬",
                  bgColor: "#5AC8FA",
                  textColor: "#FFFFFF",
                  status: "normal",
                  hasShield: false,
                  hackedMessage: "",
                  safeMessage: ""
                }}
                animating={false}
                onAnimationComplete={() => {}}
                isDockIcon={true}
              />
              <AppIcon
                app={{
                  id: "safari",
                  name: "Safari",
                  icon: "🌐",
                  bgColor: "#007AFF",
                  textColor: "#FFFFFF",
                  status: "normal",
                  hasShield: false,
                  hackedMessage: "",
                  safeMessage: ""
                }}
                animating={false}
                onAnimationComplete={() => {}}
                isDockIcon={true}
              />
              <AppIcon
                app={{
                  id: "music",
                  name: "Music",
                  icon: "🎵",
                  bgColor: "#FF2D55",
                  textColor: "#FFFFFF",
                  status: "normal",
                  hasShield: false,
                  hackedMessage: "",
                  safeMessage: ""
                }}
                animating={false}
                onAnimationComplete={() => {}}
                isDockIcon={true}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return useRealisticPhone ? (
    <PhoneFrame>{phoneContent}</PhoneFrame>
  ) : (
    <div className="phone-bezel w-[320px] sm:w-[375px] md:w-[390px] bg-app-background mx-auto">
      {phoneContent}
    </div>
  );
};

export default PhoneScreen;
