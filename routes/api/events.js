const express = require('express');
const router = express.Router();
const moment = require("moment-timezone");

// Event Model

const Event = require('../../models/Event');

// @route GET api/items
// @desc GET All Visualizations
// @access Public
router.get('/', (req, res) => {
    let now = new Date();
    const timezone = req.get("timezone");
    console.log(req.get("timezone"));
    Event.find({date: {$gte: now} })
        .lean()
        .sort({ date: 1 })
        .then((items) => {
            let day = -1;
            items.map(item => {
                //const date = item.date;
                let itemDay = Number(moment(item.date).tz(timezone).format('D'));
                item.dateInUserTimeZone = moment(item.date).tz(timezone).format();
                console.log(item.dateInUserTimeZone);
                if(itemDay != day) {
                    item.dateHeader = true;
                    day = itemDay;
                }
               //item.dateInUserTimezone = moment(item.date).tz(timezone).format();
               // console.log("Moment: " + moment(item.date).tz(timezone).format('LT z'));
               // console.log("Item: " + item.date);
            });
            res.json(items);
        })
});




//display all future events
router.get('/category/:number', (req, res) => {
    let now = new Date();
    Event.find({ category: req.params.number, date: {$gte: now} })
        .sort({ date: 1 })
        .then(items => res.json(items))
        .catch(err => res.status(404).json({ success: false }));
});


router.get('match/:id', (req, res) => {
    Event.findById(req.params.id)
        .then(items => res.json(items))
});




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
        link: req.body.title,
        description: req.body.presenter,
    });
    newEvent.save().then(item => res.json(item));
});

// @route DELETE api/items/:id
// @desc Delete a Post
// @access Public
router.delete('/:id', (req, res) => {
    Event.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({ sucesss: true })))
        .catch(err => res.status(404).json({ success: false }));
});


module.exports = router;