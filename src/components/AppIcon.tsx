
import React, { useState } from 'react';
import { AppInfo, AppStatus } from '../types';
import { Shield } from 'lucide-react';

interface AppIconProps {
  app: AppInfo;
  animating: boolean;
  onAnimationComplete?: () => void;
}

const AppIcon: React.FC<AppIconProps> = ({ app, animating, onAnimationComplete }) => {
  const [animationComplete, setAnimationComplete] = useState(false);

  const handleAnimationEnd = () => {
    setAnimationComplete(true);
    if (onAnimationComplete) {
      onAnimationComplete();
    }
  };

  const getIconClass = () => {
    const baseClass = 'app-icon w-14 h-14 sm:w-16 sm:h-16';
    if (animating && !animationComplete) {
      return `${baseClass} animate-shake`;
    }
    return baseClass;
  };

  const getOverlayClass = () => {
    if (app.status === 'hacked') {
      return 'absolute inset-0 bg-hacked/50 z-10';
    }
    return '';
  };

  const getStatusBubble = () => {
    if (app.status === 'normal') return null;
    
    const bubbleClass = app.status === 'hacked' ? 'bubble-hacked' : 'bubble-safe';
    const bubbleText = app.status === 'hacked' ? 'Hacked!' : 'Safe!';
    
    return (
      <div className={`status-bubble ${bubbleClass}`}>
        {bubbleText}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center m-1">
      <div className="relative">
        <div 
          className={getIconClass()} 
          style={{ backgroundColor: app.bgColor }} 
          onAnimationEnd={handleAnimationEnd}
        >
          <div className={getOverlayClass()}></div>
          <span className="relative z-20 text-xl font-bold" style={{ color: app.textColor }}>
            {app.icon}
          </span>
          {app.hasShield && (
            <div className="shield-icon">
              <Shield size={12} />
            </div>
          )}
          {getStatusBubble()}
        </div>
      </div>
      <div className="app-label">
        <div className="text-xs">{app.name}</div>
        {app.subtitle && <div className="text-[10px] opacity-75">{app.subtitle}</div>}
      </div>
    </div>
  );
};

export default AppIcon;
