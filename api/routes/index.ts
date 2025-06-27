import { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.status(200).json({
    routes: [
      {
        path: '/api/routes/champions',
        method: 'GET',
        description: 'Liste tous les pays champions du monde (informations de base).'
      },
      {
        path: '/api/routes/championsByYear?year=YYYY',
        method: 'GET',
        description: 'Retourne le champion du monde pour une année donnée.'
      },
      {
        path: '/api/routes/championById?id=ID',
        method: 'GET',
        description: 'Retourne les détails d’un champion à partir de son identifiant (ou nom si pas d’id).'
      },
      {
        path: '/api/routes/years',
        method: 'GET',
        description: 'Liste toutes les années de Coupe du Monde disponibles.'
      },
      {
        path: '/api/routes/bestPlayers',
        method: 'GET',
        description: 'Liste les meilleurs joueurs de chaque Coupe du Monde.'
      },
      {
        path: '/api/routes/bestPlayerStats?year=YYYY',
        method: 'GET',
        description: 'Statistiques du meilleur joueur pour une année donnée (si disponibles).'
      },
      {
        path: '/api/routes/championMatches?year=YYYY',
        method: 'GET',
        description: 'Liste les matchs et résultats du pays champion pour une année donnée.'
      }
    ]
  });
}
