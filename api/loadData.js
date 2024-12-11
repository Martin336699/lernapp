const fs = require('fs');
const path = require('path');

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), 'api', 'data.json');

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.status(500).send('Fehler beim Laden der Datei');
    } else {
      res.status(200).send(data);
    }
  });
}