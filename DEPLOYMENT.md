# 📦 Deployment Guide for GitHub Pages

This guide will help you deploy the ZenFlip app to GitHub Pages.

## Prerequisites

- Node.js installed on your computer (v14 or higher)
- Git installed on your computer
- A GitHub account
- Your repository cloned locally

## Step-by-Step Deployment

### 1. Install Dependencies

First, install all required packages:

```bash
npm install
```

This will install:
- React and React DOM
- Framer Motion for animations
- Vite build tool
- gh-pages deployment tool
- TypeScript and other development dependencies

### 2. Test Locally (Optional but Recommended)

Before deploying, you can test the app locally:

```bash
# Run development server
npm run dev
```

Visit `http://localhost:3000/ZenFlip/` in your browser to see the app.

### 3. Build the App

Create the production build:

```bash
npm run build
```

This command:
- Compiles TypeScript to JavaScript
- Bundles all React components
- Optimizes and minifies code
- Creates a `dist` folder with static files ready for deployment

### 4. Deploy to GitHub Pages

Deploy the built files to GitHub Pages:

```bash
npm run deploy
```

This command will:
1. Run the build process
2. Create a `gh-pages` branch (if it doesn't exist)
3. Push the contents of the `dist` folder to the `gh-pages` branch

### 5. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings**
3. Scroll down to **Pages** section in the left sidebar
4. Under "Source", select `gh-pages` branch
5. Click **Save**
6. Wait a few minutes for GitHub to deploy

Your site will be available at:
```
https://<your-username>.github.io/ZenFlip/
```

## One-Command Deploy

For convenience, you can deploy with a single command:

```bash
npm run deploy
```

This will automatically build and deploy your app.

## Troubleshooting

### Blank Page After Deployment

If you see a blank page after deployment:
1. Check browser console for errors (F12 → Console tab)
2. Verify that the base path in `vite.config.ts` matches your repository name
3. Make sure you selected the `gh-pages` branch in GitHub Pages settings

### 404 Errors for Assets

If CSS/JS files return 404 errors:
1. Verify the `base` configuration in `vite.config.ts` is set to `/ZenFlip/`
2. Rebuild and redeploy: `npm run deploy`

### Build Errors

If you encounter build errors:
1. Delete `node_modules` and `package-lock.json`
2. Run `npm install` again
3. Try building again: `npm run build`

## Configuration Details

### Base Path Configuration

The `base` path in `vite.config.ts` must match your repository name:

```typescript
export default defineConfig({
  base: '/ZenFlip/',  // Must match repository name
  // ... other config
});
```

If you fork this repository and rename it, update the base path accordingly.

### Custom Domain (Optional)

If you want to use a custom domain:
1. Add a `CNAME` file to the `public` folder with your domain
2. Configure DNS settings with your domain provider
3. Update the `base` path in `vite.config.ts` to `/`

## Development Workflow

```bash
# Install dependencies (first time only)
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Deploy to GitHub Pages
npm run deploy
```

## Additional Resources

- [Vite Documentation](https://vitejs.dev/)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [gh-pages Package](https://www.npmjs.com/package/gh-pages)

---

For issues or questions, please open an issue on the GitHub repository.
