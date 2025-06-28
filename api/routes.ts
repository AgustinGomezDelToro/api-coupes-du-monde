// api/routes.ts
import { VercelRequest, VercelResponse } from '@vercel/node';
import path from 'path';
import fs from 'fs';
import { handleCors } from './utils/cors';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS
  if (handleCors(req, res)) return;

  const { pathname, searchParams } = new URL(req.url || '', `http://${req.headers.host}`);
  const dataPath = path.join(process.cwd(), 'data.json');

  fs.readFile(dataPath, 'utf8', (err, rawData) => {
    if (err) {
      res.status(500).json({ error: 'Could not read data file' });
      return;
    }

    const champions = JSON.parse(rawData);

    // /api/routes/champions
    if (pathname === '/api/routes/champions') {
      const result = champions.map((c: any) => ({
        id: c.id || c.champion,
        year: c.year,
        champion: c.champion,
        bestPlayer: c.bestPlayer,
        location: c.location
      }));
      res.status(200).json(result);
      return;
    }

    // /api/routes/championsByYear?year=XXXX
    if (pathname === '/api/routes/championsByYear') {
      const year = searchParams.get('year');
      if (!year) {
        res.status(400).json({ error: 'Year is required' });
        return;
      }
      const mundial = champions.find((c: any) => c.year === year);
      if (!mundial) {
        res.status(404).json({ error: 'World Cup not found for that year' });
        return;
      }
      res.status(200).json({
        year: mundial.year,
        champion: mundial.champion,
        matches: mundial.matches || []
      });
      return;
    }

    // /api/routes/championById?id=ID
    if (pathname === '/api/routes/championById') {
      const id = searchParams.get('id');
      if (!id) {
        res.status(400).json({ error: 'Id is required' });
        return;
      }
      const champion = champions.find((c: any) => (c.id || c.champion) === id);
      if (!champion) {
        res.status(404).json({ error: 'Champion not found' });
        return;
      }
      res.status(200).json(champion);
      return;
    }

    // /api/routes/years
    if (pathname === '/api/routes/years') {
      const years = champions.map((c: any) => c.year);
      res.status(200).json(years);
      return;
    }

    // /api/routes/bestPlayers
    if (pathname === '/api/routes/bestPlayers') {
      const bestPlayers = champions.map((c: any) => ({
        year: c.year,
        bestPlayer: c.bestPlayer,
        champion: c.champion
      }));
      res.status(200).json(bestPlayers);
      return;
    }

    // /api/routes/bestPlayerStats?year=YYYY
    if (pathname === '/api/routes/bestPlayerStats') {
      const year = searchParams.get('year');
      if (!year) {
        res.status(400).json({ error: 'Year is required' });
        return;
      }
      const mundial = champions.find((c: any) => c.year === year);
      if (!mundial) {
        res.status(404).json({ error: 'World Cup not found for that year' });
        return;
      }
      res.status(200).json({
        year: mundial.year,
        champion: mundial.champion,
        bestPlayer: mundial.bestPlayer,
        stats: mundial.bestPlayerStats || null
      });
      return;
    }

    // 404 fallback
    res.status(404).json({ error: 'Route not found' });
  });
}
