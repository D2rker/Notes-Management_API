// d2rker/notes-management_api/Notes-Management_API-5adc6016c1df201b4cec690d2d50a70b399c55b0/app.js
const dns = require('node:dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const connectDB = require('./database/connect');

const PORT = 3000;

app.use(cors());
app.use(express.json());

const notesRoutes = require('./routes/route');

// Consolidated to use /api/notes for all operations
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
