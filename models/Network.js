const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Create Schema
const NetworkSchema = new Schema({

    // id: {
    //     type: Number,
    //     required: true,
    // },
    title: {
        type: String,
        required: true,
        default: "Untitled Event"
    },
    presenter: {
        type: String,
        required: true,
        Default: "Anonymous"
    },
    // organization: {
    //     type: String,
    //     required: true,
    //     Default: "Anonymous",
    // },
    // date: {
    //     type: Date,
    //     default: Date.now,
    //     required: true
    // },
    // duration: {
    //     type: Number,
    //     default: 60,
    //     required: true,
    // },
    // category: {
    //     type: Number,
    //     required: true
    // },
    // link: {
    //     type: String,
    //     required: true
    // },
    // description: {
    //     type: String,
    //     required: true
    // }
});

module.exports = Network = mongoose.model('network', NetworkSchema);