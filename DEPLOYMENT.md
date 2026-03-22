# 🚀 Deployment Instructions

Step-by-step guide to deploy your LovInIdeas API documentation to GitHub Pages.

## 📋 Prerequisites

- Git installed on your computer
- GitHub account
- All documentation files created (completed in previous steps)

## 🔧 Step 1: Initialize Git Repository

Run these commands in your project directory (`lovinideas-api-docs/`):

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

## 🌐 Step 2: Create GitHub Repository

### Option A: Using GitHub Web Interface

1. **Go to GitHub**: Visit [github.com](https://github.com) and sign in
2. **Create Repository**: Click "New" or "+" → "New repository"
3. **Repository Settings**:
   - **Name**: `lovinideas-api-docs` (or any name you prefer)
   - **Description**: `API Documentation for LovInIdeas Gift Ideas Platform`
   - **Visibility**: Public (required for free GitHub Pages)
   - **Don't initialize** with README, .gitignore, or license (we already have them)
4. **Click "Create repository"**

### Option B: Using GitHub CLI (if installed)

```bash
# Create repository using GitHub CLI
gh repo create lovinideas-api-docs --public --description "API Documentation for LovInIdeas Gift Ideas Platform"
```

## 🔗 Step 3: Connect Local Repository to GitHub

After creating the GitHub repository, connect your local repository:

```bash
# Add GitHub repository as remote origin
git remote add origin https://github.com/YOUR_USERNAME/lovinideas-api-docs.git

# Verify remote was added
git remote -v

# Push to GitHub
git branch -M main
git push -u origin main
```

**Replace `YOUR_USERNAME`** with your actual GitHub username!

## ⚙️ Step 4: Enable GitHub Pages

1. **Go to Repository Settings**:
   - Navigate to your repository on GitHub
   - Click "Settings" tab (near the top right)

2. **Configure Pages**:
   - Scroll down to "Pages" section in the left sidebar
   - Click "Pages"

3. **Set Source**:
   - **Source**: Select "GitHub Actions"
   - This will use our `.github/workflows/deploy.yml` file

4. **Save Settings**: GitHub will automatically detect the workflow

## 🎯 Step 5: Trigger First Deployment

The deployment will automatically start when you push to the `main` branch. You can also trigger it manually:

1. **Go to Actions Tab**: Click "Actions" in your repository
2. **Find Workflow**: Look for "Deploy VitePress Documentation"
3. **Manual Trigger**: Click "Run workflow" if needed

## ✅ Step 6: Verify Deployment

1. **Check Workflow Status**:
   - Go to "Actions" tab
   - Wait for the green checkmark ✅
   - If there's a red X ❌, click on it to see error details

2. **Access Your Site**:
   - After successful deployment, your site will be available at:
   - `https://YOUR_USERNAME.github.io/lovinideas-api-docs/`

3. **Update Repository Description**:
   - Add the live URL to your repository description
   - Go to repository main page → "About" section → Add website URL

## 🔄 Step 7: Make Updates (Optional)

To update your documentation:

```bash
# Make changes to your files
# Then commit and push

git add .
git commit -m "Update API documentation"
git push origin main
```

The site will automatically rebuild and deploy! 🎉

## 🛠 Troubleshooting

### Common Issues and Solutions

#### ❌ Build Fails

**Error**: `npm ci` fails or build errors

**Solution**:
```bash
# Check package.json is correct
cat package.json

# Ensure all dependencies are listed
npm install --save-dev vitepress
```

#### ❌ Pages Not Enabled

**Error**: "GitHub Pages is not enabled"

**Solution**:
1. Repository must be **public** (for free accounts)
2. Go to Settings → Pages
3. Select "GitHub Actions" as source

#### ❌ 404 Error on Site

**Error**: Site shows 404 or doesn't load

**Solution**:
1. Check if deployment completed successfully
2. Verify the URL: `https://USERNAME.github.io/REPOSITORY-NAME/`
3. Wait a few minutes for DNS propagation

#### ❌ Workflow Permissions Error

**Error**: "Permission denied" in Actions

**Solution**:
1. Go to Settings → Actions → General
2. Scroll to "Workflow permissions"
3. Select "Read and write permissions"
4. Check "Allow GitHub Actions to create and approve pull requests"

### 🔍 Debug Steps

1. **Check Actions Log**:
   - Go to Actions tab
   - Click on failed workflow
   - Expand failed steps to see error details

2. **Verify File Structure**:
   ```bash
   # Your structure should look like this:
   lovinideas-api-docs/
   ├── .github/workflows/deploy.yml
   ├── docs/
   │   ├── .vitepress/config.js
   │   ├── index.md
   │   └── [other docs...]
   ├── package.json
   └── README.md
   ```

3. **Test Locally**:
   ```bash
   # Test the build locally
   npm run docs:build
   
   # If this fails, fix errors before pushing
   ```

## 📞 Need Help?

If you encounter issues:

1. **Check GitHub Status**: [githubstatus.com](https://githubstatus.com)
2. **GitHub Pages Docs**: [docs.github.com/pages](https://docs.github.com/pages)
3. **VitePress Docs**: [vitepress.dev](https://vitepress.dev)
4. **Create Issue**: In your repository's Issues tab

## 🎉 Success!

Once deployed, you'll have:

- ✅ Professional API documentation site
- ✅ Automatic deployments on every push
- ✅ Fast, searchable documentation
- ✅ Mobile-responsive design
- ✅ Custom domain support (if needed)

**Your documentation URL**: `https://YOUR_USERNAME.github.io/lovinideas-api-docs/`

Share this URL for your assignment submission! 🚀

---

**🎁 Congratulations!** You've successfully created and deployed a professional API documentation site for the LovInIdeas platform!