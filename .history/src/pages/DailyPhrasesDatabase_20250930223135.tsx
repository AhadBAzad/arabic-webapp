import React, { useState, useEffect } from 'react';
import './DailyPhrasesDatabase.css';

interface WordData {
  arabic: string;
  transliteration: string;
  translation: string;
  grammar?: string;
  root?: string;
  etymology?: string;
  culturalNote?: string;
}

interface DailyPhrase {
  id: number;
  category: string;
  arabic: string;
  transliteration: string;
  translation: string;
  words: WordData[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  audioUrl?: string;
}

// Sample data - you can expand this
const initialPhrases: DailyPhrase[] = [
  {
    id: 1,
    category: 'Greetings',
    arabic: 'أهلاً وسهلاً',
    transliteration: 'Ahlan wa sahlan',
    translation: 'Welcome / Hello (formal)',
    difficulty: 'beginner',
    tags: ['greeting', 'formal', 'hospitality'],
    words: [
      {
        arabic: 'أهلاً',
        transliteration: 'ahlan',
        translation: 'welcome, hello',
        grammar: 'interjection',
        root: 'أ-ه-ل',
        etymology: 'From root meaning family/people',
        culturalNote: 'Expression of hospitality'
      },
      {
        arabic: 'و',
        transliteration: 'wa',
        translation: 'and',
        grammar: 'conjunction',
        root: 'و',
        etymology: 'Basic conjunction'
      },
      {
        arabic: 'سهلاً',
        transliteration: 'sahlan',
        translation: 'easy, smooth',
        grammar: 'adverb',
        root: 'س-ه-ل',
        etymology: 'From root meaning ease/smooth',
        culturalNote: 'Implies making things easy for the guest'
      }
    ]
  },
  {
    id: 2,
    category: 'Daily Life',
    arabic: 'كيف حالك؟',
    transliteration: 'Kayf halak?',
    translation: 'How are you?',
    difficulty: 'beginner',
    tags: ['question', 'wellbeing', 'casual'],
    words: [
      {
        arabic: 'كيف',
        transliteration: 'kayf',
        translation: 'how',
        grammar: 'interrogative adverb',
        root: 'ك-ي-ف',
        etymology: 'Question word for manner/way'
      },
      {
        arabic: 'حالك',
        transliteration: 'halak',
        translation: 'your condition/state',
        grammar: 'noun + possessive pronoun',
        root: 'ح-و-ل',
        etymology: 'From root meaning condition/state',
        culturalNote: 'Common way to ask about wellbeing'
      }
    ]
  }
];

const DailyPhrasesDatabase: React.FC = () => {
  const [phrases, setPhrases] = useState<DailyPhrase[]>(initialPhrases);
  const [selectedPhrase, setSelectedPhrase] = useState<DailyPhrase | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterDifficulty, setFilterDifficulty] = useState('all');

  // Get unique categories
  const categories = Array.from(new Set(phrases.map(p => p.category)));

