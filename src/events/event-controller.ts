import { Request, Response } from 'express';
import { CreateEventDto } from './dtos/CreateEvent.dot';
import EventService from './event-service';

class EventController {
    private eventService : EventService;


    constructor(eventService : EventService){
        this.eventService = eventService;
    }

    private getPaginationAndSortingParams(req: Request) {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const sortBy = req.query.sortBy as string || 'rating';
        const sortDirection = req.query.sortDirection as 'asc' | 'desc' || 'asc';
        return { page, limit, sortBy, sortDirection };
    } 

    createEvent = async (req: Request, res: Response): Promise<void> => {
        try {
          const createEventDto: CreateEventDto = req.body;
          const event = await this.eventService.createEvent(createEventDto);
          res.status(201).json(event);
        } catch (error: any) {
          res.status(500).send({ error: error.message });
        }
    }

    getEvents = async (req: Request, res: Response): Promise<void> => {
        try {
            const { page, limit, sortBy, sortDirection } = this.getPaginationAndSortingParams(req);
            const events = await this.eventService.getEvents(page, limit, sortBy, sortDirection);
            res.status(200).json(events);
        } catch (error: any) {
            res.status(500).send({ error: error.message });
        }
    }

    getEventById = async (req: Request, res: Response): Promise<void> => {
        try {
          const { id } = req.params;
          const event = await this.eventService.getEventById(id);
          if (!event) {
            res.status(404).json({ message: 'Event not found' });
            return;
          }
          res.status(200).json(event);
        } catch (error: any) {
          res.status(500).send({ error: error.message });
        }
    }

    getUsersEvents = async (req: Request, res: Response): Promise<void> => {
        try {
            const { page, limit, sortBy, sortDirection } = this.getPaginationAndSortingParams(req);

            const user = (req as any).user;
            const userLocation = user.city;
        
            const allEvents = await this.eventService.getEvents(page, limit, sortBy, sortDirection);
            
            const userEvents = allEvents.filter(event => event.location === userLocation);
        
            res.status(200).json(userEvents);
        } catch (error: any) {
            res.status(500).send({ error: error.message });
        }
      };
      
}

export default EventController;