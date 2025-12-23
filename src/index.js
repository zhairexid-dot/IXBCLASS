import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, Typography } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#1976d2' },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Container sx={{ mt: 8, textAlign: 'center' }}>
            <Typography variant="h3">Website Kelas Ku</Typography>
            <Typography variant="h5" sx={{ mt: 4 }}>Sedang dibangun – Elegan & Keren!</Typography>
            <Typography sx={{ mt: 2 }}>Login & fitur lain coming soon.</Typography>
          </Container>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
