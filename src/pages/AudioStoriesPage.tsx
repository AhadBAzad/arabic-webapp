import { useState } from 'react';
import './AudioStoriesPage.css';

interface AudioStory {
  id: string;
  title: string;
  titleArabic: string;
  narrator: string;
  duration: string;
  topic: string;
  level: string;
  description: string;
  thumbnail: string;
  audioUrl: string;
  transcript: boolean;
  downloads: number;
  rating: number;
}

const AudioStoriesPage = () => {
  const [filter, setFilter] = useState({ topic: '', level: '' });
  const [currentPlaying, setCurrentPlaying] = useState<string | null>(null);

  const audioStories: AudioStory[] = [
    {
      id: '1',
      title: 'The Merchant and the Parrot',
      titleArabic: 'التاجر والببغاء',
      narrator: 'Ahmed Al-Mansouri',
      duration: '12:30',
      topic: 'Literature',
      level: 'Intermediate',
      description: 'A classic tale from One Thousand and One Nights',
      thumbnail: 'pets',
      audioUrl: '/audio/merchant-parrot.mp3',
      transcript: true,
      downloads: 1523,
      rating: 4.8
    },
    {
      id: '2',
      title: 'Climate Change in Arabia',
      titleArabic: 'تغير المناخ في جزيرة العرب',
      narrator: 'Fatima Al-Zahra',
      duration: '18:45',
      topic: 'Science',
      level: 'Advanced',
      description: 'Scientific discussion about environmental changes',
      thumbnail: 'public',
      audioUrl: '/audio/climate-change.mp3',
      transcript: true,
      downloads: 987,
      rating: 4.6
    },
    {
      id: '3',
      title: 'The Little Prince in Arabic',
      titleArabic: 'الأمير الصغير',
      narrator: 'Omar Khalil',
      duration: '25:20',
      topic: 'Literature',
      level: 'Beginner',
      description: 'The beloved story translated to Arabic',
      thumbnail: 'person',
      audioUrl: '/audio/little-prince.mp3',
      transcript: true,
      downloads: 2156,
      rating: 4.9
    },
    {
      id: '4',
      title: 'Modern Poetry Recitation',
      titleArabic: 'إلقاء الشعر الحديث',
      narrator: 'Layla Hassan',
      duration: '15:10',
      topic: 'Poetry',
      level: 'Intermediate',
      description: 'Beautiful recitation of contemporary Arabic poetry',
      thumbnail: 'theater_comedy',
      audioUrl: '/audio/modern-poetry.mp3',
      transcript: false,
      downloads: 756,
      rating: 4.7
    }
  ];

  const filteredStories = audioStories.filter(story => {
    const matchesTopic = !filter.topic || story.topic === filter.topic;
    const matchesLevel = !filter.level || story.level === filter.level;
    return matchesTopic && matchesLevel;
  });

  const topics = ['Literature', 'Science', 'Poetry', 'News', 'History'];
  const levels = ['Beginner', 'Intermediate', 'Advanced'];

  const playAudio = (storyId: string) => {
    if (currentPlaying === storyId) {
      setCurrentPlaying(null);
    } else {
      setCurrentPlaying(storyId);
    }
  };

  const getRatingStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    return '★'.repeat(fullStars) + (hasHalfStar ? '½' : '') + '☆'.repeat(5 - Math.ceil(rating));
  };

  return (
    <div className="audio-stories-page">
      <div className="audio-header">
        <h1><span className="material-icons">headphones</span> Audio Stories</h1>
        <p>Listen to professionally narrated Arabic stories with adjustable playback speed</p>
      </div>

      {/* Controls */}
      <div className="audio-controls">
        <div className="filter-section">
          <select
            value={filter.topic}
            onChange={(e) => setFilter(prev => ({ ...prev, topic: e.target.value }))}
            className="filter-select"
          >
            <option value="">All Topics</option>
            {topics.map(topic => (
              <option key={topic} value={topic}>{topic}</option>
            ))}
          </select>

          <select
            value={filter.level}
            onChange={(e) => setFilter(prev => ({ ...prev, level: e.target.value }))}
            className="filter-select"
          >
            <option value="">All Levels</option>
            {levels.map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>

          <button 
            onClick={() => setFilter({ topic: '', level: '' })}
            className="clear-btn"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Audio Stories Grid */}
      <div className="audio-stories-grid">
        {filteredStories.map(story => (
          <div key={story.id} className="audio-story-card">
            <div className="story-thumbnail">
              <span className="material-icons thumbnail-icon">{story.thumbnail}</span>
              <div className="duration-badge">{story.duration}</div>
            </div>
            
            <div className="story-content">
              <h3 className="story-title">{story.title}</h3>
              <p className="story-title-arabic">{story.titleArabic}</p>
              <p className="narrator">Narrated by {story.narrator}</p>
              <p className="story-description">{story.description}</p>
              
              <div className="story-meta">
                <span className={`level-badge ${story.level.toLowerCase()}`}>
                  {story.level}
                </span>
                <span className="topic-badge">{story.topic}</span>
                {story.transcript && (
                  <span className="transcript-badge"><span className="material-icons">description</span> Transcript</span>
                )}
              </div>
              
              <div className="story-stats">
                <div className="rating">
                  <span className="stars">{getRatingStars(story.rating)}</span>
                  <span className="rating-number">({story.rating})</span>
                </div>
                <div className="downloads">
                  <span className="material-icons">download</span> {story.downloads.toLocaleString()}
                </div>
              </div>
            </div>
            
            <div className="audio-player">
              <button 
                className={`play-btn ${currentPlaying === story.id ? 'playing' : ''}`}
                onClick={() => playAudio(story.id)}
              >
                <span className="material-icons">
                  {currentPlaying === story.id ? 'pause' : 'play_arrow'}
                </span>
              </button>
              
              <div className="player-controls">
                <div className="progress-bar">
                  <div className="progress" style={{ width: '30%' }}></div>
                </div>
                <div className="time-display">
                  {currentPlaying === story.id ? '3:45' : '0:00'} / {story.duration}
                </div>
              </div>
              
              <div className="player-actions">
                <button className="speed-btn" title="Playback Speed">
                  1x
                </button>
                <button className="download-btn" title="Download">
                  📥
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Features Section */}
      <div className="features-section">
        <h2>Audio Learning Features</h2>
        <div className="features-grid">
          <div className="feature">
            <span className="feature-icon">🎤</span>
            <h3>Professional Narration</h3>
            <p>Native speakers with clear pronunciation and proper intonation</p>
          </div>
          <div className="feature">
            <span className="feature-icon">⏱️</span>
            <h3>Adjustable Speed</h3>
            <p>Control playback speed from 0.5x to 2x for comfortable listening</p>
          </div>
          <div className="feature">
            <span className="feature-icon">📝</span>
            <h3>Interactive Transcripts</h3>
            <p>Follow along with synchronized text highlighting</p>
          </div>
          <div className="feature">
            <span className="feature-icon">📥</span>
            <h3>Offline Download</h3>
            <p>Download stories for offline listening anywhere</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioStoriesPage;