const fs = require('fs');
const path = require('path');

export default function handler(req, res) {
  if (req.method === 'POST') {
    const data = JSON.stringify(req.body, null, 2);
    const filePath = path.join(process.cwd(), 'data', 'data.json');

    fs.writeFile(filePath, data, (err) => {
      if (err) {
        res.status(500).send('Fehler beim Speichern der Datei');
      } else {
        res.status(200).send('Daten erfolgreich gespeichert');
      }
    });
  } else {
    res.status(405).send('Method Not Allowed');
  }
}