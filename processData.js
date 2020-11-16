const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const XLSX = require('xlsx');
//const scheduler = require('./master_schedule.xls');

require('dotenv').config();

const events = require('./routes/api/events');
const prerecordedevents = require('./routes/api/prerecordedevents');




//bodyparser
app.use(bodyParser.json());

//DB config
console.log(process.env.DATABASE);
const db = require('./config/keys').mongoURI;


// Connect to Mongo

mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to Database'))
    .catch(err => {
        console.log(err)
        console.log("Could not connect to database")
    });

mongoose.set('useFindAndModify', false);

//Served compiled static React content in production
if (!(process.env.NODE_ENV === 'production')) {
    let workbook = XLSX.readFile('master_schedule.xlsx');
    let sheet_name_list = workbook.SheetNames;
    let sheetEvents = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]])
    console.log("===============")

    let options = { upsert: true, new: true, setDefaultsOnInsert: true };

    sheetEvents.forEach((event) => {
        event.date = new Date(event.date)
        console.log(event.category);
        let categoryString = event.category.toString()
        event.category = categoryString.split(',').map(Number);

        let query = {id: event.id}



        const newEvent = {
            id: event.id,
            title: event.title,
            presenter: event.presenter,
            organization: event.organization,
            date: event.date,
            duration: event.duration,
            category: event.category,
            link: event.link,
            pastlink: event.pastlink,
            description: event.description,
            bio: event.bio,
        }

        Event.findOneAndUpdate({id: event.id}, newEvent, options)
            .then(() => console.log("Saved item")).catch(err => console.log(err));
    })
    console.log(sheetEvents);
    console.log("================");

}







