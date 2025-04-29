import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'react-bootstrap';  // Correct import for ThemeProvider
import HomePage from './pages/HomePage';
import ListItemPage from './pages/ListItemPage';

function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/list-item" element={<ListItemPage />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;




