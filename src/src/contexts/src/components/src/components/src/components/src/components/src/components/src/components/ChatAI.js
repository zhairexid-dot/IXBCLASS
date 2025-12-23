import React, { useState } from 'react';
import { Container, Typography, TextField, Button, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';

function ChatAI() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  async function sendMessage() {
    const userMessage = { role: 'user', content: input };
    setMessages([...messages, userMessage]);
    setInput('');

    try {
      // Call Netlify Function
      const response = await axios.post('/.netlify/functions/ai-chat', { messages: [...messages, userMessage] });
      const aiMessage = { role: 'assistant', content: response.data.content };
      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Container sx={{ ml: '240px', mt: 4 }}>
      <Typography variant="h4">Chat AI (DeepSeek)</Typography>
      <List>
        {messages.map((msg, index) => (
          <ListItem key={index}>
            <ListItemText primary={msg.role === 'user' ? 'Kamu:' : 'AI:'} secondary={msg.content} />
          </ListItem>
        ))}
      </List>
      <TextField fullWidth label="Tulis pesan..." value={input} onChange={(e) => setInput(e.target.value)} />
      <Button onClick={sendMessage} variant="contained" sx={{ mt: 2 }}>Kirim</Button>
    </Container>
  );
}

export default ChatAI;
