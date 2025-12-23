import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Toolbar, AppBar, Typography, Switch } from '@mui/material';
import { Home, AdminPanelSettings, Forum as ForumIcon, Chat, PhotoLibrary } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Sidebar({ toggleDarkMode, darkMode }) {
  const navigate = useNavigate();
  const { logout, isAdmin } = useAuth();

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Website Kelas Ku</Typography>
          <Switch checked={darkMode} onChange={toggleDarkMode} />
          <Button color="inherit" onClick={logout}>Logout</Button>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" anchor="left">
        <List>
          <ListItem button onClick={() => navigate('/')}>
            <ListItemIcon><Home /></ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          {isAdmin && (
            <ListItem button onClick={() => navigate('/admin')}>
              <ListItemIcon><AdminPanelSettings /></ListItemIcon>
              <ListItemText primary="Admin Panel" />
            </ListItem>
          )}
          <ListItem button onClick={() => navigate('/forum')}>
            <ListItemIcon><ForumIcon /></ListItemIcon>
            <ListItemText primary="Forum Diskusi" />
          </ListItem>
          <ListItem button onClick={() => navigate('/chat-ai')}>
            <ListItemIcon><Chat /></ListItemIcon>
            <ListItemText primary="Chat AI" />
          </ListItem>
          <ListItem button onClick={() => navigate('/gallery')}>
            <ListItemIcon><PhotoLibrary /></ListItemIcon>
            <ListItemText primary="Gallery Upload" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}

export default Sidebar;
