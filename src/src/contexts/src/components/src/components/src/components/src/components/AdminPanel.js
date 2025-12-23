import React, { useState } from 'react';
import { Container, Typography, TextField, Button, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { db } from '../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';

function AdminPanel() {
  const { isAdmin } = useAuth();
  const [position, setPosition] = useState('');
  const [name, setName] = useState('');
  const [orgStructure, setOrgStructure] = useState([]);

  if (!isAdmin) return <Typography>Anda bukan admin.</Typography>;

  async function addOrgItem() {
    await addDoc(collection(db, 'organization'), { position, name });
    fetchOrg();
    setPosition('');
    setName('');
  }

  async function fetchOrg() {
    const querySnapshot = await getDocs(collection(db, 'organization'));
    setOrgStructure(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  }

  async function deleteOrgItem(id) {
    await deleteDoc(doc(db, 'organization', id));
    fetchOrg();
  }

  // Tambah fitur admin lain nanti, seperti manage user, dll.

  return (
    <Container sx={{ ml: '240px', mt: 4 }}>
      <Typography variant="h4">Admin Panel</Typography>
      <Typography variant="h6" sx={{ mt: 2 }}>Atur Struktur Organisasi</Typography>
      <TextField label="Posisi" value={position} onChange={(e) => setPosition(e.target.value)} />
      <TextField label="Nama" value={name} onChange={(e) => setName(e.target.value)} sx={{ ml: 2 }} />
      <Button onClick={addOrgItem} variant="contained" sx={{ ml: 2 }}>Tambah</Button>
      <List>
        {orgStructure.map(item => (
          <ListItem key={item.id}>
            <ListItemText primary={item.position} secondary={item.name} />
            <IconButton onClick={() => deleteOrgItem(item.id)}><Delete /></IconButton>
          </ListItem>
        ))}
      </List>
      {/* Tambah section lain untuk manage forum atau gallery jika perlu */}
    </Container>
  );
}

export default AdminPanel;
