#!/bin/bash

# Configuration
WEB_ROOT="/data/aparoksha"  # Your actual web root path on Ubuntu
LOG_FILE="$WEB_ROOT/cron-fetch.log"
TEMP_DIR=$(mktemp -d)

echo "[$(date '+%Y-%m-%d %H:%M:%S')] Starting sync using GitHub Actions 'dist' folder..." >> "$LOG_FILE"

# Since GitHub Actions (.github/workflows/build-and-deploy.yml) automatically builds 
# the source code and commits the complete `dist` folder back to the main branch,
# we just need to download the latest repository archive and extract the dist folder!

# Download and extract the repository tarball (doesn't require git or unzip!)
if curl -L -s https://github.com/Mvdodiya001/APAROKSHA2026/archive/refs/heads/main.tar.gz | tar -xz -C "$TEMP_DIR"; then
    
    # Check if the generated dist folder actually exists in the download
    if [ -d "$TEMP_DIR/APAROKSHA2026-main/dist" ]; then
        
        # 1. Safely delete ONLY the old Javascript bundles from Vite
        rm -f "$WEB_ROOT/assets/"*.js
        
        # 2. Copy the newly compiled `dist` folder into your web root without deleting directories!
        cp -r "$TEMP_DIR/APAROKSHA2026-main/dist/"* "$WEB_ROOT/"
        
        echo "[$(date '+%Y-%m-%d %H:%M:%S')] ✓ Website successfully fully synced from Dist!" >> "$LOG_FILE"
    else
        echo "[$(date '+%Y-%m-%d %H:%M:%S')] ✗ Error: Could not find the dist folder in the downloaded archive." >> "$LOG_FILE"
    fi
else
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] ✗ Error: Failed to download the GitHub repository archive." >> "$LOG_FILE"
fi

# Cleanup
rm -rf "$TEMP_DIR"
