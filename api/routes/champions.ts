import { Router } from 'express';
import fs from 'fs';
import path from 'path';

const router = Router();

router.get('/', (req, res) => {
  const dataPath = path.join(process.cwd(), 'api/data.json');
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Could not read data file' });

    const champions = JSON.parse(data);
    const simplified = champions.map((c: any) => ({
      id: c.id,
      year: c.year,
      champion: c.champion
    }));

    res.status(200).json(simplified);
  });
});

export default router;
