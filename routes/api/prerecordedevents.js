const express = require('express');
const router = express.Router();
const moment = require("moment-timezone");

// Event Model

const PreRecordedEvent = require('../../models/PreRecordedEvent');

// @route GET api/items
// @desc GET All Visualizations
// @access Public
//See past events across all categories

router.get('/category/:number', (req, res) => {
    let now = new Date()
    const timezone = req.get("timezone") ? req.get("timezone") : "Etc/GMT";
    PreRecordedEvent.find({category: req.params.number})
        .lean()
        .sort({ title: 1 })
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

router.get('/id/:number', (req, res) => {
    PreRecordedEvent.findOne({id: req.params.number}, "presenters")
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
    const newEvent = new PreRecordedEvent({
        id: req.body.id,
        title: req.body.title,
        presenter: req.body.presenter,
        organization: req.body.organization,
        date: req.body.date,
        duration: req.body.duration,
        category: req.body.category,
        link: req.body.link,
        description: req.body.description,
        bio: req.body.bio,
    });
    console.log(newEvent);
    newEvent.save().then(item => res.json(item));
});



module.exports = router;