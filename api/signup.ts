import { VercelRequest, VercelResponse } from '@vercel/node';
import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Configuración
const uri = process.env.DATABASE_URL!;
const dbName = 'OdontoActiva';
const usersCollection = 'users';
const JWT_SECRET = process.env.JWT_SECRET || 'changeme';

// Middleware CORS
function withCors(handler: (req: VercelRequest, res: VercelResponse) => void | Promise<void>) {
  return async (req: VercelRequest, res: VercelResponse) => {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*'); // Podés poner el dominio exacto si querés limitar
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Content-Type, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');

    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }

    return handler(req, res);
  };
}

// Handler principal
async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400).json({ error: 'Name, email and password are required' });
    return;
  }

  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    const existing = await db.collection(usersCollection).findOne({ email });
    if (existing) {
      res.status(409).json({ error: 'User already exists' });
      return;
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = {
      name,
      email,
      password: hashed,
      role: 'USER',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection(usersCollection).insertOne(user);
    const token = jwt.sign({ userId: result.insertedId, email, role: 'USER' }, JWT_SECRET, {
      expiresIn: '7d',
    });

    res.status(201).json({ token, user: { name, email, role: 'USER' } });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    await client.close();
  }
}

export default withCors(handler);