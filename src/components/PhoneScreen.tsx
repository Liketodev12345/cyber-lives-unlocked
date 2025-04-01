
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
    <div className="relative">
      {/* iPhone Frame */}
      <div className="phone-frame relative w-[320px] sm:w-[375px] md:w-[390px] mx-auto bg-black rounded-[50px] p-3 shadow-xl">
        {/* iPhone Notch */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[40%] h-7 bg-black rounded-b-xl z-20"></div>
        
        {/* Side Buttons */}
        <div className="absolute -left-1 top-28 h-16 w-1 bg-gray-800 rounded-l-lg"></div> {/* Volume Up */}
        <div className="absolute -left-1 top-48 h-16 w-1 bg-gray-800 rounded-l-lg"></div> {/* Volume Down */}
        <div className="absolute -right-1 top-36 h-12 w-1 bg-gray-800 rounded-r-lg"></div> {/* Power */}
        
        {/* Phone Screen */}
        <div className="phone-screen w-full h-full bg-app-background rounded-[40px] overflow-hidden">
          {/* Blurred Nature Background */}
          <div 
            className="absolute inset-0 bg-cover bg-center blur-sm opacity-30"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1502472584811-0a2f2feb8750?q=80&w=2070&auto=format&fit=crop')`,
            }}
          ></div>
          
          {/* Status Bar with notch cutout */}
          <div className="status-bar h-12 relative z-10">
            <div className="absolute left-6 top-6">
              <div className="text-xs font-medium text-white">{timeString}</div>
            </div>
            <div className="absolute right-6 top-6 flex items-center gap-2">
              <Wifi size={14} className="text-white" />
              <div className="flex items-center">
                <Battery size={14} className="text-green-500" />
                <span className="text-xs text-white ml-1">80%</span>
              </div>
            </div>
          </div>

          {/* App Grid */}
          <div className="p-5 pt-12 min-h-[500px] relative z-10">
            <div className="grid grid-cols-4 gap-y-6 gap-x-2">
              {regularApps.map((app, index) => (
                <AppIcon
                  key={app.id}
                  app={app}
                  animating={animatingAppIndex === index}
                  onAnimationComplete={onAnimationComplete}
                />
              ))}
            </div>

            {/* iPhone Dock */}
            <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 w-[90%] h-20 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center space-x-4">
              {/* Dock apps like Phone, Safari, Messages, and Music would go here */}
              {passwordSafe && (
                <div>
                  <AppIcon
                    app={passwordSafe}
                    animating={false}
                    onAnimationComplete={() => {}}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Home Indicator (bottom bar) */}
        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1/3 h-1 bg-white rounded-full"></div>
      </div>
    </div>
  );
};

export default PhoneScreen;
