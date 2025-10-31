# Hostinger cPanel Deployment Checklist

## ✅ Pre-Upload Checklist
- [ ] Website built successfully (✓ Complete - files in `out/` folder)
- [ ] Logged into Hostinger hPanel
- [ ] File Manager opened
- [ ] Navigated to `public_html` folder

## 📤 Upload Process
- [ ] Cleared existing files from `public_html`
- [ ] Uploaded `index.html` (homepage)
- [ ] Uploaded `about.html`
- [ ] Uploaded `contact.html` 
- [ ] Uploaded `whitepaper.html`
- [ ] Uploaded `404.html`
- [ ] Uploaded all image files (.png)
- [ ] Uploaded video files (.mp4) - may take longer
- [ ] Uploaded entire `_next` folder with all subfolders
- [ ] Uploaded .txt files

## 🔧 Post-Upload Configuration
- [ ] Verified all files are in `public_html` root (not in subfolder)
- [ ] Set folder permissions to 755
- [ ] Set file permissions to 644
- [ ] No file upload errors

## 🧪 Testing
- [ ] Homepage loads correctly (yourdomain.com)
- [ ] About page works (yourdomain.com/about)
- [ ] Contact page works (yourdomain.com/contact)
- [ ] Whitepaper page works (yourdomain.com/whitepaper)
- [ ] Logo and images display
- [ ] Background video plays
- [ ] Hero animations work
- [ ] Contract address displays and copy function works
- [ ] Footer email link works (dsltokenuk@gmail.com)
- [ ] Responsive design works on mobile

## 🚨 Troubleshooting
**If pages don't load:**
- Check file names are lowercase
- Ensure `.html` extension on all pages
- Verify `index.html` exists in root

**If images/videos don't display:**
- Check file paths in File Manager
- Ensure all media files uploaded
- Check file permissions (644 for files)

**If styling looks wrong:**
- Verify `_next` folder uploaded completely
- Check browser console for 404 errors
- Clear browser cache and try again

## 📝 Important Notes
- Domain: Your Hostinger domain
- Contact: dsltokenuk@gmail.com
- Contract: 0x6652b040dc603df11be01ceedcbf3ba0965fe8c1
- Built with: Next.js 14, React, Tailwind CSS

## ✅ Success Indicators
✓ Homepage shows DSLT hero section with video
✓ Contract address displays with copy button
✓ Email contact link works in footer
✓ All navigation links work
✓ Mobile responsive design
✓ Fast loading times