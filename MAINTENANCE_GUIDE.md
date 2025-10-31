# DSLT Maintenance Mode System

## 🛠️ Complete Maintenance Mode Setup

Your DSLT website now has a comprehensive maintenance mode system with multiple deployment options.

## 📋 What's Included

### 1. **React/Next.js Components**
- `MaintenancePage.tsx` - Beautiful animated maintenance page
- `MaintenanceAdmin.tsx` - Admin control panel
- `MaintenanceChecker.tsx` - Client-side maintenance detection
- `maintenance.ts` - Maintenance configuration utilities

### 2. **Standalone HTML Version**
- `maintenance.html` - Self-contained maintenance page for Hostinger

### 3. **Admin Interface**
- Password-protected admin panel at `/admin`
- Toggle maintenance mode on/off
- Configure messages and duration
- Real-time status updates

## 🚀 Quick Start Guide

### For Hostinger Hosting (Recommended)

#### Method 1: Simple HTML Maintenance
1. **Upload `maintenance.html`** to your `public_html` folder
2. **Rename your main site**:
   ```
   index.html → index_backup.html
   maintenance.html → index.html
   ```
3. **To restore**: Rename back to original names

#### Method 2: .htaccess Redirect (Advanced)
Create `.htaccess` file in `public_html`:
```apache
# Enable maintenance mode
RewriteEngine On
RewriteCond %{REQUEST_URI} !^/maintenance\.html$
RewriteCond %{REQUEST_URI} !^/admin
RewriteCond %{QUERY_STRING} !bypass=dslt_admin_2025
RewriteRule ^(.*)$ /maintenance.html [R=503,L]

# Set 503 status
ErrorDocument 503 /maintenance.html
Header always set Retry-After "7200"
```

### For Full Next.js Application

#### 1. **Access Admin Panel**
- Go to `yourdomain.com/admin`
- Password: `dslt2025admin`

#### 2. **Enable Maintenance Mode**
- Click "Enable Maintenance" button
- Configure message and duration
- Users will be redirected to `/maintenance`

#### 3. **Bypass Maintenance Mode**
- Add `?bypass=dslt_admin_2025` to any URL
- Example: `yourdomain.com?bypass=dslt_admin_2025`

## 🎨 Maintenance Page Features

### Visual Elements
- ✨ Animated DSLT logo and branding
- 🔄 Rotating maintenance icon
- 🌟 Floating particle effects
- ⏰ Live countdown timer
- 📊 Progress bar animation
- 🌈 Gradient backgrounds matching DSLT theme

### Information Displayed
- 📧 Contact email: `dsltokenuk@gmail.com`
- ⏱️ Estimated downtime
- 📱 Social media links
- 💼 Professional maintenance message
- 🔗 Contract address display

### Interactive Features
- ⏰ Real-time countdown timer
- 📱 Responsive design for all devices
- 🎭 Smooth animations and transitions
- 📋 Copy-to-clipboard functionality

## ⚙️ Configuration Options

### Admin Panel Settings
- **Maintenance Message**: Custom message for users
- **Estimated Duration**: How long maintenance will last
- **Bypass Key**: Secret key to bypass maintenance mode
- **Quick Presets**: 30min, 1hr, 2hr, 4hr options

### Environment Variables (Next.js)
```bash
# Enable maintenance mode server-side
MAINTENANCE_MODE=true

# Custom bypass key (optional)
MAINTENANCE_BYPASS_KEY=your_secret_key
```

## 🛡️ Security Features

### Admin Authentication
- Password protection: `dslt2025admin`
- Session-based access
- Secure cookie handling

### Bypass Protection
- Secret bypass key: `dslt_admin_2025`
- URL parameter bypass
- Cookie-based bypass persistence
- IP allowlist support (configurable)

## 📱 Mobile Optimization

### Responsive Design
- ✅ Mobile-first approach
- ✅ Touch-friendly interfaces
- ✅ Optimized animations for mobile
- ✅ Reduced particle effects on small screens
- ✅ Accessible font sizes and spacing

## 🔧 Deployment Instructions

### Hostinger Quick Deploy

1. **Simple Maintenance** (5 minutes):
   ```bash
   # Upload maintenance.html to public_html
   # Rename index.html → index_backup.html
   # Rename maintenance.html → index.html
   ```

2. **Advanced Maintenance** (with .htaccess):
   ```bash
   # Upload maintenance.html to public_html
   # Create .htaccess with redirect rules
   # Add bypass parameter for admin access
   ```

### Full Next.js Deploy

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Upload `out/` folder contents** to `public_html`

3. **Access admin panel**: `yourdomain.com/admin`

## 🔄 Maintenance Workflow

### Enabling Maintenance
1. 🔐 Access admin panel (`/admin`)
2. ⚙️ Configure message and duration
3. 🚨 Click "Enable Maintenance"
4. ✅ Verify maintenance page is live
5. 🔧 Perform your updates

### During Maintenance
- 👀 Monitor admin panel for status
- 📧 Respond to user emails if needed
- 🔄 Update progress/duration if needed
- 🧪 Test fixes using bypass URL

### Disabling Maintenance
1. 🔐 Access admin panel with bypass URL
2. 🎯 Click "Disable Maintenance"
3. ✅ Verify site is back online
4. 📊 Check all functionality works

## 🚨 Emergency Procedures

### If Admin Panel is Inaccessible
1. **Hostinger File Manager**:
   - Rename `index.html` → `maintenance.html`
   - Rename `index_backup.html` → `index.html`

2. **Delete .htaccess** (if using htaccess method)

3. **Clear browser cache** and cookies

### If Site is Stuck in Maintenance
1. **Check localStorage** in browser dev tools
2. **Delete** `dslt_maintenance_config` key
3. **Clear all site data** in browser
4. **Access bypass URL**: `?bypass=dslt_admin_2025`

## 📞 Support & Troubleshooting

### Common Issues
- **Q**: Admin panel won't load?
  **A**: Check URL is exactly `/admin`, clear cache
  
- **Q**: Bypass not working?
  **A**: Ensure exact parameter: `?bypass=dslt_admin_2025`
  
- **Q**: Maintenance page not showing?
  **A**: Check file names, .htaccess rules, clear DNS cache

### Contact Information
- 📧 **Technical Support**: `dsltokenuk@gmail.com`
- 🔧 **Admin Password**: `dslt2025admin`
- 🔑 **Bypass Key**: `dslt_admin_2025`

## 📋 Maintenance Checklist

### Pre-Maintenance
- [ ] Notify users in advance
- [ ] Test maintenance page functionality  
- [ ] Verify bypass access works
- [ ] Backup current site files
- [ ] Set appropriate maintenance duration

### During Maintenance  
- [ ] Enable maintenance mode
- [ ] Perform necessary updates
- [ ] Test changes using bypass
- [ ] Update progress if needed
- [ ] Monitor for urgent user contacts

### Post-Maintenance
- [ ] Test all site functionality
- [ ] Disable maintenance mode
- [ ] Verify site is fully operational
- [ ] Send completion notification
- [ ] Monitor for any issues

---

**🎉 Your DSLT maintenance system is now ready!** Access the admin panel at `/admin` with password `dslt2025admin` to get started.