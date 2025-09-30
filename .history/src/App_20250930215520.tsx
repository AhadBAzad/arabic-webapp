import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import LibraryPage from './pages/LibraryPage.tsx';
import TopicsPage from './pages/TopicsPage';
import LevelsPage from './pages/LevelsPage';
import VocabularyPage from './pages/VocabularyPage';
import AudioStoriesPage from './pages/AudioStoriesPage';
import ProgressPage from './pages/ProgressPage';
import AboutPage from './pages/AboutPage';
import DailyPhrasesPage from './pages/DailyPhrasesPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navigation />
        
        <main className="app-main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/library" element={<LibraryPage />} />
            <Route path="/topics" element={<TopicsPage />} />
            <Route path="/levels" element={<LevelsPage />} />
            <Route path="/vocabulary" element={<VocabularyPage />} />
            <Route path="/audio-stories" element={<AudioStoriesPage />} />
            <Route path="/progress" element={<ProgressPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
