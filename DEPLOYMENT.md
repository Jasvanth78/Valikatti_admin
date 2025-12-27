# Valikkati Admin Panel - GitHub Pages Deployment

Your admin panel is configured for automatic deployment to GitHub Pages. Here's how to set it up:

## Automatic Deployment (GitHub Actions)

The admin panel is now configured with a GitHub Actions workflow that automatically deploys to GitHub Pages whenever you push to the `main` branch.

**Setup Steps:**

1. **Enable GitHub Pages in your repository:**
   - Go to your repository on GitHub
   - Click **Settings** → **Pages**
   - Under "Source", select **Deploy from a branch**
   - Select branch: **gh-pages**
   - Click **Save**

2. **Push the configuration changes:**
   ```bash
   cd admin
   git add .
   git commit -m "Add GitHub Pages deployment configuration"
   git push origin main
   ```

3. **The workflow will automatically:**
   - Build your React app with `npm run build`
   - Upload to GitHub Pages
   - Deploy to: `https://<your-username>.github.io/Valikkati-Admin/`

4. **Monitor deployment:**
   - Go to your repository
   - Click **Actions** tab
   - Watch the "Deploy Admin Panel to GitHub Pages" workflow
   - Once complete (green checkmark), your app will be live

## Manual Deployment (Alternative)

If you prefer to deploy manually:

```bash
cd admin

# Install dependencies (if not already done)
npm install

# Install gh-pages package
npm install --save-dev gh-pages

# Deploy to GitHub Pages
npm run deploy
```

## Configuration Details

- **Base Path:** `/Valikkati-Admin/` - All API calls and static assets are correctly configured
- **API Endpoint:** `https://valikatti-backend.onrender.com/api` - Connected to your production backend
- **Build Tool:** Vite - Fast build and optimized output

## Accessing Your Admin Panel

Once deployed, visit:
```
https://<your-username>.github.io/Valikkati-Admin/
```

Replace `<your-username>` with your actual GitHub username.

## Troubleshooting

**Blank page or 404 errors:**
- Verify GitHub Pages is enabled (Settings → Pages → Source: gh-pages branch)
- Check that the workflow completed successfully (Actions tab)
- Wait 1-2 minutes for DNS propagation

**Assets not loading:**
- Clear browser cache (Ctrl+Shift+Delete)
- The base path `/Valikkati-Admin/` is already configured in `vite.config.js`

**API calls failing:**
- Ensure the backend is running on Render: `https://valikatti-backend.onrender.com`
- Check CORS is enabled in backend (already configured)

## Future Updates

Every time you push changes to the `main` branch, the workflow will automatically rebuild and deploy your admin panel. No manual steps needed!
