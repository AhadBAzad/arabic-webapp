# 🌟 Arabic Reading Practice App

An interactive web application for learning Arabic with advanced features including text-to-speech, word tooltips, grammar information, and content filtering.

## ✨ Features

- 📖 **Interactive Arabic Text**: Hover over words to see detailed information
- 🔊 **Text-to-Speech**: Browser-based Arabic pronunciation
- 🎭 **Grammar Information**: Word types, roots, and meanings
- 🔍 **Advanced Filtering**: Filter by difficulty, CEFR level, and category
- 📱 **Responsive Design**: Works on all devices
- 🌐 **Modern UI/UX**: Clean, intuitive interface

## 🚀 Quick Start

### Development
```bash
npm install
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

## 🌐 Deployment Options

### 1. Vercel (Recommended - Easiest)

**Option A: Using Vercel CLI**
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy (run in project root)
vercel --prod

# Or use our deployment script
./deploy.sh
```

**Option B: Via Vercel Website**
1. Go to [vercel.com](https://vercel.com) and sign up
2. Connect your GitHub repository
3. Vercel auto-detects Vite settings
4. Deploy with one click!

### 2. Netlify

**Drag & Drop:**
1. Run `npm run build`
2. Go to [netlify.com](https://netlify.com)
3. Drag the `dist` folder to Netlify

**Git Integration:**
1. Connect your GitHub repository
2. Build command: `npm run build`
3. Publish directory: `dist`

### 3. GitHub Pages

```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts:
"deploy": "npm run build && gh-pages -d dist"

# Deploy
npm run deploy
```

**Note:** For GitHub Pages, update `vite.config.ts`:
```typescript
export default defineConfig({
  plugins: [react()],
  base: '/your-repo-name/',
})
```

### 4. Other Platforms

The app builds to static files in the `dist` folder and can be deployed to:
- **Firebase Hosting**
- **AWS S3 + CloudFront**
- **Azure Static Web Apps**
- **DigitalOcean App Platform**

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── ControlPanel.tsx    # Display toggles
│   ├── FilterPanel.tsx     # Content filtering
│   ├── SentenceDisplay.tsx # Main content display
│   ├── WordTooltip.tsx     # Interactive word tooltips
│   └── TTSSettings.tsx     # Text-to-speech controls
├── services/            # Business logic
│   └── ttsService.ts       # Text-to-speech service
├── data.ts             # Arabic sentences dataset
├── types.ts            # TypeScript interfaces
└── App.tsx             # Main application
```

## 🛠️ Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **CSS3** - Styling with Arabic font support
- **Web Speech API** - Browser-native text-to-speech

## 📱 Features in Detail

### Content Filtering
- **Difficulty**: Easy, Medium, Difficult
- **CEFR Levels**: A1, A2, B1, B2
- **Categories**: Phrases, Education, News, Travel, Others

### Interactive Learning
- **Word Tooltips**: Grammar types, roots, meanings
- **Audio Pronunciation**: Click speaker icons for TTS
- **Toggle Controls**: Show/hide translations, transliterations, diacritics

### Responsive Design
- Mobile-first approach
- Touch-friendly interface
- Adaptive layouts for all screen sizes

## 🌍 Deployment URLs

After deployment, your app will be accessible at:
- **Vercel**: `https://your-app-name.vercel.app`
- **Netlify**: `https://your-app-name.netlify.app`
- **GitHub Pages**: `https://username.github.io/repository-name`

## 📞 Support

The app is built with modern web standards and should work on all modern browsers with JavaScript enabled. For the best experience, use Chrome, Firefox, Safari, or Edge.

---

**Built with ❤️ for Arabic language learners**
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
