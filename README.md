# 🎮 GameLearn - Gamified Educational Platform

> A visually stunning, feature-rich gamified learning platform built with React + Vite. Master engineering courses through interactive challenges, earn XP, unlock achievements, and compete on global leaderboards!

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-ISC-green)
![Node](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen)
![React](https://img.shields.io/badge/React-18.2.0-61dafb)

---

## 🚀 Quick Start

```bash
# 1. Install all dependencies (creates MongoDB folder automatically)
npm run install:all

# 2. Start MongoDB in a new terminal
mongod --dbpath ./mongodb-data

# 3. Run the full application (backend + frontend)
npm run dev
```

**Then open:** `http://localhost:5173`

📖 **For detailed setup instructions**, see [SETUP.md](./SETUP.md)

---

## ✨ Features

### 🎨 **Gamification**
- ⭐ **XP System** - Earn experience points for every lesson completed
- 🎖️ **Achievement Badges** - Unlock 12+ unique badges & milestones
- 🔥 **Streak Counter** - Maintain daily learning streaks with animated rewards
- 🏆 **Global Leaderboard** - Compete with learners worldwide, sortable by XP/Level/Streak
- 💎 **Coin System** - Earn coins for completing courses & challenges
- 📊 **Level Progression** - Visual level indicators with circular progress

### 📚 **Learning Content**
- 🎓 **12+ Courses** - Engineering disciplines (Web Dev, AI/ML, Cloud, DevOps, etc.)
- 📈 **Progress Tracking** - Visual progress bars on every course
- 🗂️ **Multiple Categories** - Web Development, AI/ML, Cloud, Database, Security, DevOps
- 📝 **Course Cards** - Interactive cards with hover animations, difficulty levels, lesson counts

### 🎬 **Visual Experience**
- 🌙 **Dark Theme** - Eye-friendly dark mode with vibrant accent colors
- ✨ **Smooth Animations** - 20+ custom animations with Framer Motion
- 📱 **Fully Responsive** - Mobile-first design (mobile, tablet, desktop)
- 🎨 **Glassmorphism** - Modern UI with backdrop blur effects
- 🌈 **4-Color Accent Palette** - Green (XP), Yellow (Achievements), Orange (Streaks), Cyan (Leaderboard)

### 🧭 **Navigation**
- 🏠 **Home Page** - Hero section + scrollable course grid + feature highlight
- 👤 **Profile Dashboard** - User stats, achievements showcase, activity timeline
- 📊 **Progress Dashboard** - Learning path visualization + global leaderboard
- ⚙️ **Feature Menu** - Toggleable options for Daily Challenges, Mini-Games, Quizzes, etc.

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-------------|
| **Frontend Framework** | React 18.2.0 |
| **Build Tool** | Vite 5.4.21 |
| **Animation** | Framer Motion 10.16.0 |
| **Routing** | React Router DOM 6.20.0 |
| **HTTP Client** | Axios 1.6.0 |
| **Styling** | CSS Modules (component-scoped) |
| **Package Manager** | npm 10+ |
| **Node Version** | 16+ |

---

## 📦 Project Structure

```
game-learn/
├── src/
│   ├── components/
│   │   ├── common/                    # Reusable UI components
│   │   │   ├── Button.jsx
│   │   │   ├── Button.module.css
│   │   │   ├── Card.jsx
│   │   │   ├── Card.module.css
│   │   │   ├── Badge.jsx
│   │   │   ├── Badge.module.css
│   │   │   ├── ProgressBar.jsx
│   │   │   └── ProgressBar.module.css
│   │   │
│   │   ├── features/
│   │   │   ├── gamification/          # Gamification-specific components
│   │   │   │   ├── XPBar.jsx
│   │   │   │   ├── XPBar.module.css
│   │   │   │   ├── XPPopup.jsx
│   │   │   │   ├── XPPopup.module.css
│   │   │   │   ├── AchievementBadge.jsx
│   │   │   │   ├── AchievementBadge.module.css
│   │   │   │   ├── StreakCounter.jsx
│   │   │   │   ├── StreakCounter.module.css
│   │   │   │   ├── LevelIndicator.jsx
│   │   │   │   └── LevelIndicator.module.css
│   │   │   │
│   │   │   └── courses/
│   │   │       ├── CourseCard.jsx
│   │   │       └── CourseCard.module.css
│   │   │
│   │   ├── Header.jsx
│   │   └── Header.module.css
│   │
│   ├── pages/                         # Page components (one per folder)
│   │   ├── Home/
│   │   │   ├── Home.jsx
│   │   │   └── Home.module.css
│   │   │
│   │   ├── Profile/
│   │   │   ├── Profile.jsx
│   │   │   └── Profile.module.css
│   │   │
│   │   └── Dashboard/
│   │       ├── Dashboard.jsx
│   │       └── Dashboard.module.css
│   │
│   ├── context/
│   │   └── GameContext.jsx            # Global state (user, achievements, notifications)
│   │
│   ├── api/
│   │   ├── mockData.js                # Mock database (courses, users, achievements)
│   │   ├── courseApi.js               # Course API endpoints
│   │   └── userApi.js                 # User/Leaderboard API endpoints
│   │
│   ├── styles/
│   │   ├── global.css                 # Global resets + CSS variables
│   │   └── animations.css             # Keyframe animations (20+)
│   │
│   ├── hooks/                         # Custom React hooks
│   ├── utils/                         # Utility functions
│   ├── assets/                        # Images, icons, etc.
│   │
│   ├── App.jsx                        # Main router & layout
│   ├── App.module.css
│   └── main.jsx                       # Entry point
│
├── public/
├── index.html
├── vite.config.js
├── package.json
├── .gitignore
├── README.md
└── .git/                              # Git repository
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd game-learn

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will open at `http://localhost:5173/`

---

## 📖 Usage Guide

### 🏠 **Home Page**
- View hero section with animated tagline
- Browse 12+ courses in responsive grid layout
- Each course card shows:
  - Course icon & title
  - Difficulty level badge
  - Progress percentage
  - Lesson completion count
  - Interactive hover effects
- Click course cards to trigger animations
- Explore gamification features section

### 👤 **Profile Page**
- **User Header**: Avatar, level badge, username
- **XP Progress Bar**: Visual representation of current XP toward next level
- **Stat Cards**: Total XP, Coins, Achievements, Current Level
- **Streak Counter**: Current streak with fire animation
- **Achievement Grid**: 12 unlocked and locked badges with descriptions
- **Activity Timeline**: Timeline of recent learning activities

### 📊 **Dashboard Page**
- **Tab 1 - Progress:**
  - Learning path showing all courses with progress bars
  - Skills breakdown by category (Web Dev, AI/ML, Cloud, etc.)
  - Weekly activity chart showing XP earned per day
  
- **Tab 2 - Leaderboard:**
  - Global rankings of top 15 learners
  - Medal icons for top 3 (Gold, Silver, Bronze)
  - Sort by: XP | Level | Streak
  - Highlighted current user row
  - Animated entrance animations for leaderboard entries

### ⚙️ **Navigation**
- **Top Header**: Logo, nav links, Features dropdown menu
- **Features Menu**: Toggle to see placeholders for (Daily Challenges, Mini-Games, Quizzes, Leaderboards, Notifications, Settings)
- **Mobile Menu**: Hamburger menu opens fullscreen sidebar on mobile/tablet

---

## 🎨 Design System

### Color Palette

```css
/* Dark Theme Base */
--primary-dark: #0F0F23          /* Deepest dark blue */
--secondary-dark: #1A1A2E        /* Dark blue-gray */
--card-bg: #2D2D44               /* Card background */
--card-border: #3D3D54           /* Card border */
--text-primary: #E8E8F0          /* Main text (off-white) */
--text-secondary: #6B6B8F        /* Secondary text */

/* Accent Colors - Gamification */
--accent-xp: #39FF14             /* XP: Lime Green */
--accent-achievement: #FFD700    /* Achievements: Golden Yellow */
--accent-streak: #FF6B6B         /* Streaks: Coral Orange */
--accent-leaderboard: #00D4FF    /* Leaderboard: Electric Cyan */
--accent-secondary: #FF00FF      /* Magenta for highlights */
```

### Spacing Scale
- `--spacing-xs`: 4px
- `--spacing-sm`: 8px
- `--spacing-md`: 16px
- `--spacing-lg`: 24px
- `--spacing-xl`: 32px
- `--spacing-2xl`: 48px

### Animations (20+)
- **Entrance**: `fadeIn`, `slideInUp`, `slideInDown`, `popIn`, `scaleIn`
- **Floating**: `float`, `bounce`, `pulse`
- **Gamification**: `floatUp`, `xpGain`, `levelUp`, `badgeUnlock`
- **Effects**: `glow`, `glowAchievement`, `glowStreak`, `shimmer`
- **Progress**: `progressFill`, `progressShine`

---

## 🔧 Available Scripts

```bash
# Development server (auto-reload)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 📊 Mock Data

### Courses (12+)
- React Fundamentals, JavaScript Essentials, Advanced CSS
- Data Structures & Algorithms, Machine Learning Basics
- Node.js & Express, Database Design, Cloud Computing
- DevOps & CI/CD, System Design, Web Security, GraphQL

### Achievements (12)
- First Steps, Week Warrior, Course Master, Quiz Champion
- Night Owl, Speedrunner, Helpful Hero, Milestone Master
- Community Star, Perfect Score, Knowledge Keeper, Legendary Learner

### Leaderboard (15+ users)
- Ranked users with Level, Total XP, and Streak data
- Mock data for realistic competition visualization

All data is stored in `src/api/mockData.js` and easily replaceable with real API calls.

---

## 🔌 API Integration

### Current State
- Mock API layer with simulated delays (300-500ms)
- All API functions return promises for async/await compatibility

### Mock API Functions

#### Courses
```javascript
getCourses()                      // Get all courses
getCourseById(id)                 // Get specific course
searchCourses(query)              // Search courses
getCoursesByCategory(category)    // Filter by category
getCoursesProgress()              // Get user progress
completeCourse(courseId)          // Mark course complete
completeLesson(courseId, lessonId) // Mark lesson complete
```

#### Users & Leaderboard
```javascript
getLeaderboard(sortBy, limit)     // Get leaderboard (sortBy: 'totalXP', 'level', 'streak')
searchLeaderboard(query)          // Search users
getAchievements()                 // Get all achievements
getUserProgress()                 // Get learning path
getSkills()                       // Get skill breakdown
getWeeklyStats()                  // Get weekly activity data
```

### Future Backend Integration
Replace `src/api/mockData.js` with real API calls:

```javascript
// Example: Replace mock with real API
export const getCourses = async () => {
  const response = await axios.get('/api/courses')
  return response.data
}
```

---

## 🌐 Global State Management

### GameContext
Located in `src/context/GameContext.jsx`

**User State:**
```javascript
{
  id: 1,
  name: 'Alex Developer',
  avatar: '👨‍💻',
  level: 12,
  currentXP: 2850,
  totalXP: 5000,
  coins: 1240,
  streakDays: 7,
  achievements: [...]
}
```

**Context Methods:**
- `addXP(amount)` - Add experience points
- `addCoins(amount)` - Add coins
- `unlockAchievement(achievementId)` - Unlock specific badge
- `updateStreak(days)` - Update streak counter
- `addNotification(message, type)` - Toast notifications

**Usage in Components:**
```javascript
const { user, addXP, unlockAchievement } = useGame()
```

---

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px (single column layout)
- **Tablet**: 768px - 1024px (2-column layout)
- **Desktop**: > 1024px (3-4 column layout)

All pages are optimized for each breakpoint with adapted navigation and layouts.

---

## 🐛 Known Limitations

- Features menu items (Daily Challenges, Mini-Games, etc.) are UI-only placeholders
- Quiz implementation not included (ready for future expansion)
- Notifications are mock-only (no real backend integration)
- Theme toggle is hard-coded to dark mode (can be extended)
- No real user authentication (mock login ready for integration)

---

## 🚀 Future Enhancements

- [ ] Real user authentication (JWT, OAuth)
- [ ] Backend database connection (MongoDB/PostgreSQL)
- [ ] Live leaderboard updates (WebSockets)
- [ ] Interactive mini-games & quizzes
- [ ] Sound effects & notifications (Howler.js)
- [ ] Dark/Light theme toggle
- [ ] Mobile app (React Native)
- [ ] Real-time collaboration features
- [ ] Analytics dashboard for course creators
- [ ] Community forums & peer reviews

---

## 📂 Component Documentation

### Page Components

#### `Home.jsx`
Hero section with animated background orbs, course grid with 12+ cards, features showcase, and CTA sections.

#### `Profile.jsx`
User dashboard displaying stats, XP progress, achievement grid, and activity timeline.

#### `Dashboard.jsx`
Tabbed interface with learning path, skills breakdown, weekly activity chart, and global leaderboard.

### Feature Components

#### `CourseCard.jsx`
Interactive course card with icon, title, category, progress bar, difficulty badge, and play button.

#### `XPBar.jsx`
Visual XP progress indicator with level display and next level threshold.

#### `StreakCounter.jsx`
Animated streak display with fire icon, current count, and progress toward max streak.

#### `AchievementBadge.jsx`
Achievement badge component with icon, name, description, and lock/unlock states.

#### `LevelIndicator.jsx`
Circular SVG progress indicator showing current level with smooth animations.

---

## 🤝 Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit changes (`git commit -m 'Add amazing feature'`)
3. Push to branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

---

## 📄 License

This project is licensed under the ISC License - see `package.json` for details.

---

## 📧 Contact & Support

For questions, bug reports, or feature requests, please open an issue in the repository.

---

## 🙏 Acknowledgments

- Built with **React 18** & **Vite** for lightning-fast development
- Animations powered by **Framer Motion**
- Styling with **CSS Modules** for scalability
- Inspired by modern gamification patterns from industry leaders

---

## 📸 Screenshots

### 🏠 Home Page
Interactive hero section with scrollable course cards, smooth parallax animations, and feature highlights.

### 👤 Profile Page
User dashboard with animated stats, achievement showcase, and activity timeline.

### 📊 Dashboard Page
Tabbed interface with learning progress tracking and global leaderboard with sorting options.

---

**Happy Learning! 🚀** The best way to master engineering is to make it fun!
