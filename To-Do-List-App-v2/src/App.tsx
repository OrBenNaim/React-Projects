import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import HomePage from './pages/HomePage';
import ToDoListApp from './pages/TasksPage';

function App() {
  // Initialize Dark Mode from localStorage or default to false
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('isDarkMode');
    return savedTheme === 'true'; // Convert string to boolean
  });

  // Save the Dark Mode state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('isDarkMode', String(isDarkMode));
  }, [isDarkMode]);

  // Toggle function for Dark Mode
  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  // Create MUI theme based on the current mode
  const theme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          {/* Pass toggleDarkMode to child components if needed */}
          <Route path="/" element={<HomePage toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />} />
          <Route path="/app" element={<ToDoListApp toggleDarkMode={toggleDarkMode} />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
