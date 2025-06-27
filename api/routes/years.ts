import { VercelRequest, VercelResponse } from '@vercel/node';
import fs from 'fs';
import path from 'path';

export default function handler(req: VercelRequest, res: VercelResponse) {
  const dataPath = path.join(process.cwd(), 'data.json');
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ error: 'Could not read data file' });
      return;
    }
    const champions = JSON.parse(data);
    const years = champions.map((c: any) => c.year);
    res.status(200).json(years);
  });
} 