const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const {PresenterSchema} = require('./Presenter').schema;

// Create Schema
const EventSchema = new Schema({

    id: {
        type: Number,
        required: true,
        //default: Date.now
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
    pastlink: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: true
    },
    endDate: {
        type: Date,
    },
    bio: {
        type: String,
    }
});


// EventSchema.virtual('endDate')
//     .get(function () {
//         const minute = 60*1000;
//         console.log(this.date.getTime()+(minute*this.duration));
//         return this.date.getTime()+(minute*this.duration);
//     });

module.exports = Event = mongoose.model('event', EventSchema);