# DSLT Website Deployment Script for Hostinger
# 
# Before running this script:
# 1. Enable SSH access in your Hostinger hPanel
# 2. Get your SSH username (usually your hosting username, not 'root')
# 3. Note the SSH port (often 2222 for shared hosting)
# 4. Have your SSH password or key ready

param(
    [Parameter(Mandatory=$true)]
    [string]$Username,
    
    [Parameter(Mandatory=$false)]
    [int]$Port = 22,
    
    [Parameter(Mandatory=$false)]
    [string]$RemotePath = "public_html"
)

$ServerIP = "89.117.188.199"
$LocalPath = ".\out\*"

Write-Host "🚀 Starting DSLT Website Deployment" -ForegroundColor Cyan
Write-Host "Server: $ServerIP" -ForegroundColor Yellow
Write-Host "Username: $Username" -ForegroundColor Yellow
Write-Host "Port: $Port" -ForegroundColor Yellow
Write-Host "Remote Path: $RemotePath" -ForegroundColor Yellow

# Test SSH connection first
Write-Host "`n📡 Testing SSH connection..." -ForegroundColor Blue
ssh -o ConnectTimeout=10 -p $Port "$Username@$ServerIP" "echo 'SSH connection successful'"

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ SSH connection successful!" -ForegroundColor Green
    
    # Upload files using SCP
    Write-Host "`n📤 Uploading website files..." -ForegroundColor Blue
    scp -r -P $Port $LocalPath "$Username@$ServerIP`:$RemotePath/"
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Files uploaded successfully!" -ForegroundColor Green
        
        # Set proper permissions
        Write-Host "`n🔐 Setting file permissions..." -ForegroundColor Blue
        ssh -p $Port "$Username@$ServerIP" "chmod -R 755 $RemotePath/ && find $RemotePath/ -type f -exec chmod 644 {} \;"
        
        Write-Host "🎉 Deployment completed successfully!" -ForegroundColor Green
        Write-Host "Your website should now be live at your domain!" -ForegroundColor Cyan
    } else {
        Write-Host "❌ File upload failed!" -ForegroundColor Red
    }
} else {
    Write-Host "❌ SSH connection failed!" -ForegroundColor Red
    Write-Host "Please check:" -ForegroundColor Yellow
    Write-Host "1. SSH is enabled in your Hostinger hPanel" -ForegroundColor White
    Write-Host "2. Username is correct (check your hosting control panel)" -ForegroundColor White
    Write-Host "3. Port is correct (try 2222 if 22 doesn't work)" -ForegroundColor White
    Write-Host "4. Server allows SSH connections from your IP" -ForegroundColor White
}

# Usage examples:
# .\deploy.ps1 -Username "your_username"
# .\deploy.ps1 -Username "your_username" -Port 2222
# .\deploy.ps1 -Username "your_username" -Port 2222 -RemotePath "domains/yourdomain.com/public_html"