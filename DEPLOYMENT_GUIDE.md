# GitHub Pages Deployment Guide

## Step 1: Update vite.config.ts for GitHub Pages

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/arabic-reading/', // Replace with your repository name
  build: {
    outDir: 'dist',
  },
})
```

## Step 2: Add deployment script to package.json

Add this to your "scripts" section:
```json
"deploy": "npm run build && gh-pages -d dist"
```

## Step 3: Install gh-pages
```bash
npm install --save-dev gh-pages
```

## Step 4: Deploy
```bash
npm run deploy
```

## Step 5: Configure GitHub Pages
1. Go to your GitHub repository settings
2. Navigate to "Pages" section
3. Select "Deploy from a branch"
4. Choose "gh-pages" branch
5. Your app will be available at: https://yourusername.github.io/arabic-reading/