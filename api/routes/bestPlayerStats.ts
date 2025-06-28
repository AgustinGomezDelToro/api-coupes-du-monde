import { Router, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

const router = Router();
const dataPath = path.join(process.cwd(), 'api/data.json');

router.get('/', (req: Request, res: Response) => {
  const { year } = req.query;

  fs.readFile(dataPath, 'utf8', (err, rawData) => {
    if (err) return res.status(500).json({ error: 'Failed to read file' });

    const champions = JSON.parse(rawData);
    let filtered = champions;

    if (year) {
      filtered = champions.filter((c: any) => c.year === year);
    }

    const bestPlayers = filtered.map((c: any) => ({
      year: c.year,
      bestPlayer: c.bestPlayer,
      bestPlayerStats: c.bestPlayerStats || null
    }));

    res.json(bestPlayers);
  });
});

export default router;
