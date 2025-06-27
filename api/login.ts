import { VercelRequest, VercelResponse } from '@vercel/node';
import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Configuración
const uri = process.env.DATABASE_URL!;
const dbName = 'OdontoActiva';
const usersCollection = 'users';
const JWT_SECRET = process.env.JWT_SECRET || 'changeme';

// Handler principal
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ error: 'Email and password are required' });
    return;
  }

  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    const user = await db.collection(usersCollection).findOne({ email });
    if (!user) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }
    const token = jwt.sign({ userId: user._id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    res.status(200).json({ token, user: { name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    await client.close();
  }
}
