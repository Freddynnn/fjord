const mongoose = require('mongoose');

const coverImageBasePath = 'uploads/coverImages';
const mediaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    watchDate: {
        type: Date,
        required: false, 
    },
    notes: {
        type: String,
        required: true,
    },
    score: {
        type: Number, 
        required: true,
    },
    grade: {
        type: String,
        enum: ['F-', 'F', 'F+', 'D-', 'D', 'D+', 'C-', 'C', 'C+', 'B-', 'B', 'B+', 'A-', 'A', 'A+', 'S-', 'S', 'S+'],
        required: true,
    },
    type: {
        type: String,
        enum: ['Movie', 'Show', 'Music', 'Book'],
        required: true,
    },
    coverImage: {
        type: String, // store path or URL of cover image?
        required: true,
    },
    

    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
});

module.exports = mongoose.model('Media', mediaSchema);
module.exports.coverImageBasePath = coverImageBasePath;
