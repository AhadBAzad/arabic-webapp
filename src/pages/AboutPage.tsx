import './AboutPage.css';

const AboutPage = () => {
  return (
    <div className="about-page">
      <div className="about-container">
        <div className="about-header">
          <span className="material-icons about-icon">info</span>
          <h1>About Us</h1>
        </div>

        <div className="about-content">
          <div className="intro-section">
            <h2>The Servant of Allah</h2>
            <p>
              This website was made to help learners self-study Arabic reading skills through 
              engaging stories and interactive features. Our mission is to make Arabic literacy 
              accessible to everyone, providing tools for pronunciation, translation, and 
              comprehension support.
            </p>
            <p>
              May Allah accept this humble effort and make it beneficial for all who seek 
              knowledge of the Arabic language.
            </p>
          </div>

          <div className="features-section">
            <h3>What We Offer</h3>
            <div className="feature-grid">
              <div className="feature-item">
                <span className="material-icons">menu_book</span>
                <span>Graded Reading Stories</span>
              </div>
              <div className="feature-item">
                <span className="material-icons">volume_up</span>
                <span>Text-to-Speech</span>
              </div>
              <div className="feature-item">
                <span className="material-icons">text_fields</span>
                <span>Harakah Support</span>
              </div>
              <div className="feature-item">
                <span className="material-icons">translate</span>
                <span>Transliteration & Translation</span>
              </div>
            </div>
          </div>

          <div className="blessing-section">
            <p className="arabic-blessing">بارك الله فيكم</p>
            <p className="blessing-translation">May Allah bless you</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;