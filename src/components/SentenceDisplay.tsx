import { useState } from 'react';
import WordTooltip from './WordTooltip';
import type { Sentence, DisplayOptions } from '../types';
import { ttsService } from '../services/ttsService';
import './SentenceDisplay.css';

interface SentenceDisplayProps {
  sentence: Sentence;
  options: DisplayOptions;
}

const SentenceDisplay = ({ sentence, options }: SentenceDisplayProps) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleSpeakSentence = async () => {
    if (isSpeaking) {
      ttsService.stop();
      setIsSpeaking(false);
      return;
    }

    try {
      setIsSpeaking(true);
      
      // Create the full sentence text
      const sentenceText = sentence.words
        .map(word => options.showHarakah ? word.arabicWithHarakah : word.arabic)
        .join(' ');
      
      await ttsService.speak(sentenceText);
    } catch (error) {
      console.warn('TTS failed:', error);
    } finally {
      setIsSpeaking(false);
    }
  };

  return (
    <div className="sentence-container">
      <div className="sentence-header">
        {ttsService.isSupported() && (
          <button 
            className={`sentence-tts-button ${isSpeaking ? 'speaking' : ''}`}
            onClick={handleSpeakSentence}
            title={isSpeaking ? 'Stop sentence' : 'Listen to sentence'}
            aria-label={isSpeaking ? 'Stop sentence pronunciation' : 'Listen to sentence pronunciation'}
          >
            {isSpeaking ? '⏸️' : '🔊'} {isSpeaking ? 'Stop' : 'Play Sentence'}
          </button>
        )}
      </div>
      
      <div className="arabic-sentence" dir="rtl">
        {sentence.words.map((word, index) => (
          <WordTooltip 
            key={index} 
            word={word} 
            showHarakah={options.showHarakah}
          />
        ))}
      </div>
      
      {options.showTransliteration && (
        <div className="transliteration">
          <strong>Transliteration:</strong> {sentence.transliteration}
        </div>
      )}
      
      {options.showTranslation && (
        <div className="translation">
          <strong>Translation:</strong> {sentence.translation}
        </div>
      )}
    </div>
  );
};

export default SentenceDisplay;