import React, { useState, useMemo } from 'react';
import type { Story } from '../types';
import { stories } from '../data';
import StoryReader from './StoryReader';
import './StoryList.css';

const StoryList: React.FC = () => {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [selectedSource, setSelectedSource] = useState<string>('all');

  // Get unique values for filters
  const levels = useMemo(() => {
    const uniqueLevels = [...new Set(stories.map(story => story.level))];
    return uniqueLevels.sort();
  }, []);

  const topics = useMemo(() => {
    const uniqueTopics = [...new Set(stories.map(story => story.topic))];
    return uniqueTopics.sort();
  }, []);

  const sources = useMemo(() => {
    const uniqueSources = [...new Set(stories.map(story => story.source))];
    return uniqueSources.sort();
  }, []);

  // Filter stories based on search and filters
  const filteredStories = useMemo(() => {
    return stories.filter(story => {
      const matchesSearch = searchTerm === '' || 
        story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        story.titleArabic.includes(searchTerm) ||
        (story.author && story.author.toLowerCase().includes(searchTerm.toLowerCase())) ||
        story.summary.english.toLowerCase().includes(searchTerm.toLowerCase()) ||
        story.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesLevel = selectedLevel === 'all' || story.level === selectedLevel;
      const matchesTopic = selectedTopic === 'all' || story.topic === selectedTopic;
      const matchesSource = selectedSource === 'all' || story.source === selectedSource;

      return matchesSearch && matchesLevel && matchesTopic && matchesSource;
    });
  }, [searchTerm, selectedLevel, selectedTopic, selectedSource]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedLevel('all');
    setSelectedTopic('all');
    setSelectedSource('all');
  };

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'A1': return '#4CAF50';
      case 'A2': return '#8BC34A';
      case 'B1': return '#FF9800';
      case 'B2': return '#FF5722';
      case 'C1': return '#9C27B0';
      case 'C2': return '#673AB7';
      default: return '#666';
    }
  };

  if (selectedStory) {
    return (
      <StoryReader 
        story={selectedStory} 
        onClose={() => setSelectedStory(null)} 
      />
    );
  }

  return (
    <div className="story-list">
      <div className="story-list-header">
        <h1>Arabic Reading Stories</h1>
        <p className="subtitle">
          Explore {stories.length} carefully curated stories from various sources to improve your Arabic reading skills
        </p>
      </div>

      {/* Search and Filters */}
      <div className="filters-section">
        <div className="search-bar">
          <span className="material-icons">search</span>
          <input
            type="text"
            placeholder="Search stories, authors, topics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button 
              className="clear-search"
              onClick={() => setSearchTerm('')}
            >
              <span className="material-icons">clear</span>
            </button>
          )}
        </div>

        <div className="filter-controls">
          <select 
            value={selectedLevel} 
            onChange={(e) => setSelectedLevel(e.target.value)}
          >
            <option value="all">All Levels</option>
            {levels.map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>

          <select 
            value={selectedTopic} 
            onChange={(e) => setSelectedTopic(e.target.value)}
          >
            <option value="all">All Topics</option>
            {topics.map(topic => (
              <option key={topic} value={topic}>{topic}</option>
            ))}
          </select>

          <select 
            value={selectedSource} 
            onChange={(e) => setSelectedSource(e.target.value)}
          >
            <option value="all">All Sources</option>
            {sources.map(source => (
              <option key={source} value={source}>{source}</option>
            ))}
          </select>

          <button className="clear-filters" onClick={clearFilters}>
            <span className="material-icons">refresh</span>
            Clear Filters
          </button>
        </div>
      </div>

      {/* Results Summary */}
      <div className="results-summary">
        <span>
          Showing {filteredStories.length} of {stories.length} stories
        </span>
      </div>

      {/* Stories Grid */}
      <div className="stories-grid">
        {filteredStories.length === 0 ? (
          <div className="no-results">
            <span className="material-icons">search_off</span>
            <h3>No stories found</h3>
            <p>Try adjusting your search terms or filters</p>
            <button onClick={clearFilters}>Clear all filters</button>
          </div>
        ) : (
          filteredStories.map(story => (
            <div 
              key={story.id} 
              className="story-card"
              onClick={() => setSelectedStory(story)}
            >
              <div className="story-card-header">
                <div 
                  className="difficulty-badge"
                  style={{ backgroundColor: getDifficultyColor(story.level) }}
                >
                  {story.level}
                </div>
                <div className="reading-time">
                  <span className="material-icons">schedule</span>
                  {story.estimatedReadingTime} min
                </div>
              </div>

              <div className="story-card-content">
                <h3 className="story-card-title-arabic">{story.titleArabic}</h3>
                <h4 className="story-card-title-english">{story.title}</h4>
                
                <div className="story-card-meta">
                  <span className="author">
                    <span className="material-icons">person</span>
                    {story.author}
                  </span>
                  <span className="source">
                    <span className="material-icons">public</span>
                    {story.source}
                  </span>
                </div>

                <p className="story-summary">{story.summary.english}</p>

                <div className="story-card-stats">
                  <span>
                    <span className="material-icons">article</span>
                    {story.sentences.length} sentences
                  </span>
                  <span>
                    <span className="material-icons">category</span>
                    {story.topic}
                  </span>
                </div>

                <div className="story-tags-preview">
                  {story.tags.slice(0, 3).map((tag, index) => (
                    <span key={index} className="tag-preview">{tag}</span>
                  ))}
                  {story.tags.length > 3 && (
                    <span className="tag-preview more">+{story.tags.length - 3}</span>
                  )}
                </div>
              </div>

              <div className="story-card-footer">
                <button className="read-story-btn">
                  <span className="material-icons">play_arrow</span>
                  Read Story
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default StoryList;