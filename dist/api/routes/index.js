"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// api/routes/index.ts
const express_1 = require("express");
const bestPlayers_1 = __importDefault(require("./bestPlayers"));
const bestPlayerStats_1 = __importDefault(require("./bestPlayerStats"));
const championMatches_1 = __importDefault(require("./championMatches"));
const champions_1 = __importDefault(require("./champions"));
const championsByYear_1 = __importDefault(require("./championsByYear"));
const years_1 = __importDefault(require("./years"));
const router = (0, express_1.Router)();
router.use('/bestPlayers', bestPlayers_1.default);
router.use('/bestPlayerStats', bestPlayerStats_1.default);
router.use('/championMatches', championMatches_1.default);
router.use('/champions', champions_1.default);
router.use('/championsByYear', championsByYear_1.default);
router.use('/years', years_1.default);
exports.default = router;
