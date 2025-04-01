
import React from 'react';
import AppIcon from './AppIcon';
import { AppInfo } from '../types';
import { Wifi, Battery } from 'lucide-react';

interface PhoneScreenProps {
  apps: AppInfo[];
  passwordManagerActive: boolean;
  animatingAppIndex: number | null;
  onAnimationComplete: () => void;
}

const PhoneScreen: React.FC<PhoneScreenProps> = ({ 
  apps, 
  passwordManagerActive, 
  animatingAppIndex, 
  onAnimationComplete 
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

  return (
    <div className="phone-bezel w-[320px] sm:w-[375px] md:w-[390px] bg-app-background mx-auto">
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
      <div className="p-5 min-h-[500px]" style={{
        backgroundImage: 'linear-gradient(to bottom, rgba(26, 26, 26, 0.9), rgba(26, 26, 26, 0.95))',
      }}>
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
    </div>
  );
};

export default PhoneScreen;
