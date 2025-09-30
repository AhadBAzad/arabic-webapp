import { useState } from 'react';
import { Link } from 'react-router-dom';
import ControlPanel from '../components/ControlPanel';
import SentenceDisplay from '../components/SentenceDisplay';
import type { DisplayOptions, Sentence } from '../types';
import './DailyPhrasesPage.css';

interface DailyPhrase {
  id: string;
  category: string;
  arabic: string;
  transliteration: string;
  translation: string;
  usage: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

const DailyPhrasesPage = () => {
  // Display options state
  const [options, setOptions] = useState<DisplayOptions>({
    showHarakah: true,
    showTranslation: true,
    showTransliteration: true,
    enableTTS: true,
    ttsSpeed: 1.0,
    fontSize: 'medium'
  });

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  // Sample data - you can replace this with your actual phrases
  const dailyPhrases: DailyPhrase[] = [
    {
      id: '1',
      category: 'greetings',
      arabic: 'السلام عليكم ورحمة الله وبركاته',
      transliteration: 'Assalamu alaykum wa rahmatullahi wa barakatuh',
      translation: 'Peace be upon you and God\'s mercy and blessings',
      usage: 'Complete Islamic greeting used any time of day',
      difficulty: 'easy'
    },
    {
      id: '2',
      category: 'greetings',
      arabic: 'أهلاً وسهلاً',
      transliteration: 'Ahlan wa sahlan',
      translation: 'Welcome! (literally: you are among family and on easy ground)',
      usage: 'Warm welcome greeting for guests',
      difficulty: 'easy'
    },
    {
      id: '3',
      category: 'daily',
      arabic: 'كيف حالك؟',
      transliteration: 'Kayf halak?',
      translation: 'How are you?',
      usage: 'Common question to ask about someone\'s well-being',
      difficulty: 'easy'
    },
    {
      id: '4',
      category: 'daily',
      arabic: 'الحمد لله',
      transliteration: 'Alhamdulillah',
      translation: 'Praise be to God',
      usage: 'Expression of gratitude and contentment',
      difficulty: 'easy'
    },
    // Add more sample phrases here - you'll replace these with your actual content
  ];

  // Filter phrases based on selected criteria
  const filteredPhrases = dailyPhrases.filter(phrase => {
    const categoryMatch = selectedCategory === 'all' || phrase.category === selectedCategory;
    const difficultyMatch = selectedDifficulty === 'all' || phrase.difficulty === selectedDifficulty;
    return categoryMatch && difficultyMatch;
  });

  // Get unique categories for filter dropdown
  const categories = ['all', ...Array.from(new Set(dailyPhrases.map(phrase => phrase.category)))];

  // Convert phrase to sentence format for SentenceDisplay
  const convertPhraseToSentence = (phrase: DailyPhrase): Sentence => ({
    id: parseInt(phrase.id),
    words: phrase.arabic.split(' ').map((word, index) => ({
      arabic: word,
      arabicWithHarakah: word, // You can add harakah versions later
      transliteration: phrase.transliteration.split(' ')[index] || '',
      translation: phrase.translation,
      grammarType: 'compound' as const
    })),
    translation: phrase.translation,
    transliteration: phrase.transliteration,
    difficulty: 'Easy' as const,
    level: 'A1' as const,
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
            Learn essential Arabic phrases for everyday conversations. Master common expressions 
            with proper pronunciation and cultural context.
          </p>

          <div className="page-stats">
            <div className="stat">
              <span className="stat-number">{dailyPhrases.length}</span>
              <span className="stat-label">Total Phrases</span>
            </div>
            <div className="stat">
              <span className="stat-number">{categories.length - 1}</span>
              <span className="stat-label">Categories</span>
            </div>
          </div>
        </div>
      </div>

      {/* Control Panel */}
      <ControlPanel
        options={options}
        onOptionsChange={setOptions}
      />

      {/* Filters Section */}
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

        <div className="results-count">
          <span className="material-icons">format_list_numbered</span>
          Showing {filteredPhrases.length} of {dailyPhrases.length} phrases
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