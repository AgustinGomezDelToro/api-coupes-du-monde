import { Router } from 'express';
import fs from 'fs';
import path from 'path';

const router = Router();

router.get('/', (req, res) => {
  const dataPath = path.join(process.cwd(), 'api/data.json');
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Could not read data file' });

    const champions = JSON.parse(data);
    const years = champions.map((c: any) => c.year);

    res.status(200).json(years);
  });
});

export default router;
