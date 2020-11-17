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
        default: "Untitled Event"
    },
    organization: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: false,
    },
});


module.exports = Presenter = mongoose.model('presenter', PresenterSchema);