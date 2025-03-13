import express from 'express';
import { assignTeams, createEvent, registerForEvent }  from '../controllers/event.controller.js';

const router = express.Router();


router.post('/createEvent', createEvent);
router.post('/registerForEvent/:id', registerForEvent);
router.post('/assignTeams/:id', assignTeams);





export default router;