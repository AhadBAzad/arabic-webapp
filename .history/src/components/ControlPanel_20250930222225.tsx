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
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = (key: keyof DisplayOptions) => {
    onOptionsChange({
      ...options,
      [key]: !options[key]
    });
  };

  const handleFontSizeChange = (size: DisplayOptions['fontSize']) => {
    onOptionsChange({
      ...options,
      fontSize: size
    });
  };

  const toggleControls = [
    {
      key: 'showHarakah' as keyof DisplayOptions,
      icon: 'text_fields',
      label: 'Harakah',
      description: 'Arabic diacritics (تشكيل)',
      color: '#8b5cf6'
    },
    {
      key: 'showTransliteration' as keyof DisplayOptions,
      icon: 'translate',
      label: 'Transliteration',
      description: 'Pronunciation guide',
      color: '#06b6d4'
    },
    {
      key: 'showTranslation' as keyof DisplayOptions,
      icon: 'language',
      label: 'Translation',
      description: 'English meaning',
      color: '#10b981'
    },
    {
      key: 'enableTTS' as keyof DisplayOptions,
      icon: 'record_voice_over',
      label: 'Audio',
      description: 'Text-to-speech',
      color: '#f59e0b'
    }
  ];

  const fontSizes = [
    { value: 'small', label: 'A', icon: 'text_decrease' },
    { value: 'medium', label: 'A', icon: 'text_fields' },
    { value: 'large', label: 'A', icon: 'text_increase' },
    { value: 'extra-large', label: 'A', icon: 'format_size' }
  ];

  return (
    <div className="smart-control-panel">
      <div className="control-panel-header">
        <div className="header-content">
          <div className="header-info">
            <span className="material-icons header-icon">tune</span>
            <div>
              <h3>Reading Controls</h3>
              <p>Customize your learning experience</p>
            </div>
          </div>
          
          <div className="header-actions">
            {ttsService.isSupported() && (
              <button 
                className="smart-button voice-settings-btn"
                onClick={() => setShowTTSSettings(true)}
                title="Voice & Speech Settings"
              >
                <span className="material-icons">settings_voice</span>
                Voice Settings
              </button>
            )}
            
            <button 
              className={`smart-button expand-btn ${isExpanded ? 'expanded' : ''}`}
              onClick={() => setIsExpanded(!isExpanded)}
              title={isExpanded ? 'Collapse controls' : 'Expand controls'}
            >
              <span className="material-icons">
                {isExpanded ? 'expand_less' : 'expand_more'}
              </span>
            </button>
          </div>
        </div>
      </div>
      
      <div className={`controls-content ${isExpanded ? 'expanded' : ''}`}>
        {/* Quick Toggle Bar */}
        <div className="quick-toggles">
          {toggleControls.map((control) => (
            <div 
              key={control.key}
              className={`smart-toggle ${options[control.key] ? 'active' : ''}`}
              style={{ '--toggle-color': control.color } as React.CSSProperties}
              onClick={() => handleToggle(control.key)}
            >
              <div className="toggle-icon">
                <span className="material-icons">{control.icon}</span>
              </div>
              <div className="toggle-content">
                <span className="toggle-label">{control.label}</span>
                <span className="toggle-description">{control.description}</span>
              </div>
              <div className="toggle-switch">
                <input
                  type="checkbox"
                  checked={!!options[control.key]}
                  onChange={() => handleToggle(control.key)}
                  className="toggle-input"
                />
                <span className="toggle-slider"></span>
              </div>
            </div>
          ))}
        </div>

        {/* Font Size Controls */}
        <div className="font-size-section">
          <div className="section-header">
            <span className="material-icons">format_size</span>
            <span>Text Size</span>
          </div>
          <div className="font-size-controls">
            {fontSizes.map((size) => (
              <button
                key={size.value}
                className={`font-size-btn ${options.fontSize === size.value ? 'active' : ''}`}
                onClick={() => handleFontSizeChange(size.value as DisplayOptions['fontSize'])}
                title={`${size.value} text size`}
              >
                <span 
                  className="font-preview"
                  style={{ 
                    fontSize: size.value === 'small' ? '12px' : 
                             size.value === 'medium' ? '16px' : 
                             size.value === 'large' ? '20px' : '24px'
                  }}
                >
                  {size.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Reading Stats */}
        <div className="reading-stats">
          <div className="stat-item">
            <span className="material-icons">visibility</span>
            <div className="stat-content">
              <span className="stat-label">Active Features</span>
              <span className="stat-value">
                {toggleControls.filter(t => options[t.key]).length}/{toggleControls.length}
              </span>
            </div>
          </div>
          <div className="stat-item">
            <span className="material-icons">text_format</span>
            <div className="stat-content">
              <span className="stat-label">Text Size</span>
              <span className="stat-value">{options.fontSize}</span>
            </div>
          </div>
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