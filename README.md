# SmartChef - React Recipe Finder & Meal Planner

A modern, fully-featured React application for discovering recipes, planning meals, and generating shopping lists. This project was converted from a static HTML/CSS/JavaScript site to a dynamic React application with routing, context management, and interactive features.

## Features

- 🔐 **Authentication System** - Login/Signup with persistent sessions
- 🌙 **Dark Mode** - Toggle between light and dark themes
- 🍽️ **Recipe Discovery** - Browse and view detailed recipes
- 📅 **Meal Planner** - Drag-and-drop weekly meal planning
- 🛒 **Shopping List** - Auto-generated from your meal plan
- 🤖 **AI Recipe Generator** - Mock AI-powered recipe suggestions
- 📱 **Responsive Design** - Works seamlessly on all devices

## Tech Stack

- **React 18** - Modern React with hooks
- **React Router 6** - Client-side routing
- **Vite** - Fast build tool and dev server
- **Context API** - State management for auth, dark mode, and planner
- **CSS Variables** - Dynamic theming
- **Font Awesome** - Icon library

## Project Structure

```
smartchef-react/
├── src/
│   ├── components/
│   │   ├── AIGenerator.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── Layout.jsx
│   │   └── ProtectedRoute.jsx
│   ├── contexts/
│   │   ├── AuthContext.jsx
│   │   ├── DarkModeContext.jsx
│   │   └── PlannerContext.jsx
│   ├── pages/
│   │   ├── About.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Planner.jsx
│   │   └── RecipeDetail.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index-old.html
├── package.json
├── vite.config.js
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository or navigate to the project directory:
```bash
cd "msd project2"
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

### Build for Production

To create a production build:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## Usage

### Authentication

1. Visit the app and you'll be redirected to the login page
2. Create an account or login with any email/password
3. Your session will be saved in localStorage

### Meal Planning

1. Navigate to the "Meal Planner" page
2. Drag recipes from the left sidebar to specific days
3. Click "Generate Shopping List" to see all required ingredients
4. Use "Clear Plan" to start over

### Dark Mode

Click the moon/sun icon in the header to toggle between light and dark themes. Your preference is saved automatically.

### AI Recipe Generator

1. On the home page, scroll to the "AI Recipe Generator" section
2. Enter ingredients you have (comma-separated)
3. Click "Generate Recipe" to get a mock AI-generated recipe

## Key Features Explained

### Context Providers

- **AuthContext**: Manages user authentication state and localStorage persistence
- **DarkModeContext**: Handles theme switching and saves preference
- **PlannerContext**: Manages meal plan state, shopping list generation, and recipe data

### Protected Routes

Pages like Home, About, Planner, and Recipe Details are protected and require authentication. Unauthenticated users are redirected to the login page.

### Drag and Drop

The meal planner uses HTML5 drag and drop API to allow intuitive recipe placement on specific days of the week.

## Original Project Files

The original HTML, CSS, and JavaScript files are preserved in the project directory:
- `index.html`, `about.html`, `login.html`, `planner.html`, `recipe1-5.html`
- `styles.css`
- `script.js`

These can be used as reference but are not used in the React application.

## Future Enhancements

- Integration with a real recipe API
- User profile and favorites
- Export meal plans as PDF
- Social sharing features
- Recipe ratings and reviews
- Nutritional information
- Dietary preference filtering

## License

This project is for educational purposes. Feel free to use and modify as needed.

## Acknowledgments

- Images from Unsplash and Bing
- Icons from Font Awesome
- Built with React and Vite

