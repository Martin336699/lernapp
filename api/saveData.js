const fs = require('fs');
const path = require('path');

export default function handler(req, res) {
  if (req.method === 'POST') {
    const newData = req.body;

    fs.writeFile(path.join(process.cwd(), 'api', 'data.json'), JSON.stringify(newData, null, 2), (err) => {
      if (err) {
        console.error('Error writing to file', err);
        res.status(500).send('Error saving data');
      } else {
        res.status(200).send('Data saved successfully');
      }
    });
  } else {
    res.status(405).send('Method Not Allowed');
  }
}