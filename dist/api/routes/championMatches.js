"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const router = (0, express_1.Router)();
const dataPath = path_1.default.join(process.cwd(), 'api/data.json');
router.get('/', (req, res) => {
    const { year } = req.query;
    fs_1.default.readFile(dataPath, 'utf8', (err, rawData) => {
        if (err)
            return res.status(500).json({ error: 'Failed to read file' });
        const champions = JSON.parse(rawData);
        let filtered = champions;
        if (year) {
            filtered = champions.filter((c) => c.year === year);
        }
        const matches = filtered.map((c) => ({
            year: c.year,
            bestPlayer: c.bestPlayer,
            matches: Array.isArray(c.matches) ? c.matches : []
        }));
        res.json(matches);
    });
});
exports.default = router;
