const Note = require("../models/note");

// get product

const getAllNotes = async(req, res) => {

    const {title, content, sort, select} = req.query;
    const queryObject = {};

    if(title){
        queryObject.title = title;
    }

    if(content){
        queryObject.content = content;
    }

    let apiData =  Note.find(queryObject);

    if(sort) {
        let sortfix = sort.replace(",", " ");
        apiData = apiData.sort(sortfix);
    }
    

    if(select) {
        let selectfix = select.replace(",", " ");
        apiData = apiData.select(selectfix);
    }

    const myData = await apiData;
    res.status(200).json({myData});
};

// Get product testing

const getAllNotesTesting = async(req, res) => {

    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 2;

    let skip = (page - 1) * limit;

    let apiData = Note.find({}).skip(skip).limit(limit);

    apiData = apiData.skip(skip).limit(limit);

    const myData = await apiData;
    res.status(200).json({myData});};


// POST 

const createNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        
        // Simple Validation
        if (!title || !content) {
            return res.status(400).json({ msg: "Please provide both title and content" });
        }

        const newNote = await Note.create({ title, content });
        res.status(201).json({ success: true, data: newNote });
    } catch (error) {
        res.status(500).json({ msg: "Server Error", error: error.message });
    }
};

// DELETE

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
    createNote,
    deleteNote
};
