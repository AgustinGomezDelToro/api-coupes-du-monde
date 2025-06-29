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
router.get('/:year', (req, res) => {
    const { year } = req.params;
    fs_1.default.readFile(dataPath, 'utf8', (err, data) => {
        if (err)
            return res.status(500).json({ error: 'Failed to read file' });
        try {
            const champions = JSON.parse(data);
            const found = champions.find((c) => c.year === year);
            if (!found)
                return res.status(404).json({ error: 'Champion not found for that year' });
            res.status(200).json(found);
        }
        catch (parseError) {
            res.status(500).json({ error: 'Error parsing JSON data' });
        }
    });
});
exports.default = router;
