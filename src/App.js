import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router } from 'react-router-dom';
import { Container, Typography, Box } from '@mui/material';
import { AuthProvider } from './contexts/AuthContext'; // Kalau error import ini, comment dulu dengan //

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#0d47a1' }, // Biru gelap serius
    background: { default: '#000000', paper: '#0d1b2a' },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', bgcolor: 'background.default' }}>
            <Typography variant="h2" component="h1" gutterBottom color="primary" sx={{ fontWeight: 'bold' }}>
              Kelas IX B
            </Typography>
            <Typography variant="h4" gutterBottom color="text.secondary">
              Website Resmi Kelas
            </Typography>
            <Container maxWidth="md" sx={{ mt: 6, textAlign: 'center' }}>
              <Typography variant="body1" paragraph>
                Struktur organisasi kelas, ruang diskusi publik, gallery foto/video, dan chat AI sedang dalam pengembangan.
              </Typography>
              <Typography variant="body1" paragraph>
                Akun pertama yang login akan menjadi admin dan bisa mengatur segalanya.
              </Typography>
              <Typography variant="caption" sx={{ mt: 8, opacity: 0.7 }}>
                Dibuat dengan dedikasi untuk kelas terbaik – 2025
              </Typography>
            </Container>
          </Box>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
