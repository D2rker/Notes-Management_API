const dns = require('node:dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const connectDB = require('./database/sever');

const PORT = 3000;

app.use(cors());
app.use(express.json());

const notesRoutes = require('./routes/note.routes');

/* Consolidated to use /api/notes for all operations */

app.use("/api/notes", notesRoutes);

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