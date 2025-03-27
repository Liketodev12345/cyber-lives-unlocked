
import React, { useEffect } from 'react';
import { cn } from '@/lib/utils';

interface PopUpProps {
  title?: string;
  message: string | React.ReactNode;
  buttonText: string;
  isOpen: boolean;
  onClose: () => void;
}

const PopUp: React.FC<PopUpProps> = ({ 
  title, 
  message, 
  buttonText, 
  isOpen, 
  onClose 
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="glass-darker w-full max-w-md rounded-xl overflow-hidden animate-scale-in">
        <div className="p-6">
          {title && <h3 className="text-xl font-bold mb-2">{title}</h3>}
          <div className={cn("text-sm leading-relaxed", {
            "mb-6": typeof message === 'string',
          })}>
            {message}
          </div>
          <div className="mt-4 flex justify-end">
            <button
              className="bg-white text-black font-medium py-2 px-4 rounded-md hover:bg-white/90 transition-all"
              onClick={onClose}
            >
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
