#!/bin/bash

# Quick Deployment Script for Arabic Reading Practice App
# Run this script to deploy to Vercel

echo "🚀 Deploying Arabic Reading Practice App..."

# Step 1: Clean and build
echo "📦 Building the application..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    
    # Step 2: Install Vercel CLI if not installed
    if ! command -v vercel &> /dev/null; then
        echo "📥 Installing Vercel CLI..."
        npm install -g vercel
    fi
    
    # Step 3: Deploy to Vercel
    echo "🌐 Deploying to Vercel..."
    vercel --prod
    
    echo "🎉 Deployment complete!"
    echo "Your app should be live at the URL shown above."
else
    echo "❌ Build failed. Please fix the errors and try again."
    exit 1
fi