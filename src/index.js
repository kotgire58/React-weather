import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// import { ThemeProvider } from './context/theme.context';
import { WeatherProvider } from './context/weather.context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <WeatherProvider>
        <App />
      </WeatherProvider>
  </React.StrictMode>
);
