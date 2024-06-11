import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth-middleware';
import EventController from './event-controller';
import EventService from './event-service';

//in order to provide our frontend with the user data, we need to specify user routes

const eventRouter = Router();

const eventService = new EventService();
const eventController = new EventController(eventService);

// Example protected route
eventRouter.get('/events/yours', authMiddleware, eventController.getUsersEvents);

eventRouter.get('/events/', eventController.getEvents);
eventRouter.post('/events/', eventController.createEvent);
eventRouter.get('/events/:id', eventController.getEventById);  

export default eventRouter;
