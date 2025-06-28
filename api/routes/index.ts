// api/routes/index.ts
import { Router } from 'express';
import bestPlayers from './bestPlayers';
import bestPlayerStats from './bestPlayerStats';
import championMatches from './championMatches';
import champions from './champions';
import championsByYear from './championsByYear';
import years from './years';

const router = Router();

router.use('/bestPlayers', bestPlayers);
router.use('/bestPlayerStats', bestPlayerStats);
router.use('/championMatches', championMatches);
router.use('/champions', champions);
router.use('/championsByYear', championsByYear);
router.use('/years', years);

export default router;
