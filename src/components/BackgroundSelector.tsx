
import React from 'react';

interface BackgroundOption {
  id: string;
  name: string;
  url: string;
}

interface BackgroundSelectorProps {
  options: BackgroundOption[];
  selectedBackground: string;
  onSelectBackground: (backgroundId: string) => void;
}

const BackgroundSelector: React.FC<BackgroundSelectorProps> = ({
  options,
  selectedBackground,
  onSelectBackground
}) => {
  return (
    <div className="absolute top-4 right-4 z-10">
      <select 
        className="bg-black/70 text-white border border-white/20 rounded-md py-1 px-2 text-sm"
        value={selectedBackground}
        onChange={(e) => onSelectBackground(e.target.value)}
      >
        {options.map(option => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default BackgroundSelector;
