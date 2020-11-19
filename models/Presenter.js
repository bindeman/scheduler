const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Create Schema
const PresenterSchema = new Schema({

    id: {
        type: Number,
        required: true,
        //default: Date.now
    },
    name: {
        type: String,
        required: true,
        default: "Untitled"
    },
    organization: {
        type: String,
        required: false,
    },
    bio: {
        type: String,
        required: false
    },
    link: {
        type: String,
        required: false,
    },
});


module.exports = Presenter = mongoose.model('presenter', PresenterSchema);