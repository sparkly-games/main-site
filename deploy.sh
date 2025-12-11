#!/bin/bash
# Check if a commit message was provided
if [ -z "$1" ]; then
  echo "Error: Commit message required."
  echo "Usage: npm run deploy -- \"<Your Commit Message>\""
  exit 1
fi

echo "--- Starting Deployment ---"

# The core commands
git add .
git commit -m "$1"
git push origin main

echo "--- Deployment Complete ---"