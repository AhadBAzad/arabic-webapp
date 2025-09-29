import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const islamicQuotes = [
    {
      arabic: "وَقُل رَّبِّ زِدْنِي عِلْمًا",
      transliteration: "Wa qul rabbi zidni 'ilman",
      translation: "And say: My Lord, increase me in knowledge",
      source: "Quran 20:114"
    },
    {
      arabic: "اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ",
      transliteration: "Iqra' bismi rabbika allathi khalaq",
      translation: "Read in the name of your Lord who created",
      source: "Quran 96:1"
    },
    {
      arabic: "طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ",
      transliteration: "Talab al-'ilm faridatun 'ala kulli muslim",
      translation: "Seeking knowledge is an obligation upon every Muslim",
      source: "Hadith - Ibn Majah"
    }
  ];

  const currentQuote = islamicQuotes[Math.floor(Math.random() * islamicQuotes.length)];

  const features = [
    {
      icon: 'library_books',
      title: 'Curated Library',
      description: 'Authentic Arabic texts from classical to contemporary sources',
      link: '/library'
    },
    {
      icon: 'headphones',
      title: 'Audio Learning',
      description: 'Professional narration with adjustable playback speed',
      link: '/audio-stories'
    },
    {
      icon: 'trending_up',
      title: 'Progressive Levels',
      description: 'Structured learning path from beginner to advanced',
      link: '/levels'
    },
    {
      icon: 'analytics',
      title: 'Track Progress',
      description: 'Detailed insights into your learning journey',
      link: '/progress'
    }
  ];

  const stats = [
    { number: '1,500+', label: 'Stories & Articles', icon: 'article' },
    { number: '10,000+', label: 'Vocabulary Words', icon: 'translate' },
    { number: '8', label: 'Difficulty Levels', icon: 'stairs' },
    { number: '15+', label: 'Topic Categories', icon: 'category' }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <div className="quote-section">
              <div className="quote-arabic">{currentQuote.arabic}</div>
              <div className="quote-transliteration">{currentQuote.transliteration}</div>
              <div className="quote-translation">"{currentQuote.translation}"</div>
              <div className="quote-source">— {currentQuote.source}</div>
            </div>
            
            <h1 className="hero-title">
              Master Arabic Reading
              <span className="hero-subtitle">Through Authentic Texts</span>
            </h1>
            
            <p className="hero-description">
              Immerse yourself in carefully curated Arabic literature, news, and classical texts 
              with interactive learning tools designed for progressive skill development.
            </p>
            
            <div className="hero-actions">
              <Link to="/library" className="cta-primary">
                <span className="material-icons">play_arrow</span>
                Start Reading
              </Link>
              <Link to="/levels" className="cta-secondary">
                <span className="material-icons">assessment</span>
                Choose Level
              </Link>
            </div>
          </div>
          
          <div className="hero-visual">
            <div className="floating-cards">
              <div className="card card-1">
                <span className="material-icons">menu_book</span>
                <span>Classical Literature</span>
              </div>
              <div className="card card-2">
                <span className="material-icons">article</span>
                <span>Modern Articles</span>
              </div>
              <div className="card card-3">
                <span className="material-icons">headphones</span>
                <span>Audio Stories</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item">
              <span className="material-icons stat-icon">{stat.icon}</span>
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-container">
          <h2 className="section-title">Everything You Need to Excel</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <Link to={feature.link} key={index} className="feature-card">
                <div className="feature-header">
                  <span className="material-icons feature-icon">{feature.icon}</span>
                  <h3 className="feature-title">{feature.title}</h3>
                </div>
                <p className="feature-description">{feature.description}</p>
                <span className="material-icons feature-arrow">arrow_forward</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <h2>Begin Your Arabic Reading Journey</h2>
          <p>Join thousands of learners mastering Arabic through authentic literature</p>
          <Link to="/library" className="cta-button">
            <span className="material-icons">auto_stories</span>
            Explore Library
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;