
import React from 'react';
import AppIcon from './AppIcon';
import PhoneFrame from './PhoneFrame';
import { AppInfo } from '../types';
import { Wifi, Battery } from 'lucide-react';

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

  // Find the password safe app
  const passwordSafe = apps.find(app => app.id === 'passwordSafe');
  const regularApps = apps.filter(app => app.id !== 'passwordSafe');

  // Default background gradient if no image is provided
  const defaultBackground = 'linear-gradient(to bottom, rgba(26, 26, 26, 0.9), rgba(26, 26, 26, 0.95))';
  
  // Background style with image if provided
  const backgroundStyle = backgroundImage 
    ? {
        backgroundImage: `linear-gradient(to bottom, rgba(26, 26, 26, 0.7), rgba(26, 26, 26, 0.8)), url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }
    : { backgroundImage: defaultBackground };

  const phoneContent = (
    <>
      {/* Status Bar */}
      <div className="status-bar">
        <div className="text-xs font-medium text-white">{timeString}</div>
        <div className="flex items-center gap-2">
          <Wifi size={14} className="text-white" />
          <div className="flex items-center">
            <Battery size={14} className="text-green-500" />
            <span className="text-xs text-white ml-1">80%</span>
          </div>
        </div>
      </div>

      {/* App Grid */}
      <div className="p-5 min-h-[500px]" style={backgroundStyle}>
        <div className="grid grid-cols-3 gap-2">
          {regularApps.map((app, index) => (
            <AppIcon
              key={app.id}
              app={app}
              animating={animatingAppIndex === index}
              onAnimationComplete={onAnimationComplete}
            />
          ))}
        </div>

        {/* Password Safe at bottom right */}
        {passwordSafe && (
          <div className="absolute bottom-5 right-5">
            <AppIcon
              app={passwordSafe}
              animating={false}
              onAnimationComplete={() => {}}
            />
          </div>
        )}
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
