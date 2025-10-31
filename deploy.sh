#!/bin/bash

# DSLT Website Deployment Script for Hostinger (Linux/Mac/WSL)
# 
# Usage: ./deploy.sh [username] [port] [remote_path]
# Example: ./deploy.sh myusername 2222 public_html

SERVER_IP="89.117.188.199"
USERNAME="${1:-your_username}"
PORT="${2:-22}"
REMOTE_PATH="${3:-public_html}"
LOCAL_PATH="./out/*"

echo "🚀 Starting DSLT Website Deployment"
echo "Server: $SERVER_IP"
echo "Username: $USERNAME"
echo "Port: $PORT"
echo "Remote Path: $REMOTE_PATH"

# Test SSH connection
echo ""
echo "📡 Testing SSH connection..."
ssh -o ConnectTimeout=10 -p $PORT "$USERNAME@$SERVER_IP" "echo 'SSH connection successful'"

if [ $? -eq 0 ]; then
    echo "✅ SSH connection successful!"
    
    # Upload files using SCP
    echo ""
    echo "📤 Uploading website files..."
    scp -r -P $PORT $LOCAL_PATH "$USERNAME@$SERVER_IP:$REMOTE_PATH/"
    
    if [ $? -eq 0 ]; then
        echo "✅ Files uploaded successfully!"
        
        # Set proper permissions
        echo ""
        echo "🔐 Setting file permissions..."
        ssh -p $PORT "$USERNAME@$SERVER_IP" "chmod -R 755 $REMOTE_PATH/ && find $REMOTE_PATH/ -type f -exec chmod 644 {} \;"
        
        echo "🎉 Deployment completed successfully!"
        echo "Your website should now be live at your domain!"
    else
        echo "❌ File upload failed!"
    fi
else
    echo "❌ SSH connection failed!"
    echo "Please check:"
    echo "1. SSH is enabled in your Hostinger hPanel"
    echo "2. Username is correct (check your hosting control panel)"
    echo "3. Port is correct (try 2222 if 22 doesn't work)"
    echo "4. Server allows SSH connections from your IP"
fi