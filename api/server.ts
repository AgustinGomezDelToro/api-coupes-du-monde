import express from 'express';
import cors from 'cors';
import years from './routes/years';
import championsByYear from './routes/championsByYear';
import championMatches from './routes/championMatches';
import bestPlayerStats from './routes/bestPlayerStats';
import champions from './routes/champions';
import bestPlayers from './routes/bestPlayers';

const app = express();
const PORT = 4000;

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

app.use(cors());
app.use(express.json());

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

app.use('/api/years', years);
app.use('/api/championsByYear', championsByYear);
app.use('/api/championMatches', championMatches);
app.use('/api/bestPlayerStats', bestPlayerStats);
app.use('/api/champions', champions);
app.use('/api/bestPlayers', bestPlayers);

console.log('Antes de app.listen');
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
console.log('Después de app.listen');
