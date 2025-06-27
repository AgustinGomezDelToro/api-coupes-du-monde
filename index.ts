import express from 'express';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = 4000;

app.get('/data', (req, res) => {
  const dataPath = path.join(__dirname, 'data.json');
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ error: 'Could not read data file' });
      return;
    }
    res.json(JSON.parse(data));
  });
});

app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Data Redirect</title>
      </head>
      <body style="font-family: Arial, sans-serif; text-align: center; margin-top: 100px;">
        <h1>Welcome!</h1>
        <p>Click the button below to view the data.</p>
        <a href="/data">
          <button style="padding: 10px 20px; font-size: 16px; cursor: pointer;">Go to Data</button>
        </a>
      </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
}); 

