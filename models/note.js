<<<<<<< HEAD
=======

>>>>>>> a66c37d8a7acebbdab129ccb4fbde8199ca73585
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
<<<<<<< HEAD
  },
}, { timestamps: true });

module.exports = mongoose.model('Note', noteSchema);
=======
  }
  
}, { timestamps: true }); 

module.exports = mongoose.model('Note', noteSchema);
>>>>>>> a66c37d8a7acebbdab129ccb4fbde8199ca73585
