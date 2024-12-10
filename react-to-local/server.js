const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors({
  origin: 'http://localhost:5173'
}));

app.use(bodyParser.json());

app.get('/load', (req, res) => {
  const filePath = path.join(__dirname, 'data.json');

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.status(500).send('Fehler beim Laden der Datei');
    } else {
      res.status(200).send(data);
    }
  });
});

app.post('/save', (req, res) => {
  const data = JSON.stringify(req.body, null, 2);
  const filePath = path.join(__dirname, 'data.json');

  fs.writeFile(filePath, data, (err) => {
    if (err) {
      res.status(500).send('Fehler beim Speichern der Datei');
    } else {
      res.status(200).send('Daten erfolgreich gespeichert');
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});