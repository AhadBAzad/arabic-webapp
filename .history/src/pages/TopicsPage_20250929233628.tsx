import { Link } from 'react-router-dom';
import './TopicsPage.css';

const TopicsPage = () => {
  const topics = [
    {
      id: 'literature',
      name: 'Literature',
      nameArabic: 'الأدب',
      icon: 'menu_book',
      description: 'Classic and modern Arabic literature, poetry, and prose',
      storyCount: 245,
      color: '#667eea'
    },
    {
      id: 'news',
      name: 'News & Current Affairs',
      nameArabic: 'الأخبار والشؤون الجارية',
      icon: 'newspaper',
      description: 'Contemporary news articles from Al Jazeera, BBC Arabic, and more',
      storyCount: 189,
      color: '#4299e1'
    },
    {
      id: 'science',
      name: 'Science & Technology',
      nameArabic: 'العلوم والتكنولوجيا',
      icon: 'science',
      description: 'Scientific articles, technology trends, and innovations',
      storyCount: 156,
      color: '#38b2ac'
    },
    {
      id: 'history',
      name: 'History',
      nameArabic: 'التاريخ',
      icon: 'account_balance',
      description: 'Historical texts, biographical accounts, and cultural heritage',
      storyCount: 198,
      color: '#ed8936'
    },
    {
      id: 'philosophy',
      name: 'Philosophy',
      nameArabic: 'الفلسفة',
      icon: 'psychology',
      description: 'Philosophical works from Ibn Sina, Al-Ghazali, and contemporary thinkers',
      storyCount: 87,
      color: '#9f7aea'
    },
    {
      id: 'religion',
      name: 'Islamic Sciences',
      nameArabic: 'العلوم الإسلامية',
      icon: 'mosque',
      description: 'Religious texts, Quranic studies, and Islamic scholarship',
      storyCount: 234,
      color: '#38a169'
    },
    {
      id: 'culture',
      name: 'Culture & Society',
      nameArabic: 'الثقافة والمجتمع',
      icon: 'public',
      description: 'Cultural studies, social issues, and lifestyle articles',
      storyCount: 167,
      color: '#e53e3e'
    },
    {
      id: 'business',
      name: 'Business & Economics',
      nameArabic: 'الأعمال والاقتصاد',
      icon: 'business_center',
      description: 'Business articles, economic analysis, and market trends',
      storyCount: 123,
      color: '#2d3748'
    }
  ];

  return (
    <div className="topics-page">
      <div className="topics-header">
        <div className="header-icon">
          <span className="material-icons">category</span>
        </div>
        <h1>Browse by Topics</h1>
        <p>Explore Arabic content organized by subject matter and interests</p>
      </div>

      <div className="topics-grid">
        {topics.map(topic => (
          <Link 
            key={topic.id} 
            to={`/library?topic=${topic.name}`} 
            className="topic-card"
            style={{ '--topic-color': topic.color } as React.CSSProperties}
          >
            <div className="topic-header">
              <span className="material-icons topic-icon">{topic.icon}</span>
              <div className="topic-info">
                <h3 className="topic-name">{topic.name}</h3>
                <p className="topic-name-arabic">{topic.nameArabic}</p>
              </div>
            </div>
            
            <p className="topic-description">{topic.description}</p>
            
            <div className="topic-stats">
              <span className="story-count">{topic.storyCount} stories</span>
              <span className="topic-arrow">→</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopicsPage;