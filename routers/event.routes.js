import express from 'express';
import { assignTeams, createEvent, pastEvents, registerForEvent, upComingEvents, finishEvents, deleteEvent, events }  from '../controllers/event.controller.js';
import { authenticateUser, authorizeRole } from '../middlewares/auth.middleware.js';

const router = express.Router();


router.post('/createEvent', authenticateUser, authorizeRole(["organizer"]), createEvent);
router.post('/registerForEvent/:id', registerForEvent);
router.post('/assignTeams/:id', authenticateUser, authorizeRole(["organizer"]), assignTeams);
router.post('/finishEvents/:id', authenticateUser, authorizeRole(["organizer"]), finishEvents);
router.post('/deleteEvent/:id', authenticateUser, authorizeRole(["organizer"]), deleteEvent);
router.get('/events', authenticateUser, authorizeRole(["organizer"]), events);
router.get('/pastEvents', authenticateUser, authorizeRole(["organizer"]), pastEvents);
router.get('/upComingEvents', authenticateUser, authorizeRole(["organizer"]), upComingEvents);




export default router;