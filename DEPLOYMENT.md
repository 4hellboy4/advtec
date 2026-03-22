# Deployment Instructions

Deploy LovInIdeas API documentation to GitHub Pages.

## Prerequisites

- Git installed
- GitHub account
- Documentation files ready

## Step 1: Initialize Git Repository

```bash
# Initialize git repository
git init

# Add all files to staging
git add .

# Create initial commit
git commit -m "Initial commit: LovInIdeas API documentation

- Complete VitePress documentation site
- API endpoints for authentication, ideas, comments, ratings, users
- Interactive examples and integration guides
- GitHub Actions workflow for automated deployment
- Responsive design with search functionality"
```

## Step 2: Create GitHub Repository

**Web Interface:**
1. Go to [github.com](https://github.com) → "New repository"
2. Name: `lovinideas-api-docs`
3. Description: `API Documentation for LovInIdeas Gift Ideas Platform`
4. Visibility: Public
5. Don't initialize with files
6. Click "Create repository"

**CLI Alternative:**
```bash
gh repo create lovinideas-api-docs --public --description "API Documentation for LovInIdeas Gift Ideas Platform"
```

## Step 3: Connect to GitHub

```bash
# Add GitHub repository as remote origin
git remote add origin https://github.com/YOUR_USERNAME/lovinideas-api-docs.git

# Verify remote was added
git remote -v

# Push to GitHub
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

## Step 4: Enable GitHub Pages

1. Go to repository Settings → Pages
2. Source: Select "GitHub Actions"
3. GitHub will detect the workflow automatically

## Step 5: Deploy

Deployment starts automatically on push to `main`. Manual trigger: Actions → "Deploy VitePress Documentation" → "Run workflow"

## Step 6: Verify

1. Check Actions tab for green checkmark
2. Site available at: `https://YOUR_USERNAME.github.io/lovinideas-api-docs/`
3. Add URL to repository description

## Updates

```bash
git add .
git commit -m "Update documentation"
git push origin main
```

Site rebuilds automatically.

## Troubleshooting

**Build Fails:**
```bash
cat package.json  # Verify dependencies
npm install --save-dev vitepress
```

**Pages Not Enabled:**
- Repository must be public
- Settings → Pages → "GitHub Actions"

**404 Error:**
- Check deployment status in Actions
- Verify URL: `https://USERNAME.github.io/REPOSITORY-NAME/`
- Wait for DNS propagation

**Permissions Error:**
- Settings → Actions → General → "Read and write permissions"

**Debug:**
1. Check Actions log for errors
2. Verify file structure matches documentation
3. Test locally: `npm run docs:build`

## Resources

- [GitHub Pages Docs](https://docs.github.com/pages)
- [VitePress Docs](https://vitepress.dev)
- Repository Issues tab for support

## Result

**Documentation URL**: `https://YOUR_USERNAME.github.io/lovinideas-api-docs/`

Professional API documentation with automatic deployment.