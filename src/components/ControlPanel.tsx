import { useState } from 'react';
import type { DisplayOptions } from '../types';
import TTSSettings from './TTSSettings';
import { ttsService } from '../services/ttsService';
import './ControlPanel.css';

interface ControlPanelProps {
  options: DisplayOptions;
  onOptionsChange: (options: DisplayOptions) => void;
}

const ControlPanel = ({ options, onOptionsChange }: ControlPanelProps) => {
  const [showTTSSettings, setShowTTSSettings] = useState(false);

  const handleToggle = (key: keyof DisplayOptions) => {
    onOptionsChange({
      ...options,
      [key]: !options[key]
    });
  };

  return (
    <div className="control-panel">
      <div className="control-panel-header">
        <h3>Reading Options</h3>
        {ttsService.isSupported() && (
          <button 
            className="tts-settings-button"
            onClick={() => setShowTTSSettings(true)}
            title="Speech Settings"
          >
            ⚙️ 🔊
          </button>
        )}
      </div>
      
      <div className="controls">
        <div className="control-item">
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={options.showHarakah}
              onChange={() => handleToggle('showHarakah')}
            />
            <span className="slider"></span>
          </label>
          <span className="control-label">Show Harakah (دiacritics)</span>
        </div>
        
        <div className="control-item">
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={options.showTransliteration}
              onChange={() => handleToggle('showTransliteration')}
            />
            <span className="slider"></span>
          </label>
          <span className="control-label">Show Transliteration</span>
        </div>
        
        <div className="control-item">
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={options.showTranslation}
              onChange={() => handleToggle('showTranslation')}
            />
            <span className="slider"></span>
          </label>
          <span className="control-label">Show Translation</span>
        </div>
      </div>
      
      <TTSSettings 
        isOpen={showTTSSettings} 
        onClose={() => setShowTTSSettings(false)} 
      />
    </div>
  );
};

export default ControlPanel;