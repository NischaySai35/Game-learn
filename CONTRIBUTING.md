# Contributing to Game-Learn

Thank you for your interest in contributing to **Game-Learn**! We welcome contributions from the community that help improve this gamified educational learning platform. This document provides guidelines and instructions for contributing.

## 🚀 Quick Start for New Contributors

### **First Time? Just Run These 3 Commands!**

```bash
# 1. Clone the repo (you already have it)
git clone <repo-url>
cd Game-learn

# 2. Install everything (MongoDB folder created automatically)
npm run install:all

# 3. Start developing
npm run dev
```

**Done!** Open `http://localhost:5173` in your browser.

> ✨ **That's it!** The setup script automatically creates:
> - MongoDB data folder
> - Log directories  
> - Environment files (from templates)
>
> No manual folder creation needed!

**For detailed instructions**, see [SETUP.md](./SETUP.md)

---

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How to Contribute](#how-to-contribute)
- [Development Setup](#development-setup)
- [Branch Naming Convention](#branch-naming-convention)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Pull Request Process](#pull-request-process)
- [Coding Guidelines](#coding-guidelines)
- [Testing](#testing)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Features](#suggesting-features)

## Code of Conduct

We are committed to providing a welcoming and inspiring community for all. By participating in this project, you agree to:

- Be respectful of different viewpoints and experiences
- Be constructive and positive in feedback
- Focus on improving the project and community
- Report unacceptable behavior to [project maintainers]

## How to Contribute

### Ways to Contribute

1. **Report Bugs**: Found a bug? Report it in the Issues section
2. **Suggest Features**: Have ideas for new features? Share them as issue discussions
3. **Improve Documentation**: Help us improve README, guides, and code comments
4. **Fix Bugs**: Submit PRs that fix reported bugs
5. **Implement Features**: Contribute new features that align with the project vision
6. **Improve Performance**: Optimize code and components for better performance
7. **Add Tests**: Help improve code coverage and reliability

## Development Setup

### Prerequisites

- Node.js >= 16.x
- npm or yarn package manager
- Git

### Local Setup Steps

1. **Fork the Repository**
   ```bash
   # Visit https://github.com/NischaySai35/Game-learn and click "Fork"
   ```

2. **Clone Your Fork**
   ```bash
   git clone https://github.com/YOUR-USERNAME/Game-learn.git
   cd Game-learn
   ```

3. **Add Upstream Remote**
   ```bash
   git remote add upstream https://github.com/NischaySai35/Game-learn.git
   ```

4. **Install Dependencies**
   ```bash
   npm install
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```
   The application runs at `http://localhost:5173/`

6. **Create a Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Branch Naming Convention

Use clear, descriptive branch names following this pattern:

```
<type>/<short-description>

Types:
- feature/    (New features)
- bugfix/     (Bug fixes)
- hotfix/     (Critical bug fixes for production)
- refactor/   (Code refactoring)
- docs/       (Documentation updates)
- test/       (Tests and test improvements)
- chore/      (Maintenance tasks, dependencies)
```

**Examples:**
```
feature/dark-mode-toggle
bugfix/fix-xp-calculation
docs/update-api-documentation
test/add-component-tests
```

## Commit Message Guidelines

Follow the Conventional Commits format for clear, consistent commit history:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Format Explanation

- **type**: feat, fix, docs, style, refactor, test, chore
- **scope**: Component or feature affected (optional but recommended)
- **subject**: Concise description (50 chars max, imperative mood)
- **body**: Detailed explanation (72 chars per line, optional)
- **footer**: References to issues, breaking changes (optional)

### Examples

```
feat(authentication): add user login system
- Implement JWT-based authentication
- Add login form component
- Integrate with backend API
Closes #123

fix(leaderboard): correct ranking calculation

docs(readme): update installation instructions

refactor(components): simplify XPBar component
BREAKING CHANGE: XPBar props renamed for clarity
```

## Pull Request Process

### Before Submitting

1. **Keep Your Fork Updated**
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Follow Coding Guidelines** (see below)

3. **Test Your Changes**
   ```bash
   npm run dev
   # Manually test all affected pages/components
   npm run build
   # Ensure production build succeeds
   ```

4. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "feat(scope): description"
   git push origin feature/your-feature-name
   ```

### Pull Request Checklist

When creating a PR, ensure:

- [ ] Branch is up-to-date with `main`
- [ ] Commits follow the commit message guidelines
- [ ] Code follows the project's coding style
- [ ] No console errors or warnings
- [ ] Changes are tested manually
- [ ] PR description explains the changes and motivation
- [ ] Related issues are referenced (#123)
- [ ] No breaking changes (or documented if necessary)
- [ ] Screenshots/GIFs added for UI changes

### PR Title Format

Use this format for PR titles:

```
[TYPE] Brief description

Types:
- [FEATURE] New feature
- [BUGFIX] Bug fix
- [REFACTOR] Code refactoring
- [DOCS] Documentation update
```

**Example:**
```
[FEATURE] Add daily challenges system
```

### PR Description Template

```markdown
## Description
Brief explanation of what this PR does.

## Type of Change
- [ ] New feature
- [ ] Bug fix
- [ ] Breaking change
- [ ] Documentation update

## Related Issues
Closes #123

## Changes Made
- Specific change 1
- Specific change 2
- Specific change 3

## Screenshots (if applicable)
[Add screenshots for UI changes]

## Testing Done
Describe how you tested these changes.

## Checklist
- [ ] My code follows the style guidelines
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code where unclear
- [ ] No new warnings generated
- [ ] My changes produce no new errors
```

## Coding Guidelines

### JavaScript/React Standards

1. **Use ES6+ Features**
   ```javascript
   // Good
   const Component = ({ prop }) => {
     return <div>{prop}</div>
   }

   // Avoid
   const Component = function(props) {
     return React.createElement('div', null, props.prop)
   }
   ```

2. **Component Structure**
   ```
   src/components/FeatureName/
   ├── FeatureName.jsx        (Component logic)
   ├── FeatureName.module.css (Styling)
   └── index.js              (Export)
   ```

3. **Naming Conventions**
   - Components: PascalCase (Button.jsx, UserProfile.jsx)
   - Functions/Variables: camelCase (handleClick, userData)
   - CSS Classes: camelCase (containerStyles, headerActive)
   - Constants: UPPER_SNAKE_CASE (API_ENDPOINT, MAX_RETRIES)

4. **File Organization**
   ```javascript
   // Imports at top
   import React, { useState } from 'react'
   import styles from './Component.module.css'

   // Component
   const Component = ({ prop }) => {
     // Logic
     return <div className={styles.container}>{prop}</div>
   }

   // Export at bottom
   export default Component
   ```

5. **Prop Validation**
   ```javascript
   // Add JSDoc comments
   /**
    * Button component with multiple variants
    * @param {string} label - Button text
    * @param {function} onClick - Click handler
    * @param {string} variant - Button style variant
    */
   const Button = ({ label, onClick, variant = 'primary' }) => {
     // Implementation
   }
   ```

### CSS Guidelines

1. **Use CSS Modules**
   - Scope styles to components
   - Avoid global namespace pollution
   - Use `className={styles.className}`

2. **Color Consistency**
   - Use CSS variables from `global.css`
   - Don't hardcode colors
   ```css
   color: var(--accent-xp); /* Good */
   color: #39FF14;          /* Avoid */
   ```

3. **Responsive Design**
   - Mobile-first approach
   - Test on multiple breakpoints
   - Use media queries consistently

4. **Animation Best Practices**
   - Use Framer Motion for complex animations
   - Use CSS transitions for simple interactions
   - Consider performance and accessibility

### Performance Considerations

1. **Lazy Load Components**
   ```javascript
   const Dashboard = React.lazy(() => import('./Dashboard'))
   ```

2. **Optimize Re-renders**
   - Use proper dependency arrays in hooks
   - Memoize expensive computations
   - Implement shouldComponentUpdate or React.memo

3. **API Calls**
   - Implement proper error handling
   - Add loading states
   - Cache responses when appropriate

## Testing

### Manual Testing Checklist

Before submitting a PR:

1. **Browser Compatibility**
   - [ ] Chrome/Chromium
   - [ ] Firefox
   - [ ] Safari
   - [ ] Edge

2. **Device Testing**
   - [ ] Desktop (1920x1080)
   - [ ] Tablet (768x1024)
   - [ ] Mobile (375x667)

3. **Feature Testing**
   - [ ] All new features work as expected
   - [ ] No console errors/warnings
   - [ ] Related features still work
   - [ ] Animations are smooth
   - [ ] Loading states appear/disappear correctly

## Reporting Bugs

### Bug Report Format

When reporting a bug, create an issue with:

```markdown
## Description
Clear description of the bug.

## Steps to Reproduce
1. Navigate to...
2. Click on...
3. Observe...

## Expected Behavior
What should happen.

## Actual Behavior
What actually happens.

## Screenshots/Video
[Attach if applicable]

## Environment
- Browser: Chrome 120
- Device: Desktop/Mobile/Tablet
- OS: Windows/Mac/Linux

## Severity
- [ ] Critical (application breaks)
- [ ] High (major feature broken)
- [ ] Medium (feature degraded)
- [ ] Low (cosmetic issue)
```

## Suggesting Features

### Feature Request Format

```markdown
## Feature Description
Clear explanation of the feature.

## Motivation
Why is this feature important?

## Proposed Implementation
(Optional) How you think it should be implemented.

## Benefits
What problem does this solve?

## Alternatives
(Optional) Other solutions considered.
```

## Questions?

- **Documentation**: Check the [README](README.md)
- **Discussions**: Start a discussion in Issues
- **Contact**: Reach out to project maintainers

## Recognition

Contributors will be recognized in:
- The project's README under "Contributors" section
- Commit history
- Release notes

Thank you for contributing to make Game-Learn better! 🚀

---

**Last Updated**: 2024
**Version**: 1.0
