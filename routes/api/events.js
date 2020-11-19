const express = require('express');
const router = express.Router();
const moment = require("moment-timezone");

// Event Model

const Event = require('../../models/Event');

// @route GET api/items
// @desc GET All Visualizations
// @access Public
router.get('/future/category/:number', (req, res) => {
    let now = new Date()
    const timezone = req.get("timezone") ? req.get("timezone") : "Etc/GMT";
    const category = req.params.number == "all" ? { $ne: null } : req.params.number; //one category or all

    Event.find({category: category, date: {$gt: now} })
        .lean()
        .sort({ date: 1 })
        .then((items) => {
            let day = -1;
            items.map(item => {
                let itemDay = Number(moment(item.date).tz(timezone).format('D'));
                item.dateInUserTimeZone = moment(item.date).tz(timezone).format();
                if(itemDay != day) {
                    item.dateHeader = true;
                    day = itemDay;
                }
            });
            res.json(items);
        }).catch(err => res.status(404).json({ success: false }));
});



//See past events across all categories
router.get('/past/category/:number', (req, res) => {
    let now = new Date()
    const timezone = req.get("timezone") ? req.get("timezone") : "Etc/GMT";
    const category = req.params.number == "all" ? { $ne: null } : req.params.number; //one category or all

    Event.find({category: category, endDate: {$lt: now} })
        .lean()
        .sort({ date: -1 })
        .then((items) => {
            let day = -1;
            items.map(item => {
                let itemDay = Number(moment(item.date).tz(timezone).format('D'));
                item.dateInUserTimeZone = moment(item.date).tz(timezone).format();
                if(itemDay != day) {
                    item.dateHeader = true;
                    day = itemDay;
                }
            });
            res.json(items);
        }).catch(err => res.status(404).json({ success: false }));
});

//Get live events
router.get('/live_old', (req, res) => {
    const timezone = req.get("timezone") ? req.get("timezone") : "Etc/GMT";

    console.log(timezone)

    const minute = 60*1000;
    let twoHoursAgo = new Date().getTime()-(120*minute);
    let now = new Date().getTime();

    function isEventLive(item) {
        //convert timezone
        item.dateInUserTimeZone = moment(item.date).tz(timezone).format();
        let eventStartTime = new Date(item.date).getTime();
        let eventEndTime = new Date(item.date).getTime()+item.duration*minute;
        return (eventEndTime > now && eventStartTime < now);

    }

    Event.find({date: {$gte: twoHoursAgo, $lt: now} })
        .lean()
        .sort({ date: 1 })
        .then((items) => {
           const liveEvents = items.filter((item) => isEventLive(item));
           res.json(liveEvents);
        }).catch(err => res.status(404).json({ success: false }));
});

router.get('/now/category/:number', (req, res) => {
    const timezone = req.get("timezone") ? req.get("timezone") : "Etc/GMT";
    const category = req.params.number == "all" ? { $ne: null } : req.params.number; //one category or all

    console.log(timezone)

    let now = new Date().getTime();


    Event.find({category: category, date: {$lt: now}, endDate: {$gt: now} })
        .lean()
        .sort({ date: 1 })
        .then(items => res.json(items))
        .catch(err => res.status(404).json({ success: false }));

});


//display all future events
router.get('/category/:number', (req, res) => {
    let now = new Date();

    const category = req.params.number == "all" ? { $ne: null } : req.params.number; //one category or all


    Event.find({ category: category, date: {$gte: now} })
        .sort({ date: 1 })
        .then(items => res.json(items))
        .catch(err => res.status(404).json({ success: false }));
});

//access presenters of specific event
router.get('/id/:number', (req, res) => {
    let now = new Date()
    //const timezone = req.get("timezone") ? req.get("timezone") : "Etc/GMT";


    Event.findOne({id: req.params.number}, "presenters")
        .populate({
            path: 'presenters',
            model: 'presenter'
        }).then((presenters) => {
        res.json(presenters);
    })
        .catch(err => res.status(404).json({success: false}));

})


// @route POST api/items
// @desc Create a visualization
// @access Public
router.post('/', (req, res) => {
    const newEvent = new Event({
        id: req.body.id,
        title: req.body.title,
        presenter: req.body.presenter,
        organization: req.body.organization,
        date: req.body.date,
        duration: req.body.duration,
        category: req.body.category,
        link: req.body.link,
        pastlink: req.body.pastlink,
        description: req.body.description,
        bio: req.body.bio,
    });
    console.log(newEvent);
    newEvent.save().then(item => res.json(item));
});



module.exports = router;