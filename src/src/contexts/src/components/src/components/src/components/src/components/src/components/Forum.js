import React, { useEffect, useState } from 'react';
import { Container, Typography, TextField, Button, List, ListItem, ListItemText, Divider } from '@mui/material';
import { db } from '../firebase';
import { collection, addDoc, getDocs, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';

function Forum() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const { currentUser } = useAuth();

  useEffect(() => {
    async function fetchPosts() {
      const querySnapshot = await getDocs(collection(db, 'forum_posts'));
      setPosts(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }
    fetchPosts();
  }, []);

  async function addPost() {
    await addDoc(collection(db, 'forum_posts'), {
      text: newPost,
      user: currentUser.email,
      timestamp: serverTimestamp(),
    });
    setNewPost('');
    fetchPosts(); // Refresh
  }

  return (
    <Container sx={{ ml: '240px', mt: 4 }}>
      <Typography variant="h4">Forum Diskusi</Typography>
      <TextField fullWidth multiline label="Tulis diskusi..." value={newPost} onChange={(e) => setNewPost(e.target.value)} sx={{ mt: 2 }} />
      <Button onClick={addPost} variant="contained" sx={{ mt: 2 }}>Post</Button>
      <List sx={{ mt: 2 }}>
        {posts.sort((a, b) => b.timestamp - a.timestamp).map(post => (
          <div key={post.id}>
            <ListItem>
              <ListItemText primary={post.text} secondary={`Oleh: ${post.user} - ${post.timestamp?.toDate().toLocaleString()}`} />
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
    </Container>
  );
}

export default Forum;