  // Filter phrases
  const filteredPhrases = phrases.filter(phrase => {
    const matchesSearch = phrase.arabic.includes(searchTerm) || 
                         phrase.translation.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         phrase.transliteration.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || phrase.category === filterCategory;
    const matchesDifficulty = filterDifficulty === 'all' || phrase.difficulty === filterDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const handleCreateNew = () => {
    const newPhrase: DailyPhrase = {
      id: Math.max(...phrases.map(p => p.id)) + 1,
      category: 'New Category',
      arabic: '',
      transliteration: '',
      translation: '',
      difficulty: 'beginner',
      tags: [],
      words: []
    };
    setSelectedPhrase(newPhrase);
    setIsCreating(true);
    setIsEditing(true);
  };

  const handleSave = (updatedPhrase: DailyPhrase) => {
    if (isCreating) {
      setPhrases(prev => [...prev, updatedPhrase]);
      setIsCreating(false);
    } else {
      setPhrases(prev => prev.map(p => p.id === updatedPhrase.id ? updatedPhrase : p));
    }
    setIsEditing(false);
    setSelectedPhrase(updatedPhrase);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this phrase?')) {
      setPhrases(prev => prev.filter(p => p.id !== id));
      setSelectedPhrase(null);
    }
  };

  const exportData = () => {
    const dataStr = JSON.stringify(phrases, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'daily-phrases-data.json';
    link.click();
  };

  return (
    <div className="database-container">
      <div className="database-header">
        <div className="header-content">
          <h1>
            <span className="material-icons">storage</span>
            Daily Phrases Database
          </h1>
          <p>Manage and edit your Arabic daily phrases collection</p>
        </div>
        <div className="header-actions">
          <button className="action-btn primary" onClick={handleCreateNew}>
            <span className="material-icons">add</span>
            Add New Phrase
          </button>
          <button className="action-btn secondary" onClick={exportData}>
            <span className="material-icons">download</span>
            Export Data
          </button>
        </div>
      </div>

      <div className="database-content">
        <div className="sidebar">
          <div className="filters-section">
            <h3>
              <span className="material-icons">filter_list</span>
              Filters
            </h3>
            
            <div className="filter-group">
              <label>Search</label>
              <div className="search-box">
                <span className="material-icons">search</span>
                <input
                  type="text"
                  placeholder="Search phrases..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="filter-group">
              <label>Category</label>
              <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
                <option value="all">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Difficulty</label>
              <select value={filterDifficulty} onChange={(e) => setFilterDifficulty(e.target.value)}>
                <option value="all">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>

          <div className="phrases-list">
            <h3>
              <span className="material-icons">list</span>
              Phrases ({filteredPhrases.length})
            </h3>
            
            {filteredPhrases.map(phrase => (
              <div
                key={phrase.id}
                className={`phrase-item ${selectedPhrase?.id === phrase.id ? 'selected' : ''}`}
                onClick={() => {
                  setSelectedPhrase(phrase);
                  setIsEditing(false);
                  setIsCreating(false);
                }}
              >
                <div className="phrase-preview">
                  <div className="arabic-text">{phrase.arabic}</div>
                  <div className="translation-text">{phrase.translation}</div>
                  <div className="phrase-meta">
                    <span className={`difficulty ${phrase.difficulty}`}>{phrase.difficulty}</span>
                    <span className="category">{phrase.category}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="main-content">
          {selectedPhrase ? (
            <PhraseEditor
              phrase={selectedPhrase}
              isEditing={isEditing}
              onEdit={() => setIsEditing(true)}
              onSave={handleSave}
              onCancel={() => {
                setIsEditing(false);
                if (isCreating) {
                  setSelectedPhrase(null);
                  setIsCreating(false);
                }
              }}
              onDelete={() => handleDelete(selectedPhrase.id)}
            />
          ) : (
            <div className="no-selection">
              <span className="material-icons">touch_app</span>
              <h3>Select a phrase to view details</h3>
              <p>Choose a phrase from the list or create a new one</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Phrase Editor Component
interface PhraseEditorProps {
  phrase: DailyPhrase;
  isEditing: boolean;
  onEdit: () => void;
  onSave: (phrase: DailyPhrase) => void;
  onCancel: () => void;
  onDelete: () => void;
}

const PhraseEditor: React.FC<PhraseEditorProps> = ({
  phrase,
  isEditing,
  onEdit,
  onSave,
  onCancel,
  onDelete
}) => {
  const [editedPhrase, setEditedPhrase] = useState<DailyPhrase>(phrase);

  useEffect(() => {
    setEditedPhrase(phrase);
  }, [phrase]);

  const handleSave = () => {
    onSave(editedPhrase);
  };

  const addWord = () => {
    setEditedPhrase(prev => ({
      ...prev,
      words: [...prev.words, {
        arabic: '',
        transliteration: '',
        translation: '',
        grammar: '',
        root: '',
        etymology: '',
        culturalNote: ''
      }]
    }));
  };

  const updateWord = (index: number, field: keyof WordData, value: string) => {
    setEditedPhrase(prev => ({
      ...prev,
      words: prev.words.map((word, i) => 
        i === index ? { ...word, [field]: value } : word
      )
    }));
  };

  const removeWord = (index: number) => {
    setEditedPhrase(prev => ({
      ...prev,
      words: prev.words.filter((_, i) => i !== index)
    }));
  };

  if (isEditing) {
    return (
      <div className="phrase-editor editing">
        <div className="editor-header">
          <h2>
            <span className="material-icons">edit</span>
            {phrase.id ? 'Edit Phrase' : 'Create New Phrase'}
          </h2>
          <div className="editor-actions">
            <button className="action-btn primary" onClick={handleSave}>
              <span className="material-icons">save</span>
              Save
            </button>
            <button className="action-btn secondary" onClick={onCancel}>
              <span className="material-icons">cancel</span>
              Cancel
            </button>
          </div>
        </div>

        <div className="editor-content">
          <div className="basic-info">
            <div className="form-row">
              <div className="form-group">
                <label>Arabic Text</label>
                <input
                  type="text"
                  value={editedPhrase.arabic}
                  onChange={(e) => setEditedPhrase(prev => ({ ...prev, arabic: e.target.value }))}
                  placeholder="Enter Arabic text"
                  className="arabic-input"
                />
              </div>
              <div className="form-group">
                <label>Transliteration</label>
                <input
                  type="text"
                  value={editedPhrase.transliteration}
                  onChange={(e) => setEditedPhrase(prev => ({ ...prev, transliteration: e.target.value }))}
                  placeholder="Enter transliteration"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Translation</label>
              <input
                type="text"
                value={editedPhrase.translation}
                onChange={(e) => setEditedPhrase(prev => ({ ...prev, translation: e.target.value }))}
                placeholder="Enter English translation"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Category</label>
                <input
                  type="text"
                  value={editedPhrase.category}
                  onChange={(e) => setEditedPhrase(prev => ({ ...prev, category: e.target.value }))}
                  placeholder="e.g., Greetings, Daily Life"
                />
              </div>
              <div className="form-group">
                <label>Difficulty</label>
                <select
                  value={editedPhrase.difficulty}
                  onChange={(e) => setEditedPhrase(prev => ({ ...prev, difficulty: e.target.value as any }))}
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Tags (comma-separated)</label>
              <input
                type="text"
                value={editedPhrase.tags.join(', ')}
                onChange={(e) => setEditedPhrase(prev => ({ 
                  ...prev, 
                  tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag)
                }))}
                placeholder="greeting, formal, hospitality"
              />
            </div>
          </div>

          <div className="words-section">
            <div className="section-header">
              <h3>
                <span className="material-icons">text_fields</span>
                Word-by-Word Analysis
              </h3>
              <button className="action-btn small" onClick={addWord}>
                <span className="material-icons">add</span>
                Add Word
              </button>
            </div>

            {editedPhrase.words.map((word, index) => (
              <div key={index} className="word-editor">
                <div className="word-header">
                  <h4>Word {index + 1}</h4>
                  <button 
                    className="action-btn danger small"
                    onClick={() => removeWord(index)}
                  >
                    <span className="material-icons">delete</span>
                  </button>
                </div>
                
                <div className="word-fields">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Arabic</label>
                      <input
                        type="text"
                        value={word.arabic}
                        onChange={(e) => updateWord(index, 'arabic', e.target.value)}
                        className="arabic-input"
                      />
                    </div>
                    <div className="form-group">
                      <label>Transliteration</label>
                      <input
                        type="text"
                        value={word.transliteration}
                        onChange={(e) => updateWord(index, 'transliteration', e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Translation</label>
                      <input
                        type="text"
                        value={word.translation}
                        onChange={(e) => updateWord(index, 'translation', e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label>Grammar</label>
                      <input
                        type="text"
                        value={word.grammar || ''}
                        onChange={(e) => updateWord(index, 'grammar', e.target.value)}
                        placeholder="noun, verb, adjective..."
                      />
                    </div>
                    <div className="form-group">
                      <label>Root</label>
                      <input
                        type="text"
                        value={word.root || ''}
                        onChange={(e) => updateWord(index, 'root', e.target.value)}
                        placeholder="ك-ت-ب"
                        className="arabic-input"
                      />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label>Etymology</label>
                    <input
                      type="text"
                      value={word.etymology || ''}
                      onChange={(e) => updateWord(index, 'etymology', e.target.value)}
                      placeholder="Origin and meaning of the word"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Cultural Note</label>
                    <input
                      type="text"
                      value={word.culturalNote || ''}
                      onChange={(e) => updateWord(index, 'culturalNote', e.target.value)}
                      placeholder="Cultural context or usage notes"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="phrase-editor viewing">
      <div className="editor-header">
        <h2>
          <span className="material-icons">visibility</span>
          Phrase Details
        </h2>
        <div className="editor-actions">
          <button className="action-btn primary" onClick={onEdit}>
            <span className="material-icons">edit</span>
            Edit
          </button>
          <button className="action-btn danger" onClick={onDelete}>
            <span className="material-icons">delete</span>
            Delete
          </button>
        </div>
      </div>

      <div className="phrase-display">
        <div className="phrase-main">
          <div className="arabic-text large">{phrase.arabic}</div>
          <div className="transliteration">{phrase.transliteration}</div>
          <div className="translation">{phrase.translation}</div>
          
          <div className="phrase-meta">
            <span className={`difficulty ${phrase.difficulty}`}>{phrase.difficulty}</span>
            <span className="category">{phrase.category}</span>
            <div className="tags">
              {phrase.tags.map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
          </div>
        </div>

        {phrase.words.length > 0 && (
          <div className="words-analysis">
            <h3>
              <span className="material-icons">text_fields</span>
              Word Analysis
            </h3>
            
            {phrase.words.map((word, index) => (
              <div key={index} className="word-display">
                <div className="word-main">
                  <span className="word-arabic">{word.arabic}</span>
                  <span className="word-transliteration">{word.transliteration}</span>
                  <span className="word-translation">{word.translation}</span>
                </div>
                
                {(word.grammar || word.root || word.etymology || word.culturalNote) && (
                  <div className="word-details">
                    {word.grammar && <div><strong>Grammar:</strong> {word.grammar}</div>}
                    {word.root && <div><strong>Root:</strong> {word.root}</div>}
                    {word.etymology && <div><strong>Etymology:</strong> {word.etymology}</div>}
                    {word.culturalNote && <div><strong>Cultural Note:</strong> {word.culturalNote}</div>}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DailyPhrasesDatabase;