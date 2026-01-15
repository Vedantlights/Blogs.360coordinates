# BlogWeb - React Application

A modern React-based blog website for real estate insights and property information in India.

## Features

- 🏠 Property blog categories (Buy, Rent, Investment, Legal, Tips)
- 📱 Fully responsive design
- ⚡ Built with Create React App
- 🎨 Beautiful UI with smooth animations
- 🔄 Client-side routing with React Router

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open your browser and navigate to `http://localhost:3000`

The page will reload if you make edits. You will also see any lint errors in the console.

### Build for Production

```bash
npm run build
```

Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

### Running Tests

```bash
npm test
```

Launches the test runner in interactive watch mode.

## Project Structure

```
src/
├── components/       # Reusable React components
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── Hero.jsx
│   ├── Categories.jsx
│   └── BlogCard.jsx
├── pages/           # Page components
│   ├── Home.jsx
│   ├── Post.jsx
│   ├── About.jsx
│   ├── Contact.jsx
│   ├── Buy.jsx
│   ├── Rent.jsx
│   ├── Investment.jsx
│   ├── Legal.jsx
│   └── Tips.jsx
├── App.jsx          # Main app component with routing
├── main.jsx         # Entry point
└── index.css        # Global styles
```

## Technologies Used

- React 18
- React Router DOM 6
- Vite
- CSS3 with CSS Variables

## Available Routes

- `/` - Home page with featured blog posts
- `/buy` - Buy property category
- `/rent` - Rent property category
- `/investment` - Investment category
- `/legal` - Legal guides category
- `/tips` - Tips and tricks category
- `/post` - Individual blog post page
- `/about` - About page
- `/contact` - Contact page

## License

Copyright © 2026 blogs.indiapropertys.com

