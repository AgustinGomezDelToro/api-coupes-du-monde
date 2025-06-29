import { Router, Request, Response, NextFunction } from 'express';
import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = Router();

const uri: string = process.env.DATABASE_URL!;
const dbName = 'OdontoActiva';
const usersCollection = 'users';
const JWT_SECRET = process.env.JWT_SECRET || 'changeme';

router.post('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { name, email, password } = req.body as {
    name?: string;
    email?: string;
    password?: string;
  };

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

    const token = jwt.sign(
      { userId: result.insertedId, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      token,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    next(err); // Pasar el error al middleware global si lo hay
  } finally {
    await client.close();
  }
});

export default router;
