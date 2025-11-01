# DSLT Website Deployment Guide

## Quick Deployment to Hostinger

Your website has been successfully built and is ready for deployment! The static files are located in the `out/` directory.

### Server Details
- **IP Address**: 89.117.188.199
- **Hosting Provider**: Hostinger

### Prerequisites

Before deploying, you need to:

1. **Enable SSH Access in Hostinger hPanel**:
   - Log into your Hostinger control panel
   - Go to Advanced → SSH Access
   - Enable SSH access
   - Note down your SSH username and port

2. **Get SSH Credentials**:
   - Username: Usually your hosting account username (NOT 'root')
   - Port: Often 2222 for shared hosting (or 22)
   - Password: Your hosting account password or SSH key

### Deployment Options

#### Option 1: PowerShell Script (Windows)
```powershell
# Replace 'your_username' with your actual Hostinger username
.\deploy.ps1 -Username "your_username"

# If using port 2222:
.\deploy.ps1 -Username "your_username" -Port 2222

# For subdomain deployment:
.\deploy.ps1 -Username "your_username" -Port 2222 -RemotePath "domains/yoursubdomain.yourdomain.com/public_html"
```

#### Option 2: Bash Script (Linux/Mac/WSL)
```bash
# Make script executable
chmod +x deploy.sh

# Deploy (replace 'your_username' with actual username)
./deploy.sh your_username 2222 public_html
```

#### Option 3: Manual SCP Upload
```bash
# Upload files manually
scp -r -P 2222 ./out/* your_username@89.117.188.199:public_html/

# Set permissions
ssh -p 2222 your_username@89.117.188.199 "chmod -R 755 public_html/ && find public_html/ -type f -exec chmod 644 {} \;"
```

#### Option 4: FTP Upload (Alternative)
If SSH doesn't work, use FTP:
1. Use FileZilla or similar FTP client
2. Connect to your Hostinger FTP
3. Upload all files from the `out/` directory to your `public_html` folder

### File Structure
The built website contains:
- `index.html` - Main homepage
- `about.html` - About page
- `contact.html` - Contact page
- `whitepaper.html` - Whitepaper page
- `_next/` - Next.js assets
- Static assets (images, videos)

### Troubleshooting

**SSH Connection Issues:**
- Check if SSH is enabled in hPanel
- Verify username (it's usually your hosting username, not 'root')
- Try port 2222 instead of 22
- Check if your IP is allowed

**File Permission Issues:**
After upload, ensure proper permissions:
```bash
chmod -R 755 public_html/
find public_html/ -type f -exec chmod 644 {} \;
```

**Domain Configuration:**
- If using a subdomain, upload to: `domains/subdomain.yourdomain.com/public_html/`
- For main domain: use `public_html/` or `domains/yourdomain.com/public_html/`

### Next Steps
1. Get your SSH credentials from Hostinger hPanel
2. Run the deployment script with your actual username
3. Verify the website is live at your domain
4. Test all pages and functionality

### Support
If you need help with:
- Getting SSH credentials → Contact Hostinger support
- Domain configuration → Check Hostinger DNS settings
- Website issues → Check browser console for errors