# Blog Website - Code Structure

## Project Overview
A React-based blog website built with React Router for navigation. The project uses lazy loading for code splitting and includes multiple pages for real estate content (Buy, Rent, Investment, Legal, Tips) along with standard blog functionality.

## Technology Stack
- **React** 18.2.0
- **React Router DOM** 6.20.0
- **React Scripts** 5.0.1 (Create React App)

## Directory Structure

```
blogwebsite/
├── public/
│   ├── images/
│   │   ├── cities/          # City-specific images (10 cities)
│   │   └── *.jpg            # Banner images, logos, hero images
│   └── index.html
│
├── src/
│   ├── components/          # Reusable UI components
│   ├── pages/              # Page components (routes)
│   ├── App.jsx             # Main app component with routing
│   ├── App.css             # Global app styles
│   ├── index.js            # Application entry point
│   └── index.css           # Global styles
│
├── package.json
└── README.md
```

## Core Files

### Entry Point
- **`src/index.js`** - Application entry point, renders App component with React StrictMode

### Main Application
- **`src/App.jsx`** - Main application component
  - Sets up React Router with BrowserRouter
  - Implements lazy loading for all page components
  - Defines all application routes
  - Includes Navbar and Footer components
  - Suspense fallback for loading states

- **`src/App.css`** - Global application styles

## Components (`src/components/`)

### Navigation & Layout
- **Navbar.jsx / Navbar.css** - Main navigation component
- **Footer.jsx / Footer.css** - Footer component

### Hero Sections
- **Hero.jsx / Hero.css** - Generic hero component
- **HomeHero.jsx / HomeHero.css** - Home page hero section
- **BlogHero.jsx / BlogHero.css** - Blog page hero section
- **AboutHero.jsx / AboutHero.css** - About page hero section

### Blog Components
- **BlogCard.jsx / BlogCard.css** - Individual blog post card
- **FeaturedBlogCard.jsx / FeaturedBlogCard.css** - Featured blog post card
- **BlogCategoryCard.jsx / BlogCategoryCard.css** - Blog category card
- **BlogSidebar.jsx / BlogSidebar.css** - Blog sidebar component
- **BlogCTA.jsx / BlogCTA.css** - Blog call-to-action component

### Content Sections
- **Categories.jsx / Categories.css** - Category listing component
- **CitiesGrid.jsx / CitiesGrid.css** - Grid display of cities
- **CityWiseSection.jsx / CityWiseSection.css** - City-specific content section
- **WelcomeSection.jsx / WelcomeSection.css** - Welcome/intro section
- **MissionVision.jsx / MissionVision.css** - Mission and vision section
- **OurStory.jsx / OurStory.css** - About/Story section
- **WhyChoose.jsx / WhyChoose.css** - Why choose us section

### Contact Components
- **ContactForm.jsx / ContactForm.css** - Contact form component
- **ContactHeader.jsx / ContactHeader.css** - Contact page header
- **ContactInfo.jsx / ContactInfo.css** - Contact information display

## Pages (`src/pages/`)

All pages follow the pattern: `PageName.jsx` with corresponding `PageName.css`

### Main Pages
- **Home.jsx** - Landing/home page (`/`)
- **Blog.jsx** - Blog listing page (`/blog`)
- **Post.jsx** - Individual blog post page (`/post`)

### Content Pages
- **About.jsx** - About page (`/about`)
- **Contact.jsx** - Contact page (`/contact`)

### Real Estate Pages
- **Buy.jsx** - Buy property page (`/buy`)
- **Rent.jsx** - Rent property page (`/rent`)
- **Investment.jsx** - Investment page (`/investment`)
- **Legal.jsx** - Legal information page (`/legal`)
- **Tips.jsx** - Tips page (`/tips`)

### Legal/Policy Pages
- **Privacy.jsx** - Privacy policy page (`/privacy`)

## Public Assets (`public/`)

### Images
- **Banner Images**: Banner1.jpg, Banner2.jpg, Banner3.jpg, Banner4.jpg
- **Hero Images**: Abouthero.jpg
- **Logo**: logo.png, browserlogo.jpg
- **Cities**: 10 city images in `cities/` folder
  - Ahmedabad, Bangalore, Chennai, Delhi, Hyderabad
  - Jaipur, Kolkata, Mumbai, Pune, Surat

## Routing Structure

The application uses React Router with the following routes:

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | Home | Landing page |
| `/blog` | Blog | Blog listing page |
| `/post` | Post | Individual blog post |
| `/about` | About | About page |
| `/contact` | Contact | Contact page |
| `/buy` | Buy | Buy property page |
| `/rent` | Rent | Rent property page |
| `/investment` | Investment | Investment page |
| `/legal` | Legal | Legal information |
| `/tips` | Tips | Tips page |
| `/privacy` | Privacy | Privacy policy |

## Code Splitting

All page components are lazy-loaded using React's `lazy()` function for optimal performance:
- Reduces initial bundle size
- Loads pages on-demand
- Includes Suspense fallback for loading states

## Styling Approach

- Each component has its own CSS file
- Global styles in `index.css` and `App.css`
- Component-scoped styles in respective `.css` files

## Build & Development

- **Development**: `npm start` - Runs development server
- **Build**: `npm run build` - Creates production build
- **Test**: `npm test` - Runs test suite
