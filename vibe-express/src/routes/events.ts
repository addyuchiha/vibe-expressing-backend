import { Router } from 'express';
import { logEvent, getEventLogs, getStats } from '../controllers/eventController';

const router = Router();

// Route to log a new vibe event
router.post('/log', logEvent);

// Route to fetch event logs for a specific session
router.get('/:sessionId/logs', getEventLogs);

// Route to fetch stats for a specific session
router.get('/:sessionId/stats', getStats);

export default router;