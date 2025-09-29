import './ProgressPage.css';

const ProgressPage = () => {
  // Sample progress data
  const stats = {
    totalWordsLearned: 847,
    storiesCompleted: 23,
    listeningHours: 15.5,
    currentLevel: 'Intermediate',
    streak: 12,
    totalReadingTime: 42,
    vocabularyMastered: 234,
    monthlyGoal: 1000,
    weeklyStreak: 5
  };

  const recentActivity = [
    { date: '2024-01-28', activity: 'Completed "The Lion and the Mouse"', type: 'story', points: 50 },
    { date: '2024-01-28', activity: 'Learned 15 new words', type: 'vocabulary', points: 30 },
    { date: '2024-01-27', activity: 'Listened to "Modern Poetry"', type: 'audio', points: 25 },
    { date: '2024-01-27', activity: 'Completed daily reading goal', type: 'goal', points: 20 },
    { date: '2024-01-26', activity: 'Mastered 8 vocabulary words', type: 'vocabulary', points: 40 }
  ];

  const achievements = [
    { id: 1, name: 'First Story', description: 'Complete your first story', icon: 'emoji_events', earned: true },
    { id: 2, name: 'Vocabulary Builder', description: 'Learn 100 words', icon: 'library_books', earned: true },
    { id: 3, name: 'Week Warrior', description: '7-day reading streak', icon: 'whatshot', earned: true },
    { id: 4, name: 'Audio Lover', description: 'Listen for 10 hours', icon: 'headphones', earned: true },
    { id: 5, name: 'Scholar', description: 'Learn 500 words', icon: 'school', earned: true },
    { id: 6, name: 'Marathon Reader', description: 'Read for 50 hours total', icon: 'menu_book', earned: false },
    { id: 7, name: 'Master Learner', description: 'Learn 1000 words', icon: 'workspace_premium', earned: false },
    { id: 8, name: 'Story Master', description: 'Complete 50 stories', icon: 'military_tech', earned: false }
  ];

  const levelProgress = {
    current: 'Intermediate',
    currentPoints: 1250,
    nextLevelPoints: 2000,
    progress: (1250 / 2000) * 100
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'story': return 'menu_book';
      case 'vocabulary': return 'edit_note';
      case 'audio': return 'headphones';
      case 'goal': return 'flag';
      default: return 'auto_awesome';
    }
  };

  return (
    <div className="progress-page">
      <div className="progress-header">
        <h1>📊 My Progress</h1>
        <p>Track your Arabic learning journey and celebrate your achievements</p>
      </div>

      {/* Level Progress */}
      <div className="level-section">
        <h2>Current Level: {levelProgress.current}</h2>
        <div className="level-progress-bar">
          <div 
            className="level-progress-fill" 
            style={{ width: `${levelProgress.progress}%` }}
          ></div>
        </div>
        <p className="level-info">
          {levelProgress.currentPoints} / {levelProgress.nextLevelPoints} XP
          <span className="points-to-next">
            ({levelProgress.nextLevelPoints - levelProgress.currentPoints} XP to next level)
          </span>
        </p>
      </div>

      {/* Main Stats */}
      <div className="stats-grid">
        <div className="stat-card primary">
          <div className="stat-icon">📝</div>
          <div className="stat-number">{stats.totalWordsLearned}</div>
          <div className="stat-label">Words Learned</div>
          <div className="stat-progress">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${(stats.totalWordsLearned / stats.monthlyGoal) * 100}%` }}
              ></div>
            </div>
            <span className="progress-text">{stats.monthlyGoal - stats.totalWordsLearned} to goal</span>
          </div>
        </div>

        <div className="stat-card secondary">
          <div className="stat-icon">📚</div>
          <div className="stat-number">{stats.storiesCompleted}</div>
          <div className="stat-label">Stories Completed</div>
        </div>

        <div className="stat-card tertiary">
          <div className="stat-icon">🎧</div>
          <div className="stat-number">{stats.listeningHours}h</div>
          <div className="stat-label">Listening Time</div>
        </div>

        <div className="stat-card quaternary">
          <div className="stat-icon">🔥</div>
          <div className="stat-number">{stats.streak}</div>
          <div className="stat-label">Day Streak</div>
        </div>

        <div className="stat-card fifth">
          <div className="stat-icon">⭐</div>
          <div className="stat-number">{stats.vocabularyMastered}</div>
          <div className="stat-label">Words Mastered</div>
        </div>

        <div className="stat-card sixth">
          <div className="stat-icon">⏱️</div>
          <div className="stat-number">{stats.totalReadingTime}h</div>
          <div className="stat-label">Total Reading</div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="activity-section">
        <h2>Recent Activity</h2>
        <div className="activity-list">
          {recentActivity.map((activity, index) => (
            <div key={index} className="activity-item">
              <div className="activity-icon">{getActivityIcon(activity.type)}</div>
              <div className="activity-content">
                <div className="activity-description">{activity.activity}</div>
                <div className="activity-date">{new Date(activity.date).toLocaleDateString()}</div>
              </div>
              <div className="activity-points">+{activity.points} XP</div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="achievements-section">
        <h2>Achievements</h2>
        <div className="achievements-grid">
          {achievements.map(achievement => (
            <div 
              key={achievement.id} 
              className={`achievement-card ${achievement.earned ? 'earned' : 'locked'}`}
            >
              <div className="achievement-icon">{achievement.icon}</div>
              <h3 className="achievement-name">{achievement.name}</h3>
              <p className="achievement-description">{achievement.description}</p>
              {achievement.earned && (
                <div className="earned-badge">✓ Earned</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Overview */}
      <div className="weekly-overview">
        <h2>This Week</h2>
        <div className="week-grid">
          <div className="week-stat">
            <div className="week-number">5</div>
            <div className="week-label">Days Active</div>
          </div>
          <div className="week-stat">
            <div className="week-number">127</div>
            <div className="week-label">Words Learned</div>
          </div>
          <div className="week-stat">
            <div className="week-number">3</div>
            <div className="week-label">Stories Read</div>
          </div>
          <div className="week-stat">
            <div className="week-number">2.5h</div>
            <div className="week-label">Audio Time</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressPage;