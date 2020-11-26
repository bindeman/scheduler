const mongoose = require('mongoose');
const XLSX = require('xlsx');
//const scheduler = require('./master_schedule.xls');
require('dotenv').config();

const Event = require('./models/Event');
const PreRecordedEvent = require('./models/PreRecordedEvent');
const Presenter = require('./models/Presenter');

//DB config
console.log(process.env.DATABASE);
const db = require('./config/keys').mongoURI;


// Connect to Mongo
mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to the database successfully');
        console.log("\n<=================== RESULTS ===================>")
    })
    .catch(err => {
        console.log(err)
        console.log("Could not connect to database")
    });
mongoose.set('useFindAndModify', false);


//Served compiled static React content in production
if (!(process.env.NODE_ENV === 'production')) {
    let workbook = XLSX.readFile('master_schedule.xlsx');
    const callback = ((count, totalSize, who) => console.log(`-- Processed ${count}/${totalSize} ${who} into the database`))
    let sheets = workbook.SheetNames;
    let eventsSheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheets[0]])
    let prerecordedEventsSheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheets[1]])
    let presentersSheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheets[2]])
    let options = { upsert: true, new: true, setDefaultsOnInsert: true };



    console.log("============ EVENTS ============");
    console.log(eventsSheet);

    console.log("============ ON-DEMAND EVENTS ============");
    console.log(prerecordedEventsSheet);

    console.log("============ PRESENTERS ============");
    console.log(presentersSheet);

    //load presenters
    function updatePresenters(presentersSheet) {

        let count = 0;
        presentersSheet.forEach((presenter, index, array) => {
            Presenter.findOneAndUpdate({id: presenter.id}, presenter, options)
                .then(() => {
                    count++
                    if(index === array.length - 1) callback(count, presentersSheet.length, "presenters");
                }).catch(err => console.log(err));
        })
    }


    function setEndDate(item) {
        const minute = 60*1000;
        const time = new Date(item.date).getTime() + (item.duration * 60*1000);
        return new Date(time);
    }

    function updateEvents(eventsSheet) {
        let count = 0;
        eventsSheet.forEach((event, index, array) => {
            let query = { id: event.id }
            event.date = new Date(event.date)
            event.endDate = new Date(new Date(event.date).getTime() + (event.duration * 60*1000));
            console.log(event.id);
            event.category = event.category.toString().split(',').map(Number);
            event.presenters = event.presenter.toString().split(', ');


            Presenter.find({
                'name': { $in: event.presenters}, }, '_id')
                .then((presenterReferences) => {
                    //console.log(presenterReferences);
                    event.presenters = presenterReferences;

                    Event.findOneAndUpdate({id: event.id}, event, options)
                        .then(() => {
                            count++
                            if(index === array.length - 1) callback(count, eventsSheet.length, "live events");
                        })
                        .catch(err => console.log(err));
                })
                .catch(err => console.log(err));
        })

    }
    function updatePreRecordedEvents(prerecordedEventsSheet) {
        let count = 0;
        //update Presenters
        prerecordedEventsSheet.forEach((event, index, array) => {
            let query = { id: event.id }
            event.date = new Date(event.date);
            event.endDate = new Date(new Date(event.date).getTime() + (event.duration * 60*1000));
            event.category = event.category.toString().split(',').map(Number);
            event.presenters = event.presenter !== "" ? event.presenter.toString().split(', ') : "";


            Presenter.find({
                'name': { $in: event.presenters}, }, '_id')
                .then((presenterReferences) => {
                    //console.log(presenterReferences);
                    event.presenters = presenterReferences;

                    PreRecordedEvent.findOneAndUpdate({id: event.id}, event, options)
                        .then(() => {
                            count++
                            if(index === array.length - 1) callback(count, prerecordedEventsSheet.length, "on-demand events");
                        }).catch(err => console.log(err));
                })
                .catch(err => console.log(err));
        })

    }

        updatePresenters(presentersSheet);
        updateEvents(eventsSheet);
        updatePreRecordedEvents(prerecordedEventsSheet);

    //display objects to ensure all events have presenters
    Event.find({})
        .populate({
            path: 'presenters',
            model: 'presenter'
        })
        .then((res) => console.log(res)).catch(err => console.log(err));

    //display objects to ensure all events have presenters
    PreRecordedEvent.find({})
        .populate({
            path: 'presenters',
            model: 'presenter'
        })
        .then((res) => console.log(res)).catch(err => console.log(err));

} else {
    console.log("Process can only be launched locally, exiting program.");
    process.exit(1);
}







