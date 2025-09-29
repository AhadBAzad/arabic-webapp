import React, { useState, useCallback, useEffect } from 'react';
import type { Story, DisplayOptions } from '../types';
import { ttsService } from '../services/ttsService';
import './StoryReader.css';

interface StoryReaderProps {
  story: Story;
  onClose: () => void;
}

const StoryReader: React.FC<StoryReaderProps> = ({ story, onClose }) => {
  const [displayOptions, setDisplayOptions] = useState<DisplayOptions>({
    showHarakah: true,
    showTranslation: true,
    showTransliteration: false,
    enableTTS: true,
    ttsSpeed: 0.8,
    fontSize: 'medium'
  });

  const [currentSentenceIndex, setCurrentSentenceIndex] = useState<number>(-1);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleHarakah = useCallback(() => {
    setDisplayOptions(prev => ({ ...prev, showHarakah: !prev.showHarakah }));
  }, []);

  const toggleTranslation = useCallback(() => {
    setDisplayOptions(prev => ({ ...prev, showTranslation: !prev.showTranslation }));
  }, []);

  const toggleTransliteration = useCallback(() => {
    setDisplayOptions(prev => ({ ...prev, showTransliteration: !prev.showTransliteration }));
  }, []);

  const changeFontSize = useCallback((size: 'small' | 'medium' | 'large' | 'extra-large') => {
    setDisplayOptions(prev => ({ ...prev, fontSize: size }));
  }, []);

  const changeTTSSpeed = useCallback((speed: number) => {
    setDisplayOptions(prev => ({ ...prev, ttsSpeed: speed }));
  }, []);

  const speakSentence = useCallback(async (sentenceIndex: number) => {
    if (!displayOptions.enableTTS || sentenceIndex >= story.sentences.length) return;

    const sentence = story.sentences[sentenceIndex];
    const arabicText = displayOptions.showHarakah 
      ? sentence.words.map(w => w.arabicWithHarakah).join(' ')
      : sentence.words.map(w => w.arabic).join(' ');

    try {
      setCurrentSentenceIndex(sentenceIndex);
      setIsPlaying(true);
      await ttsService.speak(arabicText, { 
        rate: displayOptions.ttsSpeed,
        lang: 'ar-SA'
      });
    } catch (error) {
      console.error('TTS Error:', error);
    } finally {
      setIsPlaying(false);
      setCurrentSentenceIndex(-1);
    }
  }, [story.sentences, displayOptions.enableTTS, displayOptions.showHarakah, displayOptions.ttsSpeed]);

  const playStory = useCallback(async () => {
    if (isPlaying) {
      ttsService.stop();
      setIsPlaying(false);
      setCurrentSentenceIndex(-1);
      return;
    }

    setIsPlaying(true);
    
    try {
      for (let i = 0; i < story.sentences.length; i++) {
        if (!isPlaying) break; // Check if user stopped
        
        await speakSentence(i);
        
        // Small pause between sentences
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    } catch (error) {
      console.error('Story playback error:', error);
    } finally {
      setIsPlaying(false);
      setCurrentSentenceIndex(-1);
    }
  }, [story.sentences.length, isPlaying, speakSentence]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      ttsService.stop();
    };
  }, []);

  const getFontSizeClass = () => {
    switch (displayOptions.fontSize) {
      case 'small': return 'text-sm';
      case 'large': return 'text-lg';
      case 'extra-large': return 'text-xl';
      default: return 'text-base';
    }
  };

  return (
    <div className="story-reader">
      {/* Header */}
      <div className="story-header">
        <button className="close-btn" onClick={onClose} aria-label="Close story">
          <span className="material-icons">close</span>
        </button>
        <div className="story-title-section">
          <h1 className="story-title">{story.titleArabic}</h1>
          <h2 className="story-title-english">{story.title}</h2>
          <div className="story-meta">
            <span className="author">{story.author}</span>
            <span className="source">{story.source}</span>
            <span className="level">{story.level}</span>
            <span className="topic">{story.topic}</span>
            <span className="reading-time">{story.estimatedReadingTime} min read</span>
          </div>
        </div>
      </div>

      {/* Control Panel */}
      <div className="control-panel">
        <div className="toggle-controls">
          <button 
            className={`toggle-btn ${displayOptions.showHarakah ? 'active' : ''}`}
            onClick={toggleHarakah}
          >
            <span className="material-icons">text_fields</span>
            Harakah
          </button>
          
          <button 
            className={`toggle-btn ${displayOptions.showTransliteration ? 'active' : ''}`}
            onClick={toggleTransliteration}
          >
            <span className="material-icons">translate</span>
            Transliteration
          </button>
          
          <button 
            className={`toggle-btn ${displayOptions.showTranslation ? 'active' : ''}`}
            onClick={toggleTranslation}
          >
            <span className="material-icons">language</span>
            Translation
          </button>
        </div>

        <div className="audio-controls">
          <button 
            className={`audio-btn ${isPlaying ? 'playing' : ''}`}
            onClick={playStory}
            disabled={!ttsService.isSupported()}
          >
            <span className="material-icons">
              {isPlaying ? 'stop' : 'play_arrow'}
            </span>
            {isPlaying ? 'Stop' : 'Play Story'}
          </button>

          <div className="speed-control">
            <label>Speed:</label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={displayOptions.ttsSpeed}
              onChange={(e) => changeTTSSpeed(parseFloat(e.target.value))}
            />
            <span>{displayOptions.ttsSpeed}x</span>
          </div>
        </div>

        <div className="font-controls">
          <label>Font Size:</label>
          <select 
            value={displayOptions.fontSize} 
            onChange={(e) => changeFontSize(e.target.value as any)}
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
            <option value="extra-large">Extra Large</option>
          </select>
        </div>
      </div>

      {/* Story Summary */}
      <div className="story-summary">
        <h3>Summary</h3>
        <div className="summary-content">
          <p className="summary-arabic">{story.summary.arabic}</p>
          {displayOptions.showTranslation && (
            <p className="summary-english">{story.summary.english}</p>
          )}
        </div>
      </div>

      {/* Story Content */}
      <div className={`story-content ${getFontSizeClass()}`}>
        {story.sentences.map((sentence, index) => (
          <div 
            key={sentence.id} 
            className={`sentence ${currentSentenceIndex === index ? 'current-sentence' : ''}`}
          >
            <div className="sentence-number">{index + 1}</div>
            
            <div className="sentence-content">
              {/* Arabic Text */}
              <div className="arabic-text" dir="rtl">
                {sentence.words.map((word, wordIndex) => (
                  <span 
                    key={wordIndex} 
                    className="word"
                    onClick={() => speakSentence(index)}
                  >
                    {displayOptions.showHarakah ? word.arabicWithHarakah : word.arabic}
                  </span>
                ))}
                <button 
                  className="sentence-audio-btn"
                  onClick={() => speakSentence(index)}
                  disabled={!ttsService.isSupported()}
                  aria-label="Play sentence"
                >
                  <span className="material-icons">volume_up</span>
                </button>
              </div>

              {/* Transliteration */}
              {displayOptions.showTransliteration && (
                <div className="transliteration-text">
                  {sentence.transliteration}
                </div>
              )}

              {/* Translation */}
              {displayOptions.showTranslation && (
                <div className="translation-text">
                  {sentence.translation}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Story Tags */}
      <div className="story-tags">
        <h4>Tags:</h4>
        <div className="tags-list">
          {story.tags.map((tag, index) => (
            <span key={index} className="tag">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StoryReader;