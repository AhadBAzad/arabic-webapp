import { useState, useEffect } from 'react';
import { ttsService } from '../services/ttsService';
import './TTSSettings.css';

interface TTSSettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

const TTSSettings = ({ isOpen, onClose }: TTSSettingsProps) => {
  const [rate, setRate] = useState(0.8);
  const [pitch, setPitch] = useState(1);
  const [volume, setVolume] = useState(1);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    if (isOpen) {
      const voices = ttsService.getAvailableArabicVoices();
      setAvailableVoices(voices);
    }
  }, [isOpen]);

  const handleTestSpeech = () => {
    ttsService.speak('مرحبا، هذا اختبار للصوت', { rate, pitch, volume });
  };

  if (!isOpen) return null;

  return (
    <div className="tts-settings-overlay" onClick={onClose}>
      <div className="tts-settings-modal" onClick={(e) => e.stopPropagation()}>
        <div className="tts-settings-header">
          <h3>🔊 Speech Settings</h3>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        
        <div className="tts-settings-content">
          {!ttsService.isSupported() && (
            <div className="warning">
              ⚠️ Text-to-Speech is not supported in your browser
            </div>
          )}
          
          {availableVoices.length === 0 && ttsService.isSupported() && (
            <div className="info">
              💡 No Arabic voices found. The browser will use the default voice.
            </div>
          )}
          
          {availableVoices.length > 0 && (
            <div className="setting-group">
              <label htmlFor="voice-select">Arabic Voice:</label>
              <select
                id="voice-select"
                onChange={(e) => ttsService.setVoice(parseInt(e.target.value))}
                className="voice-select"
              >
                {availableVoices.map((voice, index) => (
                  <option key={index} value={index}>
                    {voice.name} ({voice.lang})
                  </option>
                ))}
              </select>
            </div>
          )}
          
          {availableVoices.length > 0 && (
            <div className="voices-info">
              <strong>Available Arabic voices ({availableVoices.length}):</strong>
              <ul>
                {availableVoices.map((voice, index) => (
                  <li key={index}>
                    {voice.name} ({voice.lang})
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="setting-group">
            <label htmlFor="rate">Speech Rate: {rate.toFixed(1)}</label>
            <input
              id="rate"
              type="range"
              min="0.1"
              max="2"
              step="0.1"
              value={rate}
              onChange={(e) => setRate(parseFloat(e.target.value))}
            />
            <span className="range-labels">
              <span>Slow</span>
              <span>Fast</span>
            </span>
          </div>
          
          <div className="setting-group">
            <label htmlFor="pitch">Pitch: {pitch.toFixed(1)}</label>
            <input
              id="pitch"
              type="range"
              min="0"
              max="2"
              step="0.1"
              value={pitch}
              onChange={(e) => setPitch(parseFloat(e.target.value))}
            />
            <span className="range-labels">
              <span>Low</span>
              <span>High</span>
            </span>
          </div>
          
          <div className="setting-group">
            <label htmlFor="volume">Volume: {Math.round(volume * 100)}%</label>
            <input
              id="volume"
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
            />
            <span className="range-labels">
              <span>Quiet</span>
              <span>Loud</span>
            </span>
          </div>
          
          <div className="tts-actions">
            <button className="test-button" onClick={handleTestSpeech}>
              🎵 Test Voice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TTSSettings;