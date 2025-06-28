// api/routes/bestPlayers.ts
import { Router } from 'express';
import fs from 'fs';
import path from 'path';

const router = Router();

router.get('/', (req, res) => {
  const dataPath = path.join(process.cwd(), 'api/data.json');
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ error: 'Could not read data file' });
      return;
    }

    const champions = JSON.parse(data);
    const bestPlayers = champions.map((c: any) => ({
      year: c.year,
      bestPlayer: c.bestPlayer,
      champion: c.champion,
    }));

    res.status(200).json(bestPlayers);
  });
});

export default router;
