import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: 'home' },
    { path: '/library', label: 'Library', icon: 'library_books' },
    { path: '/topics', label: 'Topics', icon: 'folder' },
    { path: '/levels', label: 'Levels', icon: 'trending_up' },
    { path: '/vocabulary', label: 'Vocabulary', icon: 'article' },
    { path: '/audio-stories', label: 'Audio Stories', icon: 'headphones' },
    { path: '/progress', label: 'My Progress', icon: 'analytics' },
    { path: '/about', label: 'About', icon: 'info' }
  ];

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-brand">
          <Link to="/" className="brand-link">
            <span className="material-icons brand-icon">mosque</span>
            <span className="brand-text">Arabic Reading Hub</span>
          </Link>
        </div>
        
        <ul className="nav-menu">
          {navItems.map((item) => (
            <li key={item.path} className="nav-item">
              <Link 
                to={item.path} 
                className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
              >
                <span className="material-icons nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;