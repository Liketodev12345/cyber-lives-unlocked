
import React, { useState } from 'react';
import { AppInfo, AppStatus } from '../types';
import { Shield } from 'lucide-react';

interface AppIconProps {
  app: AppInfo;
  animating: boolean;
  onAnimationComplete?: () => void;
  isDockIcon?: boolean;
}

const AppIcon: React.FC<AppIconProps> = ({ app, animating, onAnimationComplete, isDockIcon = false }) => {
  const [animationComplete, setAnimationComplete] = useState(false);

  const handleAnimationEnd = () => {
    setAnimationComplete(true);
    if (onAnimationComplete) {
      onAnimationComplete();
    }
  };

  const getIconClass = () => {
    const baseClass = isDockIcon 
      ? 'app-icon w-12 h-12' 
      : 'app-icon w-16 h-16 sm:w-18 sm:h-18';
    
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
    if (app.status === 'normal' || isDockIcon) return null;
    
    const bubbleClass = app.status === 'hacked' ? 'bubble-hacked' : 'bubble-safe';
    const bubbleText = app.status === 'hacked' ? 'Hacked!' : 'Safe!';
    
    return (
      <div className={`status-bubble ${bubbleClass}`}>
        {bubbleText}
      </div>
    );
  };

  return (
    <div className={`flex flex-col items-center justify-center ${isDockIcon ? 'mx-1' : 'm-2'}`}>
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
          {app.hasShield && !isDockIcon && (
            <div className="shield-icon">
              <Shield size={12} />
            </div>
          )}
          {getStatusBubble()}
        </div>
      </div>
      {!isDockIcon && (
        <div className="app-label">
          <div>{app.name}</div>
          {app.subtitle && <div className="text-xs opacity-75">{app.subtitle}</div>}
        </div>
      )}
    </div>
  );
};

export default AppIcon;
