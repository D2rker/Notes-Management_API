
const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a note title'],
    trim: true,
  },
  content: {
    type: String,
    required: [true, 'Please provide note content'],
    trim: true,
  }
  
}, { timestamps: true }); 

module.exports = mongoose.model('Note', noteSchema);
