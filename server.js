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



app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(PORT, () =>
    console.log(`Example app listening at http://localhost:${PORT}`)
);
