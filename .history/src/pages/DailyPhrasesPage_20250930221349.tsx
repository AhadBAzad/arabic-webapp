import { useState } from 'react';
import { Link } from 'react-router-dom';
import ControlPanel from '../components/ControlPanel';
import SentenceDisplay from '../components/SentenceDisplay';
import TTSSettings from '../components/TTSSettings';
import type { DisplayOptions, Sentence, Word } from '../types';
import { ttsService } from '../services/ttsService';
import './DailyPhrasesPage.css';

interface DailyPhrase {
  id: string;
  category: string;
  words: Word[];
  translation: string;
  transliteration: string;
  usage: string;
  difficulty: 'easy' | 'medium' | 'hard';
  level: 'A1' | 'A2' | 'B1' | 'B2';
}

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

  // Enhanced sample data with word-level details for hover tooltips
  const dailyPhrases: DailyPhrase[] = [
    {
      id: '1',
      category: 'greetings',
      words: [
        {
          arabic: 'السلام',
          arabicWithHarakah: 'السَّلامُ',
          transliteration: 'as-salamu',
          translation: 'peace',
          grammarType: 'noun',
          root: 'س ل م',
          rootTransliteration: 's-l-m',
          rootMeaning: 'safety, peace, security'
        },
        {
          arabic: 'عليكم',
          arabicWithHarakah: 'عَلَيْكُمْ',
          transliteration: 'alaykum',
          translation: 'upon you',
          grammarType: 'preposition',
          root: 'ع ل ي',
          rootTransliteration: '3-l-y',
          rootMeaning: 'to be high, elevated'
        },
        {
          arabic: 'ورحمة',
          arabicWithHarakah: 'وَرَحْمَةُ',
          transliteration: 'wa rahmatu',
          translation: 'and mercy',
          grammarType: 'noun',
          root: 'ر ح م',
          rootTransliteration: 'r-ḥ-m',
          rootMeaning: 'mercy, compassion'
        },
        {
          arabic: 'الله',
          arabicWithHarakah: 'اللهِ',
          transliteration: 'Allah',
          translation: 'God',
          grammarType: 'noun',
          root: 'ا ل ه',
          rootTransliteration: 'ʾ-l-h',
          rootMeaning: 'God, deity'
        },
        {
          arabic: 'وبركاته',
          arabicWithHarakah: 'وَبَرَكاتُهُ',
          transliteration: 'wa barakatuh',
          translation: 'and His blessings',
          grammarType: 'noun',
          root: 'ب ر ك',
          rootTransliteration: 'b-r-k',
          rootMeaning: 'blessing, prosperity'
        }
      ],
      translation: 'Peace be upon you and God\'s mercy and blessings',
      transliteration: 'Assalamu alaykum wa rahmatullahi wa barakatuh',
      usage: 'Complete Islamic greeting used any time of day',
      difficulty: 'easy',
      level: 'A1'
    },
    {
      id: '2',
      category: 'greetings',
      words: [
        {
          arabic: 'أهلاً',
          arabicWithHarakah: 'أَهْلاً',
          transliteration: 'ahlan',
          translation: 'family/welcome',
          grammarType: 'noun',
          root: 'ا ه ل',
          rootTransliteration: 'ʾ-h-l',
          rootMeaning: 'family, people, worthy'
        },
        {
          arabic: 'وسهلاً',
          arabicWithHarakah: 'وَسَهْلاً',
          transliteration: 'wa sahlan',
          translation: 'and easy path',
          grammarType: 'adjective',
          root: 'س ه ل',
          rootTransliteration: 's-h-l',
          rootMeaning: 'easy, smooth, level'
        }
      ],
      translation: 'Welcome! (literally: you are among family and on easy ground)',
      transliteration: 'Ahlan wa sahlan',
      usage: 'Warm welcome greeting for guests',
      difficulty: 'easy',
      level: 'A1'
    },
    {
      id: '3',
      category: 'daily',
      words: [
        {
          arabic: 'كيف',
          arabicWithHarakah: 'كَيْفَ',
          transliteration: 'kayf',
          translation: 'how',
          grammarType: 'adverb',
          root: 'ك ي ف',
          rootTransliteration: 'k-y-f',
          rootMeaning: 'manner, way, how'
        },
        {
          arabic: 'حالك؟',
          arabicWithHarakah: 'حالُكَ؟',
          transliteration: 'halak?',
          translation: 'your condition',
          grammarType: 'noun',
          root: 'ح و ل',
          rootTransliteration: 'ḥ-w-l',
          rootMeaning: 'state, condition, circumstance'
        }
      ],
      translation: 'How are you?',
      transliteration: 'Kayf halak?',
      usage: 'Common question to ask about someone\'s well-being',
      difficulty: 'easy',
      level: 'A1'
    },
    {
      id: '4',
      category: 'daily',
      words: [
        {
          arabic: 'الحمد',
          arabicWithHarakah: 'الْحَمْدُ',
          transliteration: 'alhamdu',
          translation: 'praise',
          grammarType: 'noun',
          root: 'ح م د',
          rootTransliteration: 'ḥ-m-d',
          rootMeaning: 'praise, commendation'
        },
        {
          arabic: 'لله',
          arabicWithHarakah: 'لِلّهِ',
          transliteration: 'lillah',
          translation: 'to God',
          grammarType: 'preposition',
          root: 'ا ل ه',
          rootTransliteration: 'ʾ-l-h',
          rootMeaning: 'God, deity'
        }
      ],
      translation: 'Praise be to God',
      transliteration: 'Alhamdulillah',
      usage: 'Expression of gratitude and contentment',
      difficulty: 'easy',
      level: 'A1'
    },
    {
      id: '5',
      category: 'polite',
      words: [
        {
          arabic: 'من',
          arabicWithHarakah: 'مِنْ',
          transliteration: 'min',
          translation: 'from',
          grammarType: 'preposition',
          root: 'م ن',
          rootTransliteration: 'm-n',
          rootMeaning: 'from, of, some'
        },
        {
          arabic: 'فضلك',
          arabicWithHarakah: 'فَضْلِكَ',
          transliteration: 'fadlik',
          translation: 'your favor',
          grammarType: 'noun',
          root: 'ف ض ل',
          rootTransliteration: 'f-ḍ-l',
          rootMeaning: 'favor, grace, virtue'
        }
      ],
      translation: 'Please (literally: from your favor)',
      transliteration: 'Min fadlik',
      usage: 'Polite way to make a request',
      difficulty: 'easy',
      level: 'A1'
    },
    {
      id: '6',
      category: 'polite',
      words: [
        {
          arabic: 'شكراً',
          arabicWithHarakah: 'شُكْراً',
          transliteration: 'shukran',
          translation: 'thanks',
          grammarType: 'noun',
          root: 'ش ك ر',
          rootTransliteration: 'sh-k-r',
          rootMeaning: 'gratitude, thanks'
        },
        {
          arabic: 'جزيلاً',
          arabicWithHarakah: 'جَزِيلاً',
          transliteration: 'jazilan',
          translation: 'abundant',
          grammarType: 'adjective',
          root: 'ج ز ل',
          rootTransliteration: 'j-z-l',
          rootMeaning: 'abundant, plentiful'
        }
      ],
      translation: 'Thank you very much',
      transliteration: 'Shukran jazilan',
      usage: 'Expressing deep gratitude',
      difficulty: 'easy',
      level: 'A1'
    }
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