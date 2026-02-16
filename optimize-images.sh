#!/bin/bash

# Configuration
CONTAINER_NAME="lp-litoral-v1.1.0-dev-v1.1.0"
PROJECT_DIR="src/react/projeto"
SCRIPT_PATH="scripts/convert-images.js"

echo "Checking execution environment..."

# Check if Docker container is running
if docker ps -q -f name=$CONTAINER_NAME > /dev/null; then
  echo "✅ Docker container found: $CONTAINER_NAME"
  echo "🚀 Running optimization script inside container..."
  
  # Execute node command inside the container
  docker exec -t $CONTAINER_NAME bash -c "cd /app && node $SCRIPT_PATH"
  
  if [ $? -eq 0 ]; then
    echo "✅ Image optimization completed successfully!"
  else
    echo "❌ Error during image optimization inside container."
    exit 1
  fi
  
else
  echo "⚠️ Docker container $CONTAINER_NAME is NOT running."
  echo "🔄 Attempting to run locally (requires Node.js)..."
  
  cd $PROJECT_DIR || exit
  
  if command -v npm &> /dev/null; then
    echo "📦 Installing sharp dependency locally..."
    npm install sharp --save-dev
    
    echo "🚀 Running optimization script locally..."
    node $SCRIPT_PATH
    
    if [ $? -eq 0 ]; then
      echo "✅ Image optimization completed successfully!"
    else
      echo "❌ Error during local image optimization."
      exit 1
    fi
  else
    echo "❌ Error: Docker container is not running AND npm is not installed locally."
    echo "Please start your dev environment with 'docker-compose up' or install Node.js."
    exit 1
  fi
fi
