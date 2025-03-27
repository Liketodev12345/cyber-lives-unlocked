
import React from 'react';
import AttackSimulation from '@/components/AttackSimulation';
import { AppInfo } from '@/types';

const Index = () => {
  // Initial app data
  const initialApps: AppInfo[] = [
    {
      id: 'onlyfans',
      name: 'OnlyFans',
      icon: 'OF',
      bgColor: '#000000',
      textColor: '#FFFFFF',
      status: 'normal',
      hasShield: false,
      hackedMessage: "OnlyFans: $200 stolen from subscribers. Pics leaked on X with your name.",
      safeMessage: "OnlyFans: Unique password stopped the hack—your $200 and pics are safe."
    },
    {
      id: 'venmo',
      name: 'Venmo',
      icon: 'V',
      bgColor: '#3D95CE',
      textColor: '#FFFFFF',
      status: 'normal',
      hasShield: false,
      hackedMessage: "Venmo: $300 for groceries gone. Linked via your email.",
      safeMessage: "Venmo: New password blocked access—$300 secure."
    },
    {
      id: 'googleDrive',
      name: 'Google Drive',
      subtitle: '(Class Notes)',
      icon: '△',
      bgColor: '#FFFFFF',
      textColor: '#000000',
      status: 'normal',
      hasShield: false,
      hackedMessage: "Google Drive: Bio midterm notes posted public. You fail the class.",
      safeMessage: "Google Drive: Password safe—notes stay private."
    },
    {
      id: 'imessage',
      name: 'iMessage',
      subtitle: '(Party Plans)',
      icon: '💬',
      bgColor: '#34C759',
      textColor: '#FFFFFF',
      status: 'normal',
      hasShield: false,
      hackedMessage: "iMessage: Texts and pix about last night's hookup sent to all contacts.",
      safeMessage: "iMessage: Hack failed—hookup and party plans stay secret."
    },
    {
      id: 'ring',
      name: 'Ring',
      subtitle: '(Home Security)',
      icon: 'R',
      bgColor: '#003087',
      textColor: '#FFFFFF',
      status: 'normal',
      hasShield: false,
      hackedMessage: "Ring: Front door cam disabled. Intruders enter your apartment.",
      safeMessage: "Ring: New password blocked access—front door cam secure."
    },
    {
      id: 'airdroid',
      name: 'AirDroid',
      subtitle: '(Room Cam)',
      icon: '📹',
      bgColor: '#26A69A',
      textColor: '#FFFFFF',
      status: 'normal',
      hasShield: false,
      hackedMessage: "AirDroid: Room cam footage of you studying in your underwear leaked online.",
      safeMessage: "AirDroid: Password safe—room cam footage stays private."
    },
    {
      id: 'tesla',
      name: 'Tesla App',
      subtitle: '(Car Control)',
      icon: 'T',
      bgColor: '#000000',
      textColor: '#FFFFFF',
      status: 'normal',
      hasShield: false,
      hackedMessage: "Tesla App: Car unlocked remotely. Stolen from the dorm parking lot.",
      safeMessage: "Tesla App: Hack failed—car stays locked in the lot."
    },
    {
      id: 'passwordSafe',
      name: 'Password Safe',
      icon: '🔒',
      bgColor: '#C0C0C0',
      textColor: '#FFFFFF',
      status: 'normal',
      hasShield: false,
      hackedMessage: "",
      safeMessage: ""
    }
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black py-12 px-4">
      <div className="w-full max-w-4xl">
        <AttackSimulation initialApps={initialApps} />
        
        <div className="mt-12 text-gray-400 text-center text-sm">
          <p>© 2025 UCLA Cybersecurity Education. This simulation demonstrates the dangers of password reuse.</p>
          <p className="mt-2">
            Download a password manager today: 1Password, Bitwarden, or LastPass.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
