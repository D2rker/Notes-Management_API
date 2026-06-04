const express = require('express');
const router = express.Router();

const { 
    getAllNotes, 
    getAllNotesTesting, 
    getSingleNote, 
    createNote, 
    updateNote, 
    deleteNote 
} = require('../controllers/note.controller'); // Fixed path & imports

router.route("/")
    .get(getAllNotes)
    .post(createNote);

router.route("/testing")
    .get(getAllNotesTesting);

router.route("/:id")
    .get(getSingleNote)
    .put(updateNote)
    .delete(deleteNote); // Removed duplicates

module.exports = router;