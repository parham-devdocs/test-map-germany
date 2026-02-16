project vercel link: https://test-map-germany-dw6qw7oee-parham-devdocs-projects.vercel.app/


# Train Stations Explorer

## Overview
A modern, interactive web application built to explore train station data. The project features real-time search filtering, dynamic statistics, and an interactive map that syncs instantly with the list view. It is designed with a mobile-first approach using a clean, responsive interface.

## Tech Stack
- **React**: Core UI library for building component-based architecture.
- **TypeScript**: Ensures type safety across props, state, and API responses.
- **Zustand**: Used for lightweight global state management to cache the full dataset of stations without unnecessary re-renders.
- **Tailwind CSS**: Handles all styling with utility classes for rapid development and consistent design.
- **React Leaflet**: Powers the interactive map integration with OpenStreetMap tiles.
- **Custom Hooks**: A dedicated `useFetch` hook was created to handle asynchronous data fetching, loading states, and error handling cleanly.
- **Icons**: Integrated icon libraries for visual enhancements (search, markers, UI elements).

## Project Structure & Components
The application is modular, separating concerns into distinct components:

1.  **Header**: Displays high-level statistics, including the total number of stations and unique cities found in the dataset.
2.  **Map Component**: Renders the interactive map. It accepts filtered data as props, ensuring markers update instantly when the user searches. It includes popups for station details.
3.  **Stations List**: A scrollable list of station cards. It contains the search input bar and handles user interactions like clicking "View on Map," which scrolls the page and centers the map on the selected location.
4.  **Error Component**: A dedicated UI state that gracefully displays messages if the API fails or data cannot be retrieved.
5.  **Loading Component**: A custom spinner shown while data is being fetched.

## Key Features
- **Real-Time Filtering**: Typing in the search bar instantly filters both the list and the map markers by station name or city.
- **Synced State**: The map and list are perfectly synchronized; filtering one updates the other immediately.
- **Responsive Design**: Fully adaptive layout that works on mobile phones, tablets, and desktops.
- **Performance**: Uses efficient state management to prevent infinite render loops and ensure smooth interactions even with large datasets.

## Known Deployment Issue: Map Marker Icons
**Important Note regarding Production Builds:**
When deploying this application (e.g., to Vercel or Netlify), you may notice that the default map marker pins (which usually look like blue arrows) appear as broken images or generic gray boxes.

**Cause:**
This is a known issue with `react-leaflet` and Webpack/Vite bundlers. The default Leaflet CSS references image assets (`marker-icon.png`, `marker-shadow.png`) that are not automatically copied to the build output folder during production builds. Consequently, the browser cannot find the images and displays the alt text or a broken icon instead.

**Solution:**
To fix this in production, you must explicitly define the icon paths in your map component using `L.icon` from leaflet, pointing to the correct URLs (either hosted locally in the `public` folder or via a CDN), rather than relying on the default CSS paths.

## Installation & Running Locally
1.  Clone the repository.
2.  Install dependencies: `npm install`
3.  Run the development server: `npm run dev`
4.  Open the local host link provided in the terminal.

## Deployment
The project is configured for easy deployment on platforms like Vercel. Simply connect your Git repository, and the platform will detect the Vite build settings automatically. Remember to apply the marker icon fix mentioned above before pushing to production.
