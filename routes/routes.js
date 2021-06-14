const path = require('path');
const store = require('../db/db');

// This lets this page know that web data will be coming

const router = require('express').Router();

// Test route
// router.get('/ping', (req, res) => {
//     return res.json(Date.now());
// });

router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
});

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

router.post('/notes', (req, res) => {
    store
        .addNote(req.body)
        .then((note) => res.json(note))
        .catch((err) => res.status(500).json(err));
});

module.exports = router;