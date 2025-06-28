import { VercelRequest, VercelResponse } from '@vercel/node';
import fs from 'fs';
import path from 'path';
import { handleCors } from '../utils/cors';

export default function handler(req: VercelRequest, res: VercelResponse) {
  // 🛡️ CORS
  if (handleCors(req, res)) return;

  const { id } = req.query;
  if (!id) {
    res.status(400).json({ error: 'Id is required' });
    return;
  }

  const dataPath = path.join(process.cwd(), 'data.json');
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ error: 'Could not read data file' });
      return;
    }

    const champions = JSON.parse(data);
    const champion = champions.find((c: any) => (c.id || c.champion) === id);

    if (!champion) {
      res.status(404).json({ error: 'Champion not found' });
      return;
    }

    res.status(200).json(champion);
  });
}
