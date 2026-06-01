#  Weather App

A modern, minimalist real-time weather application that provides current conditions, 5-day forecasts, and location-based weather tracking. Built with React 19, Vite, and Tailwind CSS.

##  Features

### Current Weather
- **Real-time temperature** with Celsius units
- **"Feels like" temperature** for accurate comfort level
- **High/Low temperatures** for the day
- **Weather conditions** with dynamic icons
- **Detailed metrics**: Humidity, Wind Speed, Pressure, Visibility

### Forecast
- **5-day weather forecast** (3-hour intervals)
- **Daily high/low temperatures**
- **Weather condition icons** for each day
- **Date and weekday display**

### Location Features
- **Automatic geolocation** - Get weather for your current location
- **Smart fallback** - Manila, Philippines as default if location is disabled
- **Persistent preferences** - Remembers your location choice
- **Location permission modal** - User-friendly permission request

### Search Functionality
- **City search worldwide** - Search any city by name
- **Instant feedback** - Toast notifications for invalid cities
- **Preserves current weather** - Failed searches don't clear existing data
- **Keyboard support** - Press Enter to search

### UI/UX Design
- **Dark mode UI** - Eye-friendly dark theme with high contrast
- **Mobile-first responsive** - Perfect on phones, tablets, and desktops
- **Card-based layout** - Clean, scannable information hierarchy
- **Grid system** - Organized, structured layout
- **Smooth animations** - Subtle transitions and loading states
- **Toast notifications** - Non-intrusive error messages

##  Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 19** | UI Framework |
| **Vite** | Build tool & Dev server |
| **Tailwind CSS 4** | Styling |
| **Axios** | API requests |
| **Lucide React** | Icons |
| **OpenWeatherMap API** | Weather data |

##  Live Demo

[View Live Demo](https://ej-weather-app.netlify.app) 

##  Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager
- OpenWeatherMap API key ([Get free key](https://openweathermap.org/api))

##  Installation

### 1. Clone the repository

git clone https://github.com/eljohnluar/weather-app.git
cd weather-app
2. Install dependencies
bash
npm install
3. Get an API key
Go to OpenWeatherMap

Sign up for a free account

Navigate to "API Keys" section

Copy your default API key (or generate a new one)

4. Set up environment variables
Create a .env file in the root directory:

env
VITE_WEATHER_API_KEY=your_api_key_here
Important: Replace your_api_key_here with your actual OpenWeatherMap API key.

5. Start development server
bash
npm run dev
6. Open your browser
Navigate to http://localhost:5173

## Project Structure
text
weather-app/

├── src/

│   ├── components/

│   │   ├── LocationModal.jsx      # Location permission modal

│   │   └── layout/                 # Layout components (future)

│   ├── hooks/

│   │   └── useWeather.js           # Custom weather data hook

│   ├── services/

│   │   └── weatherService.js       # API service layer

│   ├── App.jsx                     # Main application

│   ├── main.jsx                    # Entry point

│   └── index.css                   # Global styles with Tailwind

├── public/                         # Static assets

├── .env                            # Environment variables (gitignored)

├── .gitignore                      # Git ignore file

├── index.html                      # HTML template

├── package.json                    # Dependencies and scripts

├── vite.config.js                  # Vite configuration

├── vercel.json                     # Vercel deployment config

└── README.md                       # Project documentation

## Usage Guide
Getting Weather for Your Location
First visit: A modal will ask for location permission

Click "Turn On My Location" to get local weather

Click "Not Now" to see Manila weather as default

Your choice is saved - Won't ask again on next visit

Searching for a City
Type a city name in the search bar (e.g., "Tokyo", "London", "New York")

Press Enter or click the search icon

Weather updates automatically for that city

Invalid cities show a toast notification (auto-dismisses in 3 seconds)

Using Current Location Button
Click the "Current Location" button anytime

If location was previously denied, you'll see a toast with instructions

Grant location permission in browser settings to use this feature

## Responsive Design
Breakpoint	Screen Size	Layout Adjustments
Mobile	< 640px	Single column, compact spacing
Tablet	640px - 1024px	2-column grid, larger text
Desktop	> 1024px	Max width 1280px, expanded layout

## API Reference
OpenWeatherMap Endpoints Used
Endpoint	Purpose
/weather	Current weather data
/forecast	5-day forecast (3-hour intervals)
Parameters
Parameter	Value	Description
q	City name	Search by city (e.g., "London")
lat	Latitude	Coordinate-based search
lon	Longitude	Coordinate-based search
units	metric	Celsius temperature units
appid	API key	Authentication

## Deployment
Deploy to Vercel (Recommended)
bash

# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
Follow the prompts:

Link to existing project? → No

Project name? → weather-app

Environment variable → Add VITE_WEATHER_API_KEY

Deploy to Netlify
bash

# Build the project
npm run build

# Drag and drop the 'dist' folder to Netlify
# Or connect GitHub repository in Netlify dashboard
Deploy to GitHub Pages
bash

# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json
"homepage": "https://eljohnluar.github.io/weather-app",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}

# Deploy
npm run deploy
 Environment Variables
Variable	Required	Description
VITE_WEATHER_API_KEY	Yes	Your OpenWeatherMap API key
Note: Never commit your .env file to version control. It's already in .gitignore.

## Troubleshooting
Common Issues
Issue	Solution
"City not found"	Check spelling or try a different city name
Location not working	Enable location in browser settings
API key error	Verify API key in .env file and restart server
Blank white screen	Check console for errors; restart dev server
Forecast not showing	API key might need activation (wait 2 hours)
Development Tips
bash

# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Run with different port
npm run dev -- --port 3000
 Testing
bash

# Run linter
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview
 Contributing
Fork the repository

Create a feature branch (git checkout -b feature/amazing-feature)

Commit changes (git commit -m 'Add amazing feature')

Push to branch (git push origin feature/amazing-feature)

Open a Pull Request

Development Guidelines
Follow existing code style

Add comments for complex logic

Test on multiple devices

Update documentation as needed

## Acknowledgments
Weather data by OpenWeatherMap

Icons by Lucide React

Built with Vite and React

Styled with Tailwind CSS
