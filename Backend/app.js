const dns = require('node:dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const connectDB = require('./database/sever');
const fs = require('fs').promises;
const path = require('path');
const Note = require('./models/note');

const PORT = 3000;

app.use(cors());
app.use(express.json());

// const productRoutes = require('./routes/product');

app.get('/', (req, res) => {
  console.log('Hello World');
});


// middleware or set routeres
// app.use("/api/products", productRoutes);

// Notes API endpoint to receive data from frontend
app.post('/api/notes', async (req, res) => {
  const { title, content } = req.body;
  console.log('Received new note from frontend:', title, content);

  try {
    // Save the new note directly to MongoDB
    const newNote = await Note.create({ title, content });

    res.status(201).json({ message: 'Note created successfully!', note: newNote });
  } catch (error) {
    console.error('Error saving to database:', error);
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
