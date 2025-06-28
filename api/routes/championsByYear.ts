import { Router, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

const router = Router();

interface Params {
  year: string;
}

router.get('/:year', (req: Request<Params>, res: Response) => {
  const { year } = req.params;

  const dataPath = path.join(process.cwd(), 'data.json');
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'File error' });

    const champions = JSON.parse(data);
    const champ = champions.find((c: any) => c.year === year);

    if (!champ) return res.status(404).json({ error: 'Not found' });
    res.json(champ);
  });
});

export default router;
