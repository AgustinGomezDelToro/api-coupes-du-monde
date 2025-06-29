"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const years_1 = __importDefault(require("./routes/years"));
const championsByYear_1 = __importDefault(require("./routes/championsByYear"));
const championMatches_1 = __importDefault(require("./routes/championMatches"));
const bestPlayerStats_1 = __importDefault(require("./routes/bestPlayerStats"));
const champions_1 = __importDefault(require("./routes/champions"));
const bestPlayers_1 = __importDefault(require("./routes/bestPlayers"));
const path_1 = __importDefault(require("path"));
const signup_1 = __importDefault(require("./signup"));
const login_1 = __importDefault(require("./login"));
const app = (0, express_1.default)();
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PORT = process.env.PORT || 4000;
app.use(express_1.default.static(path_1.default.join(__dirname, '../../public')));
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
});
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
app.use((0, cors_1.default)({
    origin: '*',
    credentials: true
}));
app.use(express_1.default.json());
// Mensaje de bienvenida y rutas disponibles
app.get('/', (req, res) => {
    res.json({
        message: 'Bienvenido a la API de Campeones del Mundo',
        rutas: [
            '/api/years',
            '/api/championsByYear',
            '/api/championMatches',
            '/api/bestPlayerStats',
            '/api/champions',
            '/api/bestPlayers'
        ]
    });
});
app.use('/api/login', login_1.default);
app.use('/api/signup', signup_1.default);
app.use('/api/years', years_1.default);
app.use('/api/championsByYear', championsByYear_1.default);
app.use('/api/championMatches', championMatches_1.default);
app.use('/api/bestPlayerStats', bestPlayerStats_1.default);
app.use('/api/champions', champions_1.default);
app.use('/api/bestPlayers', bestPlayers_1.default);
console.log('Antes de app.listen');
app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});
console.log('Después de app.listen');
