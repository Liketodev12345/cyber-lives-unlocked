
import React, { useState, useEffect, useCallback } from 'react';
import { AppInfo, SimulationState } from '../types';
import PhoneScreen from './PhoneScreen';
import PopUp from './PopUp';

interface AttackSimulationProps {
  initialApps: AppInfo[];
}

const AttackSimulation: React.FC<AttackSimulationProps> = ({ initialApps }) => {
  const [apps, setApps] = useState<AppInfo[]>(initialApps);
  const [simulation, setSimulation] = useState<SimulationState>({
    phase: 'initial',
    currentAppIndex: -1,
    passwordManagerActive: false,
    showPopUp: false,
    popUpContent: null,
  });
  const [statusMessage, setStatusMessage] = useState<string>("");

  // Helper function to play sound (simulated for now)
  const playSound = (type: 'alert' | 'shield') => {
    console.log(`Playing ${type} sound`);
    // In a real implementation, we would play an actual sound here
  };

  // Reset the simulation to initial state
  const resetSimulation = useCallback(() => {
    setApps(initialApps);
    setSimulation({
      phase: 'initial',
      currentAppIndex: -1,
      passwordManagerActive: false,
      showPopUp: false,
      popUpContent: null,
    });
    setStatusMessage("");
  }, [initialApps]);

  // Handle the credential stuffing attack
  const handleAttack = useCallback(() => {
    if (
      simulation.phase !== 'initial' && 
      simulation.phase !== 'safeMode' && 
      simulation.phase !== 'safeAttacked'
    ) return;

    const phase = simulation.passwordManagerActive ? 'safeAttacking' : 'attacking';
    
    setSimulation(prev => ({
      ...prev,
      phase,
      currentAppIndex: -1,
      showPopUp: true,
      popUpContent: {
        message: "You reused 'DormLife123' on all your apps. Hackers got it from the 2024 NPD breach…",
        buttonText: "Continue",
        onClose: () => {
          setSimulation(prevSim => ({
            ...prevSim,
            showPopUp: false,
            currentAppIndex: 0,
          }));
        }
      }
    }));
  }, [simulation.passwordManagerActive, simulation.phase]);

  // Handle activating the password manager
  const handleActivatePasswordManager = useCallback(() => {
    if (simulation.phase !== 'attacked') return;

    // First, show that the password manager is being activated
    setSimulation(prev => ({
      ...prev,
      phase: 'safeModeIntro',
      passwordManagerActive: true,
      showPopUp: true,
      popUpContent: {
        title: "Password Safe Activated!",
        message: (
          <div className="space-y-3">
            <p className="text-blue-400 font-medium">Unique passwords generated for each app:</p>
            <div className="bg-gray-800 p-3 rounded text-xs font-mono overflow-x-auto">
              <p>OnlyFans: x7K#9p$2m!</p>
              <p>Venmo: qW3@rT5^uY</p>
              <p>Drive: 8jL&vN2#kP</p>
              <p>iMessage: mP9$xZ4@wQ</p>
              <p>Ring: zX5#kL9@vR</p>
              <p>AirDroid: pQ2$wM7#jN</p>
              <p>Tesla: tY8#hR4@kF</p>
            </div>
            <p className="text-sm italic mt-2">No more reused passwords—hackers can't get in.</p>
          </div>
        ),
        buttonText: "Continue",
        onClose: () => {
          // Apply shields to all apps
          setApps(prevApps => 
            prevApps.map(app => 
              app.id !== 'passwordSafe' 
                ? { ...app, hasShield: true, status: 'normal' } 
                : app
            )
          );
          
          // Update the password manager icon to show it's active
          setApps(prevApps => 
            prevApps.map(app => 
              app.id === 'passwordSafe' 
                ? { ...app, bgColor: '#C0C0C0', textColor: '#00FF00' } 
                : app
            )
          );
          
          setStatusMessage("Password Safe activated! Unique passwords generated for each app.");
          setSimulation(prevSim => ({
            ...prevSim,
            phase: 'safeMode',
            showPopUp: false,
          }));
        }
      }
    }));
  }, [simulation.phase]);

  // Handle the next app in the attack sequence
  useEffect(() => {
    if (
      (simulation.phase === 'attacking' || simulation.phase === 'safeAttacking') && 
      simulation.currentAppIndex >= 0 && 
      simulation.currentAppIndex < 7
    ) {
      const regularApps = apps.filter(app => app.id !== 'passwordSafe');
      const currentApp = regularApps[simulation.currentAppIndex];
      
      if (!currentApp) return;
      
      // Play sound effect
      playSound(simulation.phase === 'attacking' ? 'alert' : 'shield');
      
      // Update app status based on whether password manager is active
      const newStatus = simulation.phase === 'attacking' ? 'hacked' : 'safe';
      
      setTimeout(() => {
        // Update the app status
        setApps(prevApps => 
          prevApps.map(app => 
            app.id === currentApp.id 
              ? { ...app, status: newStatus } 
              : app
          )
        );
        
        // Show status message for the current app
        setStatusMessage(
          simulation.phase === 'attacking' 
            ? currentApp.hackedMessage 
            : currentApp.safeMessage
        );
        
      }, 500); // Delay to allow animation to complete
    }
  }, [simulation.phase, simulation.currentAppIndex, apps]);

  // Handle animation complete
  const handleAnimationComplete = useCallback(() => {
    if (
      (simulation.phase === 'attacking' || simulation.phase === 'safeAttacking') && 
      simulation.currentAppIndex >= 0
    ) {
      const regularApps = apps.filter(app => app.id !== 'passwordSafe');
      
      if (simulation.currentAppIndex < regularApps.length - 1) {
        // Move to next app
        setTimeout(() => {
          setSimulation(prev => ({
            ...prev,
            currentAppIndex: prev.currentAppIndex + 1,
          }));
        }, 1000); // Delay between apps
      } else {
        // All apps processed, update phase
        setTimeout(() => {
          const newPhase = simulation.phase === 'attacking' ? 'attacked' : 'safeAttacked';
          
          setSimulation(prev => ({
            ...prev,
            phase: newPhase,
            currentAppIndex: -1,
          }));
          
          // Show final summary message
          if (newPhase === 'attacked') {
            setStatusMessage("One reused password, and your cash, grades, rep, home, privacy, and car are gone.");
          } else {
            setStatusMessage("Password Safe stopped the hack—unique passwords saved you!");
          }
        }, 1000);
      }
    }
  }, [simulation.phase, simulation.currentAppIndex, apps]);

  // Get action buttons based on current phase
  const getActionButtons = () => {
    switch (simulation.phase) {
      case 'initial':
        return (
          <button className="btn-attack" onClick={handleAttack}>
            Credential Stuffing Attack
          </button>
        );
      case 'attacked':
        return (
          <div className="flex flex-wrap gap-4">
            <button className="btn-safe" onClick={handleActivatePasswordManager}>
              Use Password Safe
            </button>
            <button className="btn-reset" onClick={resetSimulation}>
              Reset
            </button>
          </div>
        );
      case 'safeMode':
        return (
          <div className="flex flex-wrap gap-4">
            <button className="btn-attack" onClick={handleAttack}>
              Credential Stuffing Attack
            </button>
            <button className="btn-reset" onClick={resetSimulation}>
              Reset
            </button>
          </div>
        );
      case 'safeAttacked':
        return (
          <button className="btn-reset" onClick={resetSimulation}>
            Reset
          </button>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-white text-center">
        Your Phone, 2025
      </h1>

      <PhoneScreen
        apps={apps}
        passwordManagerActive={simulation.passwordManagerActive}
        animatingAppIndex={simulation.phase === 'attacking' || simulation.phase === 'safeAttacking' ? simulation.currentAppIndex : null}
        onAnimationComplete={handleAnimationComplete}
      />

      {/* Status Message */}
      {statusMessage && (
        <div className={`mt-6 mb-6 text-center max-w-md ${
          simulation.phase === 'attacked' 
            ? 'text-red-400'
            : simulation.phase === 'safeAttacked' || simulation.phase === 'safeMode' 
            ? 'text-blue-400'
            : 'text-white'
        }`}>
          <p className="text-lg">{statusMessage}</p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="mt-2 flex flex-wrap justify-center gap-4">
        {getActionButtons()}
      </div>

      {/* Pop-up Dialog */}
      {simulation.showPopUp && simulation.popUpContent && (
        <PopUp
          title={simulation.popUpContent.title}
          message={simulation.popUpContent.message}
          buttonText={simulation.popUpContent.buttonText}
          isOpen={simulation.showPopUp}
          onClose={simulation.popUpContent.onClose}
        />
      )}
    </div>
  );
};

export default AttackSimulation;
