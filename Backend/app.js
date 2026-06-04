const dns = require('node:dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const connectDB = require('./database/sever');
const Note = require('./models/note');

const PORT = 3000;

app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  console.log('Hello World');
});

/* Fetch all notes from MongoDB */
app.get('/api/notes', async (req, res) => {
  try {
    const notes = await Note.find({});
    res.status(200).json(notes);
  } catch (error) {
    console.error('Error fetching notes:', error);
    res.status(500).json({ message: 'Internal server error while fetching notes.' });
  }
});


/* Notes API endpoint to receive data from frontend*/
app.post('/api/notes', async (req, res) => {
  const { title, content } = req.body;
  console.log('Received new note from frontend:', title, content);

  try {
    /* Save the new note directly to MongoDB*/
    const newNote = await Note.create({ title, content });

    res.status(201).json({ message: 'Note created successfully!', note: newNote });
  } catch (error) {
    console.error('Error saving to database:', error);
    res.status(500).json({ message: 'Internal server error while saving the note.' });
  }
});

/* Update an existing note */
app.put('/api/notes/:id', async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    const updatedNote = await Note.findByIdAndUpdate(id, { title, content }, { new: true });
    if (!updatedNote) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.status(200).json({ message: 'Note updated successfully!', note: updatedNote });
  } catch (error) {
    console.error('Error updating note:', error);
    res.status(500).json({ message: 'Internal server error while updating the note.' });
  }
});

/* Delete a note */
app.delete('/api/notes/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedNote = await Note.findByIdAndDelete(id);
    if (!deletedNote) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.status(200).json({ message: 'Note deleted successfully!' });
  } catch (error) {
    console.error('Error deleting note:', error);
    res.status(500).json({ message: 'Internal server error while deleting the note.' });
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
