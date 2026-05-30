const dns = require('node:dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

require('dotenv').config();
<<<<<<< HEAD
const connectDB = require('./database/sever');
const Note = require('./models/note');
const NoteJSON = require('./notes.json');
=======
const connectDB = require('../database/connect');
const Note = require('../models/note');
const NoteJSON = require('../notes.json');
>>>>>>> a66c37d8a7acebbdab129ccb4fbde8199ca73585

const start = async () => {
    try {
        await connectDB(process.env.MongoDB_URI);
        await Note.deleteMany({});
        
        await Note.create(NoteJSON);
        console.log("Data successfully added to database!");
        
        process.exit(0);
    } catch (error) {
        console.error("Database Seeding Error: ", error);
        process.exit(1);
    }
}

start();
