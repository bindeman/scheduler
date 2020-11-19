const mongoose = require('mongoose');
const XLSX = require('xlsx');
//const scheduler = require('./master_schedule.xls');

require('dotenv').config();

const Event = require('./models/Event');
const Presenter = require('./models/Presenter');


const events = require('./routes/api/events');
const prerecordedevents = require('./routes/api/prerecordedevents');




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
    let eventsSheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]])
    let presentersSheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[2]])
    console.log("===============")

    let options = { upsert: true, new: true, setDefaultsOnInsert: true };


    //load presenters
    presentersSheet.forEach((presenter) => {

        const newPresenter = {
            id: presenter.id,
            name: presenter.name,
            link: presenter.link,
            bio: presenter.bio,
        }

        Presenter.findOneAndUpdate({id: presenter.id}, newPresenter, options)
            .then(() => console.log("Added presenter")).catch(err => console.log(err));
    })

    
    
    eventsSheet.forEach((event) => {
        event.date = new Date(event.date)
        console.log(event.category);
        let categoryString = event.category.toString();
        let presenterString = event.category.toString();
        let presenterReferences;
        event.category = categoryString.split(',').map(Number);
        event.presenters = event.presenter.split(', ');

        let query = {id: event.id}



        const newEvent = {
            id: event.id,
            title: event.title,
            presenter: event.presenter,
            presenters: event.presenters,
            organization: event.organization,
            date: event.date,
            duration: event.duration,
            category: event.category,
            link: event.link,
            pastlink: event.pastlink,
            description: event.description,
            bio: event.bio,
        }



        console.log("+++++++++++++++++++++++++++");
        Presenter.find({
            'name': { $in: event.presenters},
        }, '_id')
            .then((res) => {
            console.log(res);

                newEvent.presenters = res;

                Event.findOneAndUpdate({id: event.id}, newEvent, options)
                    .then(() => console.log("Saved item")).catch(err => console.log(err));


        })
            .catch(err => console.log(err));

        console.log("+++++++++++++++++++++++++++");


    })
    //console.log(eventsSheet);
    console.log("================");

    Event.find({})
        .populate({
            path: 'presenters',
            model: 'presenter'
        })
        .then((res) => console.log(res)).catch(err => console.log(err));


    console.log("<==========================>");
    console.log("Process complete, exiting program.");




} else {
    console.log("<==========================>");
    console.log("Process can only be launched locally, exiting program.");
}







