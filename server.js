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
    const myNotes = fs.readFileSync(path.join(__dirname, './db/db.json'), "utf-8");
    const parseMyNotes = JSON.parse(myNotes);

    req.body.id = uuid();
    parseMyNotes.push(req.body);

    fs.writeFileSync(path.join(__dirname, './db/db.json'), JSON.stringify(parseMyNotes), "utf-8");
    res.json("You have successfully added a note");
});

// couldn't figure out how to get the below code to properly function...
// app.post('/api/notes', (req, res) => {
//     console.info(`${req.method} request received to add a note`);

//     const { title, text } = req.body;

//     if (title && text) {
//         const newNote = {
//             title,
//             text,
//             review_id: uuid(),
//         };

//         fs.readFile('./db/db.json', 'utf8', (err, data) => {
//             if (err) {
//                 console.error(err);
//             } else {
//                 const parsedNotes = JSON.parse(data);

//                 parsedNotes.push(newNote);

//                 fs.writeFile(
//                     './db/db.json',
//                     JSON.stringify(parsedNotes, null, 4),
//                     (writeErr) =>
//                         writeErr
//                             ? console.error(writeErr)
//                             : console.info('Successfully updated notes!')
//                 );
//             }
//         });

//         const response = {
//             status: 'success',
//             body: newNote,
//         };

//         console.log(response);
//         res.status(201).json(response);
//     } else {
//         res.status(500).json('Error in posting note');
//     }
// });

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(PORT, () =>
    console.log(`Example app listening at http://localhost:${PORT}`)
);
