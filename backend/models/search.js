const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const searchSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['Movie', 'Show', 'Music', 'Book'],
        required: true,
    },
    coverImage: {
        type: String, 
        required: true,
    },
    // creatorID: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Creator',
    //     required: false
    // },
    
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
});

module.exports = mongoose.model('Search', searchSchema);
