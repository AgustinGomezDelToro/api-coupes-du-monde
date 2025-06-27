import { VercelRequest, VercelResponse } from '@vercel/node';
import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'changeme';

export default function handler(req: VercelRequest, res: VercelResponse) {
  // ✅ CORS HEADERS
  res.setHeader('Access-Control-Allow-Origin', '*'); // O poné tu frontend en producción
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // ✅ OPTIONS preflight check (CORS)
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // 🔐 AUTENTICACIÓN JWT
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const token = auth.split(' ')[1];
  try {
    jwt.verify(token, JWT_SECRET);
  } catch {
    res.status(401).json({ error: 'Invalid token' });
    return;
  }

  // 📁 LECTURA DEL ARCHIVO
  const dataPath = path.join(process.cwd(), 'data.json');
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ error: 'Could not read data file' });
      return;
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(data);
  });
}
