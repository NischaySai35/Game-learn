# Quick Start Guide

Get Game-Learn up and running in 5 minutes! 🚀

## Prerequisites

- **Node.js**: Version 16.x or higher
- **npm**: Comes with Node.js
- **Git**: For cloning the repository

Check versions:
```bash
node --version
npm --version
git --version
```

## Installation

### 1. Clone the Repository

```bash
# Clone via HTTPS
git clone https://github.com/NischaySai35/Game-learn.git

# Or clone via SSH
git clone git@github.com:NischaySai35/Game-learn.git

# Or clone your fork
git clone https://github.com/YOUR-USERNAME/Game-learn.git
```

### 2. Navigate to Project

```bash
cd Game-learn
```

### 3. Install Dependencies

```bash
npm install
```

This installs:
- React 18.2.0
- Vite 5.4.21
- Framer Motion 10.16.0
- React Router DOM 6.20.0
- Axios 1.6.0

## Development

### Start Development Server

```bash
npm run dev
```

Output:
```
VITE v5.4.21  ready in 320 ms

➜  Local:   http://localhost:5173/
➜  press h + enter to show help
```

Open [http://localhost:5173/](http://localhost:5173/) in your browser.

### Hot Module Replacement

Changes to files are instantly reflected in the browser. No manual refresh needed!

### Stop Development Server

```
Press Ctrl + C
```

## Building for Production

### Create Optimized Build

```bash
npm run build
```

Creates `dist/` folder with optimized production files.

### Preview Production Build

```bash
npm run preview
```

Shows how the production build looks locally.

## Project Navigation

### Pages

- **Home** (`/`): Course catalog and hero section
- **Profile** (`/profile`): User dashboard and achievements
- **Dashboard** (`/dashboard`): Progress tracking and leaderboard

### Key Folders

```
src/
├── components/         # Reusable components
├── pages/             # Page components
├── context/           # Global state (GameContext)
├── api/               # Mock API endpoints
└── styles/            # Global styles and animations
```

## Key Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

## Customize

### Environment Variables

Create `.env.local`:

```bash
cp .env.example .env.local
```

Edit `.env.local` to customize settings.

### Colors

Edit `src/styles/global.css` to change the color scheme:

```css
:root {
  --primary-dark: #0F0F23;
  --accent-xp: #39FF14;
  /* etc... */
}
```

### Add New Page

1. Create folder: `src/pages/PageName/`
2. Create files: `PageName.jsx` and `PageName.module.css`
3. Import in `src/App.jsx` and add route:

```javascript
import NewPage from './pages/NewPage/NewPage'

// Inside Routes
<Route path="/newpage" element={<NewPage />} />
```

## Common Issues

### Port 5173 Already in Use

```bash
# Kill the process (Windows)
npx kill-port 5173

# Or use different port
npm run dev -- --port 3000
```

### Dependencies Not Installing

```bash
# Clear npm cache
npm cache clean --force

# Reinstall
rm -rf node_modules package-lock.json
npm install
```

### Changes Not Reflecting

```bash
# Hard refresh
Ctrl + Shift + R  (Windows/Linux)
Cmd + Shift + R   (Mac)

# Or in DevTools: Disable cache while DevTools open
```

### Console Errors

1. Open browser DevTools: `F12`
2. Go to Console tab
3. Look for red error messages
4. Check the line number in the error
5. Fix the issue

## Next Steps

- 📖 Read [README.md](README.md) for comprehensive guide
- 🤝 Check [CONTRIBUTING.md](CONTRIBUTING.md) to contribute
- 💡 See [CHANGELOG.md](CHANGELOG.md) for version history
- 🔒 Review [SECURITY.md](SECURITY.md) for security practices

## Getting Help

- **Documentation**: See [README.md](README.md)
- **Issues**: Search [GitHub Issues](https://github.com/NischaySai35/Game-learn/issues)
- **Discussions**: Start a [discussion](https://github.com/NischaySai35/Game-learn/discussions)
- **Contributing**: See [CONTRIBUTING.md](CONTRIBUTING.md)

## Tips for Success

✅ **Do:**
- Run `npm install` after pulling latest changes
- Test in multiple browsers
- Check browser console for errors
- Read existing documentation
- Ask questions in discussions

❌ **Don't:**
- Modify files without understanding them first
- Ignore console errors or warnings
- Make changes directly to production
- Skip testing before submitting PRs

## Browser Support

- Chrome/Chromium (90+)
- Firefox (88+)
- Safari (14+)
- Edge (90+)

## Device Support

- Desktop (1920x1080+)
- Tablet (768x1024)
- Mobile (375x667)

---

**Ready to start?** Open [http://localhost:5173/](http://localhost:5173/) after running `npm run dev`!

For more details, see [README.md](README.md) and [CONTRIBUTING.md](CONTRIBUTING.md).

**Happy coding!** 🎮📚✨
