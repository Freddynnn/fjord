const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const creatorSchema = new Schema({
    name: { type: String, required: true },
    works: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Media' 
    }] 
});

module.exports = mongoose.model('Creator', creatorSchema);
