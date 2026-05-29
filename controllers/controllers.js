const Note = require("../models/note");

// GET all notes
const getAllNotes = async(req, res) => {
    const {title, content, sort, select} = req.query;
    const queryObject = {};

    if(title){
        queryObject.title = { $regex: title, $options: 'i' }; // case-insensitive search
    }

    if(content){
        queryObject.content = { $regex: content, $options: 'i' };
    }

    let apiData = Note.find(queryObject);

    if(sort) {
        let sortfix = sort.replace(",", " ");
        apiData = apiData.sort(sortfix);
    }

    if(select) {
        let selectfix = select.replace(",", " ");
        apiData = apiData.select(selectfix);
    }

    const myData = await apiData;
    res.status(200).json({ myData });
};

// GET single note
const getSingleNote = async (req, res) => {
    try {
        const { id } = req.params;
        const note = await Note.findById(id);
        
        if (!note) {
            return res.status(404).json({ msg: `No note found with id: ${id}` });
        }
        res.status(200).json({ success: true, data: note });
    } catch (error) {
        res.status(500).json({ msg: "Server Error", error: error.message });
    }
};

// GET notes testing
const getAllNotesTesting = async(req, res) => {
    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 2;
    let skip = (page - 1) * limit;

    let apiData = Note.find({}).skip(skip).limit(limit);
    const myData = await apiData;
    res.status(200).json({ myData });
};

// POST note
const createNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        
        if (!title || !content || !title.trim() || !content.trim()) {
            return res.status(400).json({ msg: "Please provide both title and content" });
        }

        const newNote = await Note.create({ title: title.trim(), content: content.trim() });
        res.status(201).json({ success: true, data: newNote });
    } catch (error) {
        res.status(500).json({ msg: "Server Error", error: error.message });
    }
};

// PUT update note
const updateNote = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;

        if (!title || !content || !title.trim() || !content.trim()) {
            return res.status(400).json({ msg: "Please provide both title and content" });
        }

        const note = await Note.findByIdAndUpdate(
            id, 
            { title: title.trim(), content: content.trim() }, 
            { new: true, runValidators: true }
        );

        if (!note) {
            return res.status(404).json({ msg: `No note found with id: ${id}` });
        }

        res.status(200).json({ success: true, data: note });
    } catch (error) {
        res.status(500).json({ msg: "Server Error", error: error.message });
    }
};

// DELETE note
const deleteNote = async (req, res) => {
    try {
        const { id } = req.params;
        const note = await Note.findByIdAndDelete(id);

        if (!note) {
            return res.status(404).json({ msg: `No note found with id: ${id}` });
        }

        res.status(200).json({ success: true, msg: "Note deleted successfully", deletedNote: note });
    } catch (error) {
        res.status(500).json({ msg: "Server Error", error: error.message });
    }
};

module.exports = {
    getAllNotes,
    getAllNotesTesting,
    getSingleNote,
    createNote,
    updateNote,
    deleteNote
};
