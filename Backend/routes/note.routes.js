const express = require('express');
const router = express.Router();

const { getAllNotes, getAllNotesTesting, createNote, deleteNote} = require('../controllers/controllers');

router.route("/").get(getAllNotes);
router.route("/testing").get(getAllNotesTesting);

router.route("/").post(createNote);
router.route("/:id").delete(deleteNote);

router.route("/:id")
    .get(getSingleNote)
    .put(updateNote)
    .delete(deleteNote);

module.exports = router;
