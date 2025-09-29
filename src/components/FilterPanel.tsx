import type { FilterOptions } from '../types';
import './FilterPanel.css';

interface FilterPanelProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
}

const FilterPanel = ({ filters, onFiltersChange }: FilterPanelProps) => {
  const handleDifficultyToggle = (value: 'Easy' | 'Medium' | 'Difficult') => {
    const newFilters = filters.difficulty.includes(value)
      ? filters.difficulty.filter(item => item !== value)
      : [...filters.difficulty, value];
    
    onFiltersChange({
      ...filters,
      difficulty: newFilters
    });
  };

  const handleLevelToggle = (value: 'A1' | 'A2' | 'B1' | 'B2') => {
    const newFilters = filters.level.includes(value)
      ? filters.level.filter(item => item !== value)
      : [...filters.level, value];
    
    onFiltersChange({
      ...filters,
      level: newFilters
    });
  };

  const handleCategoryToggle = (value: 'Phrases' | 'Education' | 'News' | 'Travel' | 'Others') => {
    const newFilters = filters.category.includes(value)
      ? filters.category.filter(item => item !== value)
      : [...filters.category, value];
    
    onFiltersChange({
      ...filters,
      category: newFilters
    });
  };

  return (
    <div className="filter-panel">
      <h3>🔍 Filter Content</h3>
      
      <div className="filter-groups">
        {/* Difficulty Filter */}
        <div className="filter-group">
          <label className="filter-label">📊 Difficulty</label>
          <div className="filter-buttons">
            {(['Easy', 'Medium', 'Difficult'] as const).map((difficulty) => (
              <button
                key={difficulty}
                className={`filter-button ${filters.difficulty.includes(difficulty) ? 'active' : ''}`}
                onClick={() => handleDifficultyToggle(difficulty)}
              >
                {difficulty}
              </button>
            ))}
          </div>
        </div>

        {/* CEFR Level Filter */}
        <div className="filter-group">
          <label className="filter-label">🎓 CEFR Level</label>
          <div className="filter-buttons">
            {(['A1', 'A2', 'B1', 'B2'] as const).map((level) => (
              <button
                key={level}
                className={`filter-button ${filters.level.includes(level) ? 'active' : ''}`}
                onClick={() => handleLevelToggle(level)}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div className="filter-group">
          <label className="filter-label">📚 Category</label>
          <div className="filter-buttons">
            {(['Phrases', 'Education', 'News', 'Travel', 'Others'] as const).map((category) => (
              <button
                key={category}
                className={`filter-button ${filters.category.includes(category) ? 'active' : ''}`}
                onClick={() => handleCategoryToggle(category)}
              >
                {category === 'Phrases' ? '💬 Phrases' :
                 category === 'Education' ? '📚 Education' :
                 category === 'News' ? '📰 News' :
                 category === 'Travel' ? '✈️ Travel' : '📌 Others'}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;