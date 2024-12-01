import { Router } from 'express';
import Event from '../controllers/event.controller';

const router = Router();
//RECEIVE REGISTRATION INFO
router.post('/register', Event.register);
//RETURN LIST OF REGISTERED PERSONS
router.get('/all-registered', Event.getAllRegistered);
export default router;
