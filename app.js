const dns = require('node:dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);


require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const connectDB = require('./database/connect');
const fs = require('fs').promises;
const path = require('path');

const PORT = 3000;

app.use(cors());
app.use(express.json());

const notesRoutes = require('./routes/route');

app.get('/', (req, res) => {
  console.log('Hello World');
});


// middleware or set routeres
app.use("/api/products", notesRoutes);

// Notes API endpoint to receive data from frontend
app.post('/api/notes', async (req, res) => {
  const { title, content } = req.body;
  // Validation Check
  if (!title || !content || !title.trim() || !content.trim()) {
    return res.status(400).json({ 
      message: 'Validation failed. Both title and content are required and cannot be empty.' 
    });
  }
  
  console.log('Received new note from frontend:', title, content);

  try {
    const notesFilePath = path.join(__dirname, 'notes.json');
    
    // Read existing notes from notes.json
    let fileData;
    try {
      fileData = await fs.readFile(notesFilePath, 'utf8');
    } catch (readError) {
      // If file doesn't exist (ENOENT), default to an empty array string
      if (readError.code === 'ENOENT') {
        fileData = '[]';
      } else {
        throw readError;
      }
    }
    const notes = JSON.parse(fileData || '[]');
    
    // Add the new note to the array
    notes.push({ 
      title:title.trim(), 
      content:content.trim() 
    });
    
    // Write the updated array back to notes.json
    await fs.writeFile(notesFilePath, JSON.stringify(notes, null, 2));
    
    res.status(201).json({ message: 'Note created successfully!', note: { title, content } });
  } catch (error) {
    console.error('Error writing to notes.json:', error);
    res.status(500).json({ message: 'Internal server error while saving the note.' });
  }
});


const start = async () => {
  try {
    await connectDB(process.env.MongoDB_URI);
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error: ', error);
  }
};

start();
