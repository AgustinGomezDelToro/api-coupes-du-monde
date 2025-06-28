import { VercelRequest, VercelResponse } from '@vercel/node';
import fs from 'fs';
import path from 'path';
import { handleCors } from '../utils/cors';

export default function handler(req: VercelRequest, res: VercelResponse) {
  // 🛡️ CORS
  if (handleCors(req, res)) return;

  const { year } = req.query;
  if (!year) {
    res.status(400).json({ error: 'Year is required' });
    return;
  }

  const dataPath = path.join(process.cwd(), 'data.json');
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ error: 'Could not read data file' });
      return;
    }

    const champions = JSON.parse(data);
    const mundial = champions.find((c: any) => c.year === year);

    if (!mundial) {
      res.status(404).json({ error: 'World Cup not found for that year' });
      return;
    }

    res.status(200).json({
      year: mundial.year,
      champion: mundial.champion,
      matches: mundial.matches || [],
    });
  });
}
