# Manual Maintenance Mode Control Instructions

Since we're using static export for Hostinger deployment, the maintenance status needs to be manually updated in the JSON file. Here are the exact steps:

## 🔄 How to Enable Maintenance Mode

### Step 1: Access Your Hostinger File Manager
1. Log into your Hostinger hPanel
2. Go to **Files** → **File Manager**
3. Navigate to your **public_html** folder

### Step 2: Edit maintenance-status.json
1. Find the file **`maintenance-status.json`**
2. Right-click → **Edit** or **Code Edit**
3. Change the content to:

```json
{
  "enabled": true,
  "message": "We're upgrading our crypto ecosystem to serve you better. The future of digital payments is being enhanced!",
  "estimatedDuration": "2-3 hours",
  "bypassKey": "dslt_admin_2025",
  "startTime": "2025-10-31T12:00:00.000Z",
  "endTime": null,
  "lastUpdated": "2025-10-31T12:00:00.000Z"
}
```

4. **Save** the file

### Step 3: Verify Maintenance Mode
1. Visit your website in a new browser tab
2. You should see the maintenance page
3. To bypass: add `?bypass=dslt_admin_2025` to any URL

## 🟢 How to Disable Maintenance Mode

### Edit maintenance-status.json again:
```json
{
  "enabled": false,
  "message": "We're upgrading our crypto ecosystem to serve you better. The future of digital payments is being enhanced!",
  "estimatedDuration": "2-3 hours",
  "bypassKey": "dslt_admin_2025",
  "startTime": "2025-10-31T12:00:00.000Z",
  "endTime": "2025-10-31T15:00:00.000Z",
  "lastUpdated": "2025-10-31T15:00:00.000Z"
}
```

## 🚨 Quick Enable/Disable (Alternative Method)

### Method 1: File Renaming
**To Enable Maintenance:**
1. Rename `index.html` → `index_backup.html`
2. Upload `maintenance.html` and rename it to `index.html`

**To Disable Maintenance:**
1. Delete the current `index.html` (maintenance page)
2. Rename `index_backup.html` → `index.html`

### Method 2: .htaccess Method
Create a `.htaccess` file in your public_html:

**Enable Maintenance (.htaccess content):**
```apache
RewriteEngine On
RewriteCond %{REQUEST_URI} !^/maintenance\.html$
RewriteCond %{REQUEST_URI} !^/admin
RewriteCond %{QUERY_STRING} !bypass=dslt_admin_2025
RewriteRule ^(.*)$ /maintenance.html [R=503,L]
ErrorDocument 503 /maintenance.html
```

**Disable Maintenance:**
Delete or rename the `.htaccess` file.

## 🔑 Bypass Access

While maintenance mode is active:
- **Admin Panel**: `yourdomain.com/admin?bypass=dslt_admin_2025`
- **Direct Site**: `yourdomain.com?bypass=dslt_admin_2025`
- **Admin Password**: `dslt2025admin`

## 📝 Current File Status

### maintenance-status.json (Default - Disabled)
```json
{
  "enabled": false,
  "message": "We're upgrading our crypto ecosystem to serve you better. The future of digital payments is being enhanced!",
  "estimatedDuration": "2-3 hours",
  "bypassKey": "dslt_admin_2025",
  "startTime": null,
  "endTime": null,
  "lastUpdated": null
}
```

## ⚡ Quick Reference

| Action | File to Edit | Change `enabled` to |
|--------|-------------|-------------------|
| Enable Maintenance | `maintenance-status.json` | `true` |
| Disable Maintenance | `maintenance-status.json` | `false` |

## 🔧 Troubleshooting

**Problem**: Changes not reflecting
**Solution**: 
1. Clear browser cache (Ctrl+Shift+R)
2. Check file was saved properly
3. Wait 10-30 seconds for changes to propagate

**Problem**: Can't access admin panel
**Solution**: Use bypass URL with the key: `?bypass=dslt_admin_2025`

**Problem**: Maintenance page not showing
**Solution**: Check the JSON file syntax is correct (use a JSON validator)

---

💡 **Tip**: Always test the maintenance mode before performing actual maintenance to ensure it works correctly!