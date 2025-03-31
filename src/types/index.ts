
import React from 'react';

export type AppInfo = {
  id: string;
  name: string;
  subtitle?: string;
  icon: string;
  bgColor: string;
  textColor: string;
  status: 'normal' | 'hacked' | 'safe';
  hasShield: boolean;
  hackedMessage: string;
  safeMessage: string;
};

export type AppStatus = 'normal' | 'hacked' | 'safe';

export type SimulationState = {
  phase: 'initial' | 'attacking' | 'attacked' | 'safeModeIntro' | 'safeMode' | 'safeAttacking' | 'safeAttacked';
  currentAppIndex: number;
  passwordManagerActive: boolean;
  showPopUp: boolean;
  popUpContent: {
    title?: string;
    message: string | React.ReactNode; // Update to allow ReactNode for JSX elements
    buttonText: string;
    onClose: () => void;
  } | null;
  selectedBackgroundId?: string;
};

export type BackgroundOption = {
  id: string;
  name: string;
  url: string;
  thumbnail?: string;
};
