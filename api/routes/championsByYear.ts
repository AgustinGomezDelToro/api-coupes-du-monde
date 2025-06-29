import { Router, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

const router = Router();
const dataPath = path.join(process.cwd(), 'api/data.json');

interface Params {
  year: string;
}

router.get('/:year', (req: Request<Params>, res: Response) => {
  const { year } = req.params;

  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Failed to read file' });

    try {
      const champions = JSON.parse(data);
      const found = champions.find((c: any) => c.year === year);

      if (!found) return res.status(404).json({ error: 'Champion not found for that year' });

      res.status(200).json(found);
    } catch (parseError) {
      res.status(500).json({ error: 'Error parsing JSON data' });
    }
  });
});

export default router;
