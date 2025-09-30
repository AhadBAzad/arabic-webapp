import { useState } from 'react';
import { Link } from 'react-router-dom';
import ControlPanel from '../components/ControlPanel';
import SentenceDisplay from '../components/SentenceDisplay';
import TTSSettings from '../components/TTSSettings';
import type { DisplayOptions, Sentence } from '../types';
import { ttsService } from '../services/ttsService';
import { 
  dailyPhrasesDatabase,
  type DailyPhrase,
  getCategories
} from './DailyPhrasesDatabase';
import './DailyPhrasesPage.css';

const DailyPhrasesPage = () => {
  // Display options state
  const [options, setOptions] = useState<DisplayOptions>({
    showHarakah: true,
    showTranslation: true,
    showTransliteration: true,
    enableTTS: true,
    ttsSpeed: 0.8,
    fontSize: 'medium'
  });

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [showTTSSettings, setShowTTSSettings] = useState(false);

  // Filter phrases based on selected criteria
  const filteredPhrases = dailyPhrasesDatabase.filter(phrase => {
    const categoryMatch = selectedCategory === 'all' || phrase.category === selectedCategory;
    const difficultyMatch = selectedDifficulty === 'all' || phrase.difficulty === selectedDifficulty;
    return categoryMatch && difficultyMatch;
  });

  // Get unique categories for filter dropdown
  const categories = ['all', ...getCategories()];

  // Convert phrase to sentence format for SentenceDisplay
  const convertPhraseToSentence = (phrase: DailyPhrase): Sentence => ({
    id: parseInt(phrase.id),
    words: phrase.words,
    translation: phrase.translation,
    transliteration: phrase.transliteration,
    difficulty: phrase.difficulty === 'easy' ? 'Easy' : phrase.difficulty === 'medium' ? 'Medium' : 'Difficult',
    level: phrase.level,
    category: 'Phrases' as const
  });

  return (
    <div className="daily-phrases-page">
      {/* Header Section */}
      <div className="page-header">
        <div className="header-content">
          <div className="breadcrumb">
            <Link to="/topics" className="breadcrumb-link">
              <span className="material-icons">topic</span>
              Topics
            </Link>
            <span className="breadcrumb-separator">
              <span className="material-icons">chevron_right</span>
            </span>
            <span className="breadcrumb-current">Daily Phrases</span>
          </div>
          
          <div className="page-title">
            <span className="material-icons page-icon">chat_bubble</span>
            <h1>Daily Arabic Phrases</h1>
          </div>
          
          <p className="page-description">
            Learn essential Arabic phrases for everyday conversations. Hover over words to see detailed 
            grammar information, roots, and meanings. Use multiple TTS voices for perfect pronunciation.
          </p>

          <div className="page-stats">
            <div className="stat">
              <span className="stat-number">{dailyPhrasesDatabase.length}</span>
              <span className="stat-label">Total Phrases</span>
            </div>
            <div className="stat">
              <span className="stat-number">{categories.length - 1}</span>
              <span className="stat-label">Categories</span>
            </div>
            <div className="stat">
              <span className="stat-number">{ttsService.getAvailableArabicVoices().length}</span>
              <span className="stat-label">TTS Voices</span>
            </div>
          </div>
        </div>
      </div>

      {/* Control Panel */}
      <ControlPanel
        options={options}
        onOptionsChange={setOptions}
      />

      {/* TTS Settings Modal */}
      {showTTSSettings && (
        <TTSSettings 
          isOpen={showTTSSettings}
          onClose={() => setShowTTSSettings(false)} 
        />
      )}

      {/* Enhanced Filters Section */}
      <div className="filters-section">
        <div className="filter-group">
          <label htmlFor="category-filter">
            <span className="material-icons">category</span>
            Category:
          </label>
          <select
            id="category-filter"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="filter-select"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="difficulty-filter">
            <span className="material-icons">tune</span>
            Difficulty:
          </label>
          <select
            id="difficulty-filter"
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Levels</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        {ttsService.isSupported() && (
          <div className="filter-group">
            <button 
              className="tts-settings-btn"
              onClick={() => setShowTTSSettings(true)}
              title="Voice & Speech Settings"
            >
              <span className="material-icons">record_voice_over</span>
              Voice Settings
            </button>
          </div>
        )}

        <div className="results-count">
          <span className="material-icons">format_list_numbered</span>
          Showing {filteredPhrases.length} of {dailyPhrasesDatabase.length} phrases
        </div>
      </div>

      {/* Phrases Display */}
      <div className="phrases-container">
        {filteredPhrases.length > 0 ? (
          filteredPhrases.map((phrase) => (
            <div key={phrase.id} className={`phrase-card difficulty-${phrase.difficulty}`}>
              <div className="phrase-header">
                <div className="phrase-meta">
                  <span className={`category-tag category-${phrase.category}`}>
                    {phrase.category.charAt(0).toUpperCase() + phrase.category.slice(1)}
                  </span>
                  <span className={`difficulty-tag difficulty-${phrase.difficulty}`}>
                    {phrase.difficulty.charAt(0).toUpperCase() + phrase.difficulty.slice(1)}
                  </span>
                  <span className={`level-tag level-${phrase.level.toLowerCase()}`}>
                    {phrase.level}
                  </span>
                </div>
              </div>

              <div className="phrase-content">
                <SentenceDisplay
                  sentence={convertPhraseToSentence(phrase)}
                  options={options}
                />
              </div>

              <div className="phrase-usage">
                <div className="usage-header">
                  <span className="material-icons">info</span>
                  <span>Usage Context</span>
                </div>
                <p className="usage-text">{phrase.usage}</p>
              </div>

              <div className="phrase-features">
                <div className="feature-highlight">
                  <span className="material-icons">touch_app</span>
                  <span>Hover over Arabic words for detailed grammar information</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            <span className="material-icons">search_off</span>
            <h3>No phrases found</h3>
            <p>Try adjusting your filters to see more results.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DailyPhrasesPage;