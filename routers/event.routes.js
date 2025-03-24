import express from 'express';
import { assignTeams, createEvent, getPastEvents, registerForEvent, getUpcomingEvents, finishEvent, deleteEvent, getAllEvents }  from '../controllers/event.controller.js';
import { authenticateUser, authorizeRole } from '../middlewares/auth.middleware.js';

const router = express.Router();


router.post('/createEvent', authenticateUser, authorizeRole(["organizer"]), createEvent);
router.post('/registerForEvent/:id', registerForEvent);
router.post('/assignTeams/:id', authenticateUser, authorizeRole(["organizer"]), assignTeams);
router.post('/finishEvents/:id', authenticateUser, authorizeRole(["organizer"]), finishEvent);
router.post('/deleteEvent/:id', authenticateUser, authorizeRole(["organizer"]), deleteEvent);
router.get('/events', authenticateUser, authorizeRole(["organizer"]), getAllEvents);
router.get('/pastEvents', authenticateUser, authorizeRole(["organizer"]), getPastEvents);
router.get('/upComingEvents', authenticateUser, authorizeRole(["organizer"]), getUpcomingEvents);




export default router;