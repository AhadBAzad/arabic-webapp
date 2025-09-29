import { useState } from 'react';
import type { Word } from '../types';
import { ttsService } from '../services/ttsService';
import './WordTooltip.css';

interface WordTooltipProps {
  word: Word;
  showHarakah: boolean;
}

const WordTooltip = ({ word, showHarakah }: WordTooltipProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleSpeak = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (isSpeaking) {
      ttsService.stop();
      setIsSpeaking(false);
      return;
    }

    try {
      setIsSpeaking(true);
      const textToSpeak = showHarakah ? word.arabicWithHarakah : word.arabic;
      await ttsService.speak(textToSpeak);
    } catch (error) {
      console.warn('TTS failed:', error);
    } finally {
      setIsSpeaking(false);
    }
  };

  const getGrammarTypeColor = (type: string): string => {
    const colors = {
      noun: '#e74c3c',
      verb: '#3498db', 
      adjective: '#f39c12',
      preposition: '#9b59b6',
      particle: '#95a5a6',
      pronoun: '#27ae60',
      adverb: '#e67e22',
      conjunction: '#8e44ad',
      compound: '#34495e'
    };
    return colors[type as keyof typeof colors] || '#7f8c8d';
  };

  return (
    <span 
      className="word-tooltip-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="arabic-word">
        {showHarakah ? word.arabicWithHarakah : word.arabic}
        {ttsService.isSupported() && (
          <button 
            className={`tts-button ${isSpeaking ? 'speaking' : ''}`}
            onClick={handleSpeak}
            title={isSpeaking ? 'Stop' : 'Listen'}
            aria-label={isSpeaking ? 'Stop pronunciation' : 'Listen to pronunciation'}
          >
            {isSpeaking ? '⏸️' : '🔊'}
          </button>
        )}
      </span>
      {isHovered && (
        <div className="tooltip">
          <div className="tooltip-content">
            <div className="tooltip-header">
              <span 
                className="grammar-badge"
                style={{ backgroundColor: getGrammarTypeColor(word.grammarType) }}
              >
                {word.grammarType}
              </span>
            </div>
            
            <div className="tooltip-transliteration">{word.transliteration}</div>
            <div className="tooltip-translation">{word.translation}</div>
            
            {word.root && (
              <div className="tooltip-root">
                <div className="root-header">Root:</div>
                <div className="root-info">
                  <span className="root-arabic">{word.root}</span>
                  <span className="root-transliteration">({word.rootTransliteration})</span>
                </div>
                {word.rootMeaning && (
                  <div className="root-meaning">"{word.rootMeaning}"</div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </span>
  );
};

export default WordTooltip;