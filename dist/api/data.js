"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || 'changeme';
function handler(req, res) {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith('Bearer ')) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }
    const token = auth.split(' ')[1];
    try {
        jsonwebtoken_1.default.verify(token, JWT_SECRET);
    }
    catch {
        res.status(401).json({ error: 'Invalid token' });
        return;
    }
    const dataPath = path_1.default.join(process.cwd(), 'data.json');
    fs_1.default.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).json({ error: 'Could not read data file' });
            return;
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(data);
    });
}
