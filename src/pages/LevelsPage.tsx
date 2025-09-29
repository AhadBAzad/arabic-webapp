import { Link } from 'react-router-dom';
import './LevelsPage.css';

const LevelsPage = () => {
  const levels = [
    {
      id: 'beginner',
      name: 'Beginner',
      nameArabic: 'مبتدئ',
      icon: 'eco',
      difficulty: '1-3',
      description: 'Simple texts with basic vocabulary and short sentences',
      features: ['Basic vocabulary', 'Short sentences', 'Common topics', 'Full diacritics'],
      storyCount: 156,
      color: '#38a169',
      estimatedTime: '5-10'
    },
    {
      id: 'elementary',
      name: 'Elementary',
      nameArabic: 'ابتدائي',
      icon: 'menu_book',
      difficulty: '3-4',
      description: 'Slightly more complex texts with expanded vocabulary',
      features: ['Expanded vocabulary', 'Compound sentences', 'Cultural context', 'Most diacritics'],
      storyCount: 234,
      color: '#4299e1',
      estimatedTime: '8-15'
    },
    {
      id: 'intermediate',
      name: 'Intermediate',
      nameArabic: 'متوسط',
      icon: 'rocket_launch',
      difficulty: '5-6',
      description: 'More sophisticated content with complex grammar structures',
      features: ['Complex grammar', 'Abstract concepts', 'Longer paragraphs', 'Selective diacritics'],
      storyCount: 189,
      color: '#ed8936',
      estimatedTime: '15-25'
    },
    {
      id: 'upper-intermediate',
      name: 'Upper Intermediate',
      nameArabic: 'فوق المتوسط',
      icon: 'star',
      difficulty: '7-8',
      description: 'Advanced topics with nuanced language and cultural references',
      features: ['Nuanced language', 'Cultural references', 'Technical terms', 'Minimal diacritics'],
      storyCount: 167,
      color: '#9f7aea',
      estimatedTime: '20-35'
    },
    {
      id: 'advanced',
      name: 'Advanced',
      nameArabic: 'متقدم',
      icon: 'school',
      difficulty: '9-10',
      description: 'Classical and sophisticated modern Arabic literature',
      features: ['Classical Arabic', 'Literary devices', 'Complex topics', 'No diacritics'],
      storyCount: 145,
      color: '#e53e3e',
      estimatedTime: '30-60'
    }
  ];

  return (
    <div className="levels-page">
      <div className="levels-header">
        <div className="header-icon">
          <span className="material-icons">trending_up</span>
        </div>
        <h1>Learning Levels</h1>
        <p>Choose your Arabic proficiency level and progress at your own pace</p>
      </div>

      <div className="levels-container">
        {levels.map((level, index) => (
          <div 
            key={level.id} 
            className="level-card"
            style={{ '--level-color': level.color } as React.CSSProperties}
          >
            <div className="level-card-header">
              <div className="level-number">{index + 1}</div>
              <span className="material-icons level-icon">{level.icon}</span>
              <h3 className="level-name">{level.name}</h3>
              <p className="level-name-arabic">{level.nameArabic}</p>
              <span className="difficulty-range">Difficulty: {level.difficulty}/10</span>
            </div>
            
            <div className="level-content">
              <p className="level-description">{level.description}</p>
              
              <div className="level-features">
                <h4>What you'll learn:</h4>
                <ul>
                  {level.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </div>
              
              <div className="level-stats">
            <div className="stat">
                <span className="stat-number">{level.storyCount}</span>
                <span className="stat-label">Stories</span>
            </div>
            <div className="stat">
                <span className="stat-number">{level.estimatedTime}</span>
                <span className="stat-label">min per story</span>
            </div>
            </div>
              
              <div className="level-actions">
                <Link 
                  to={`/library?level=${level.name}`} 
                  className="btn-start"
                >
                  Start Reading
                </Link>
                <Link 
                  to={`/library?level=${level.name}`} 
                  className="btn-preview"
                >
                  Preview Stories
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LevelsPage;