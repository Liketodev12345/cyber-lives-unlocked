
import React, { useState } from 'react';
import PhoneScreen from './PhoneScreen';
import PopUp from './PopUp';
import BackgroundSelector from './BackgroundSelector';
import backgroundOptions from '../data/backgroundOptions';
import { AppInfo, SimulationState, AppStatus } from '../types';

interface AttackSimulationProps {
  initialApps: AppInfo[];
}

const AttackSimulation: React.FC<AttackSimulationProps> = ({ initialApps }) => {
  // Filter out the passwordSafe app from initialApps if it exists
  const filteredInitialApps = initialApps.filter(app => app.id !== 'passwordSafe');
  
  const [apps, setApps] = useState<AppInfo[]>(filteredInitialApps);
  const [state, setState] = useState<SimulationState>({
    phase: 'initial',
    currentAppIndex: -1,
    passwordManagerActive: false,
    showPopUp: false,
    popUpContent: null,
    selectedBackgroundId: 'default',
  });
  
  // Toggle for realistic phone design
  const [useRealisticPhone, setUseRealisticPhone] = useState(true);

  // Handler for selecting a background
  const handleSelectBackground = (backgroundId: string) => {
    setState(prev => ({
      ...prev,
      selectedBackgroundId: backgroundId
    }));
  };

  // Get the current background URL
  const getCurrentBackgroundUrl = () => {
    const selected = backgroundOptions.find(bg => bg.id === state.selectedBackgroundId);
    return selected?.url || '';
  };

  const startAttack = () => {
    setState(prev => ({ ...prev, phase: 'attacking', currentAppIndex: 0 }));
  };

  const advanceAttack = () => {
    if (state.currentAppIndex < apps.length - 1) {
      setState(prev => ({ ...prev, currentAppIndex: prev.currentAppIndex + 1 }));
    } else {
      setState(prev => ({ ...prev, phase: 'attacked' }));
    }
  };

  const handleAnimationComplete = () => {
    if (state.phase === 'attacking') {
      const appIndex = state.currentAppIndex;
      const app = apps[appIndex];

      if (app) {
        // Determine if the app is hacked or safe based on password manager status
        const isHacked = !state.passwordManagerActive && !app.hasShield;
        const newStatus: AppStatus = isHacked ? 'hacked' : 'safe';
        
        const updatedApp: AppInfo = {
          ...app,
          status: newStatus,
        };

        // Update the app in the apps array
        const updatedApps = [...apps];
        updatedApps[appIndex] = updatedApp;
        setApps(updatedApps);

        // Show the pop-up message
        const message = isHacked ? app.hackedMessage : app.safeMessage;
        setState(prev => ({
          ...prev,
          phase: 'attacked',
          showPopUp: true,
          popUpContent: {
            title: isHacked ? 'Hacked' : 'Safe',
            message: message,
            buttonText: 'Continue',
            onClose: () => {
              if (state.currentAppIndex < apps.length - 1) {
                setState(prev => ({
                  ...prev,
                  showPopUp: false,
                  popUpContent: null,
                  phase: 'attacking',
                  currentAppIndex: prev.currentAppIndex + 1,
                }));
              } else {
                setState(prev => ({
                  ...prev,
                  showPopUp: false,
                  popUpContent: null,
                  phase: 'attacked',
                }));
              }
            },
          },
        }));
      }
    }
  };

  const resetSimulation = () => {
    // Ensure we explicitly type the status as 'normal'
    const resetApps = filteredInitialApps.map(app => ({ 
      ...app, 
      status: 'normal' as AppStatus 
    }));
    setApps(resetApps);
    setState({
      phase: 'initial',
      currentAppIndex: -1,
      passwordManagerActive: false,
      showPopUp: false,
      popUpContent: null,
      selectedBackgroundId: 'default',
    });
  };

  const togglePasswordManager = () => {
    setState(prev => ({ ...prev, passwordManagerActive: !prev.passwordManagerActive }));
  };

  return (
    <div className="relative flex flex-col items-center justify-center pt-8">
      <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">
        Your Phone, 2025
      </h1>
      
      <div className="flex space-x-4 mb-4">
        <button 
          onClick={() => setUseRealisticPhone(!useRealisticPhone)}
          className="bg-black/70 text-white border border-white/20 rounded-md py-1 px-2 text-sm"
        >
          {useRealisticPhone ? 'Simple Phone' : 'Realistic Phone'}
        </button>

        <BackgroundSelector 
          options={backgroundOptions}
          selectedBackground={state.selectedBackgroundId || 'default'}
          onSelectBackground={handleSelectBackground}
        />
      </div>
      
      <div className="relative">
        <PhoneScreen 
          apps={apps}
          passwordManagerActive={state.passwordManagerActive}
          animatingAppIndex={state.phase.includes('attacking') ? state.currentAppIndex : null}
          onAnimationComplete={() => handleAnimationComplete()}
          backgroundImage={getCurrentBackgroundUrl()}
          useRealisticPhone={useRealisticPhone}
        />
        
        {state.phase === 'initial' && (
          <button className="btn-attack mt-6" onClick={startAttack}>
            Start Attack
          </button>
        )}

        {state.phase === 'attacked' && (
          <div className="flex space-x-4 mt-6">
            <button className="btn-safe" onClick={togglePasswordManager}>
              {state.passwordManagerActive ? 'Disable Password Manager' : 'Enable Password Manager'}
            </button>
            <button className="btn-reset" onClick={resetSimulation}>
              Reset
            </button>
          </div>
        )}

        {state.phase === 'attacked' && state.passwordManagerActive && (
          <div className="mt-4 text-green-500 font-bold animate-pulse">
            Password Manager Active!
          </div>
        )}
      </div>
      
      {state.showPopUp && state.popUpContent && (
        <PopUp
          title={state.popUpContent.title}
          message={state.popUpContent.message}
          buttonText={state.popUpContent.buttonText}
          isOpen={state.showPopUp}
          onClose={state.popUpContent.onClose}
        />
      )}
    </div>
  );
};

export default AttackSimulation;
