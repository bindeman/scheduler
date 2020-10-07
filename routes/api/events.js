const express = require('express');
const router = express.Router();

// Event Model

const Event = require('../../models/Event');

// @route GET api/items
// @desc GET All Visualizations
// @access Public
router.get('/', (req, res) => {
    Event.find()
        .sort({ date: -1 })
        .then(items => res.json(items))
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