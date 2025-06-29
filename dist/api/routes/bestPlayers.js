"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// api/routes/bestPlayers.ts
const express_1 = require("express");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    const dataPath = path_1.default.join(process.cwd(), 'api/data.json');
    fs_1.default.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).json({ error: 'Could not read data file' });
            return;
        }
        const champions = JSON.parse(data);
        const bestPlayers = champions.map((c) => ({
            year: c.year,
            bestPlayer: c.bestPlayer,
            champion: c.champion,
        }));
        res.status(200).json(bestPlayers);
    });
});
exports.default = router;
