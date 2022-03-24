const express = require('express');
const path = require('path');
const fs = require('fs');
const dbJSON = require('./db/db.json');
const uuid = require('./helpers/uuid');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    const data = fs.readFileSync(path.join(__dirname, './db/db.json'), "utf-8");
    const parseData = JSON.parse(data);
    res.json(parseData);
});

app.post('/api/notes', (req, res) => {
    const data = fs.readFileSync(path.join(__dirname, './db/db.json'), "utf-8");
    const parseData = JSON.parse(data);
    res.json(parseData);
});

// app.post('/api/notes', (req, res) => {
//     // Log that a POST request was received
//     console.info(`${req.method} request received to submit note`);

//     // Destructuring assignment for the items in req.body
//     const { title, text, } = req.body;

//     // If all the required properties are present
//     if (title && text) {
//         // Variable for the object we will save
//         const newNote = {
//             title,
//             text,
//             note_id: uuid(),
//         };

//         readAndAppend(newNote, './db/db.json');

//         const data = {
//             status: 'success',
//             body: newNote,
//         };

//         res.json(data);
//     } else {
//         res.json('Error in posting note');
//     }
// });

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(PORT, () =>
    console.log(`Example app listening at http://localhost:${PORT}`)
);
