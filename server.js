const express = require('express');
const fs = require('fs');
const questionBank = require('./questions');
const novels = require('./data/novels.json');
const waec = require('./data/waec.json');



const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.static(__dirname));

const subjects = [
  "English Language",
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "Economics",
  "Government",
  "Literature in English",
  "Geography",
  "Commerce",
  "Accounting",
  "Christian Religious Studies",
  "Islamic Religious Studies",
  "Agricultural Science",
  "Computer Studies",
  "Civic Education",
  "History",
  "Igbo",
];

app.get('/api/data', (req, res) => {
  res.json({ questionBank, subjects, novels: novels.novels, waec });
});
app.get('/', (req, res) => {
  res.redirect('/anox');
});
app.get("/anox", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.listen(PORT, () => {
  console.log(`ANOX JAMB app running at http://localhost:${PORT}/anox`);
});
