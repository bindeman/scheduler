const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const {PresenterSchema} = require('./Presenter').schema;


// Create Schema
const PreRecordedEventSchema = new Schema({

    id: {
        type: Number,
        required: true,
        default: Date.now
    },
    title: {
        type: String,
        required: true,
        default: "Untitled Event"
    },
    presenter: {
        type: String,
        required: true,
    },
    presenters: {
        type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Presenter'}],
        required: false,
    },
    organization: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now(),
        required: true
    },
    duration: {
        type: Number,
        default: 60,
        required: true,
    },
    category: {
        type: [Number],
        required: true
    },
    link: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
});


module.exports = PreRecordedEvent = mongoose.model('prerecordedevent', PreRecordedEventSchema);