import { useState } from 'react';
import './VocabularyPage.css';

interface VocabWord {
  id: string;
  arabic: string;
  arabicWithHarakah: string;
  transliteration: string;
  english: string;
  example: string;
  exampleWithHarakah: string;
  exampleTranslation: string;
  root: string;
  category: string;
  difficulty: number;
  dateAdded: string;
  timesReviewed: number;
  mastered: boolean;
}

const VocabularyPage = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showHarakah, setShowHarakah] = useState(false);

  // Sample vocabulary data
  const vocabulary: VocabWord[] = [
    {
      id: '1',
      arabic: 'كتاب',
      arabicWithHarakah: 'كِتَاب',
      transliteration: 'kitab',
      english: 'book',
      example: 'هذا كتاب مفيد',
      exampleWithHarakah: 'هَذَا كِتَابٌ مُفِيد',
      exampleTranslation: 'This is a useful book',
      root: 'ك-ت-ب',
      category: 'Education',
      difficulty: 2,
      dateAdded: '2024-01-15',
      timesReviewed: 5,
      mastered: true
    },
    {
      id: '2',
      arabic: 'مدرسة',
      arabicWithHarakah: 'مَدْرَسَة',
      transliteration: 'madrasa',
      english: 'school',
      example: 'ذهبت إلى المدرسة',
      exampleWithHarakah: 'ذَهَبْتُ إِلَى الْمَدْرَسَة',
      exampleTranslation: 'I went to school',
      root: 'د-ر-س',
      category: 'Education',
      difficulty: 3,
      dateAdded: '2024-01-20',
      timesReviewed: 3,
      mastered: false
    },
    {
      id: '3',
      arabic: 'تكنولوجيا',
      arabicWithHarakah: 'تِكْنُولُوجِيَا',
      transliteration: 'teknolojia',
      english: 'technology',
      example: 'التكنولوجيا مهمة',
      exampleWithHarakah: 'التِّكْنُولُوجِيَا مُهِمَّة',
      exampleTranslation: 'Technology is important',
      root: 'borrowed',
      category: 'Technology',
      difficulty: 5,
      dateAdded: '2024-01-22',
      timesReviewed: 2,
      mastered: false
    }
  ];

  const filteredVocabulary = vocabulary.filter(word => {
    const matchesFilter = 
      filter === 'all' ||
      (filter === 'mastered' && word.mastered) ||
      (filter === 'learning' && !word.mastered);
      
    const matchesSearch = 
      searchTerm === '' ||
      word.arabic.includes(searchTerm) ||
      word.english.toLowerCase().includes(searchTerm.toLowerCase()) ||
      word.transliteration.toLowerCase().includes(searchTerm.toLowerCase());
      
    return matchesFilter && matchesSearch;
  });

  const stats = {
    total: vocabulary.length,
    mastered: vocabulary.filter(w => w.mastered).length,
    learning: vocabulary.filter(w => !w.mastered).length,
    totalReviews: vocabulary.reduce((sum, w) => sum + w.timesReviewed, 0)
  };

  const playAudio = (text: string) => {
    // Placeholder for TTS functionality
    console.log('Playing audio for:', text);
  };

  return (
    <div className="vocabulary-page">
      <div className="vocabulary-header">
        <h1><span className="material-icons">bookmark</span> My Vocabulary</h1>
        <p>Track and review the Arabic words you've learned while reading</p>
      </div>

      {/* Stats Section */}
      <div className="vocab-stats">
        <div className="stat-card">
          <div className="stat-number">{stats.total}</div>
          <div className="stat-label">Total Words</div>
        </div>
        <div className="stat-card mastered">
          <div className="stat-number">{stats.mastered}</div>
          <div className="stat-label">Mastered</div>
        </div>
        <div className="stat-card learning">
          <div className="stat-number">{stats.learning}</div>
          <div className="stat-label">Learning</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.totalReviews}</div>
          <div className="stat-label">Total Reviews</div>
        </div>
      </div>

      {/* Controls */}
      <div className="vocab-controls">
        <div className="search-section">
          <input
            type="text"
            placeholder="Search vocabulary..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="toggle-section">
          <label className="toggle-label">
            <input
              type="checkbox"
              checked={showHarakah}
              onChange={(e) => setShowHarakah(e.target.checked)}
              className="toggle-checkbox"
            />
            <span className="toggle-text">
              <span className="material-icons">text_fields</span>
              Show Harakah
            </span>
          </label>
        </div>
        
        <div className="filter-section">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Words
          </button>
          <button 
            className={`filter-btn ${filter === 'learning' ? 'active' : ''}`}
            onClick={() => setFilter('learning')}
          >
            Learning
          </button>
          <button 
            className={`filter-btn ${filter === 'mastered' ? 'active' : ''}`}
            onClick={() => setFilter('mastered')}
          >
            Mastered
          </button>
        </div>
      </div>

      {/* Vocabulary List */}
      <div className="vocabulary-list">
        {filteredVocabulary.map(word => (
          <div key={word.id} className={`vocab-card ${word.mastered ? 'mastered' : 'learning'}`}>
            <div className="vocab-main">
              <div className="arabic-section">
                <span className="arabic-word">{showHarakah ? word.arabicWithHarakah : word.arabic}</span>
                <button 
                  className="audio-btn"
                  onClick={() => playAudio(word.arabic)}
                  title="Play pronunciation"
                >
                  <span className="material-icons">volume_up</span>
                </button>
              </div>
              
              <div className="translation-section">
                <div className="transliteration">{word.transliteration}</div>
                <div className="english">{word.english}</div>
              </div>
              
              <div className="meta-section">
                <span className="category">{word.category}</span>
                <span className="difficulty">Level {word.difficulty}</span>
                <span className="root">Root: {word.root}</span>
              </div>
            </div>
            
            <div className="vocab-example">
              <div className="example-arabic">{showHarakah ? word.exampleWithHarakah : word.example}</div>
              <div className="example-translation">{word.exampleTranslation}</div>
            </div>
            
            <div className="vocab-actions">
              <div className="review-info">
                <span>Reviewed {word.timesReviewed} times</span>
                <span>Added {new Date(word.dateAdded).toLocaleDateString()}</span>
              </div>
              
              <div className="action-buttons">
                <button className="btn-review">Review</button>
                <button className={`btn-master ${word.mastered ? 'mastered' : ''}`}>
                  {word.mastered ? <><span className="material-icons">check_circle</span> Mastered</> : 'Mark as Mastered'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredVocabulary.length === 0 && (
        <div className="no-words">
          <h3>No vocabulary found</h3>
          <p>Start reading stories to build your vocabulary!</p>
        </div>
      )}
    </div>
  );
};

export default VocabularyPage;