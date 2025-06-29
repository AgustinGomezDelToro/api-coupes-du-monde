"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mongodb_1 = require("mongodb");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = (0, express_1.Router)();
const uri = process.env.DATABASE_URL;
const dbName = 'OdontoActiva';
const usersCollection = 'users';
const JWT_SECRET = process.env.JWT_SECRET || 'changeme';
router.post('/', async (req, res, next) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(400).json({ error: 'Name, email and password are required' });
        return;
    }
    const client = new mongodb_1.MongoClient(uri);
    try {
        await client.connect();
        const db = client.db(dbName);
        const existing = await db.collection(usersCollection).findOne({ email });
        if (existing) {
            res.status(409).json({ error: 'User already exists' });
            return;
        }
        const hashed = await bcryptjs_1.default.hash(password, 10);
        const user = {
            name,
            email,
            password: hashed,
            role: 'USER',
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        const result = await db.collection(usersCollection).insertOne(user);
        const token = jsonwebtoken_1.default.sign({ userId: result.insertedId, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
        res.status(201).json({
            token,
            user: {
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    }
    catch (err) {
        next(err); // Pasar el error al middleware global si lo hay
    }
    finally {
        await client.close();
    }
});
exports.default = router;
