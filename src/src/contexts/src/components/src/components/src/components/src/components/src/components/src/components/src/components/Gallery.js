import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, Grid, Card, CardMedia, CardContent } from '@mui/material';
import { db, storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, getDocs, serverTimestamp } from 'firebase/firestore';

function Gallery() {
  const [uploads, setUploads] = useState([]);
  const [file, setFile] = useState(null);

  useEffect(() => {
    async function fetchUploads() {
      const querySnapshot = await getDocs(collection(db, 'uploads'));
      setUploads(querySnapshot.docs.map(doc => doc.data()));
    }
    fetchUploads();
  }, []);

  async function handleUpload() {
    if (!file) return;
    const storageRef = ref(storage, `uploads/${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    await addDoc(collection(db, 'uploads'), {
      url,
      type: file.type.startsWith('image') ? 'image' : 'video',
      timestamp: serverTimestamp(),
    });
    setFile(null);
    fetchUploads();
  }

  return (
    <Container sx={{ ml: '240px', mt: 4 }}>
      <Typography variant="h4">Gallery Upload</Typography>
      <input type="file" accept="image/*,video/*" onChange={(e) => setFile(e.target.files[0])} />
      <Button onClick={handleUpload} variant="contained" sx={{ ml: 2 }}>Upload</Button>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {uploads.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              {item.type === 'image' ? (
                <CardMedia component="img" image={item.url} alt="Upload" />
              ) : (
                <CardMedia component="video" src={item.url} controls />
              )}
              <CardContent>
                <Typography>{item.timestamp?.toDate().toLocaleString()}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Gallery;
