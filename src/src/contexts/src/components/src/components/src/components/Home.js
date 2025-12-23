import React, { useEffect, useState } from 'react';
import { Container, Typography, Paper, List, ListItem, ListItemText } from '@mui/material';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

function Home() {
  const [orgStructure, setOrgStructure] = useState([]);

  useEffect(() => {
    async function fetchOrg() {
      const querySnapshot = await getDocs(collection(db, 'organization'));
      const structure = querySnapshot.docs.map(doc => doc.data());
      setOrgStructure(structure);
    }
    fetchOrg();
  }, []);

  return (
    <Container sx={{ ml: '240px', mt: 4 }}>
      <Typography variant="h4">Struktur Organisasi Kelas</Typography>
      <Paper sx={{ p: 2, mt: 2 }}>
        <List>
          {orgStructure.length > 0 ? (
            orgStructure.map((item, index) => (
              <ListItem key={index}>
                <ListItemText primary={item.position} secondary={item.name} />
              </ListItem>
            ))
          ) : (
            <Typography>Belum ada struktur. Admin bisa tambah di panel.</Typography>
          )}
        </List>
      </Paper>
    </Container>
  );
}

export default Home;
