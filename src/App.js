import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router } from 'react-router-dom';
import { Container, Typography, Box } from '@mui/material';
import { AuthProvider } from './contexts/AuthContext';  // Kalau AuthContext ada, biarin; kalau error nanti, comment dulu

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#1976d2' },
    background: { default: '#121212' },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            <Typography variant="h2" color="primary" gutterBottom>
              Website Kelas IX B
            </Typography>
            <Typography variant="h5" color="text.secondary">
              Elegan, Serius, dan Keren
            </Typography>
            <Typography variant="body1" sx={{ mt: 4, maxWidth: '600px', textAlign: 'center' }}>
              Struktur organisasi kelas, forum diskusi publik, gallery upload foto/video, dan chat AI dengan DeepSeek sedang dibangun.
            </Typography>
            <Typography variant="body2" sx={{ mt: 8, opacity: 0.6 }}>
              Dibuat dengan ❤️ untuk kelas terbaik – 2025
            </Typography>
          </Box>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
