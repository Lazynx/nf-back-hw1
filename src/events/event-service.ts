import mongoose from 'mongoose';
import { CreateEventDto } from './dtos/CreateEvent.dot';
import EventModel, { IEvent } from './models/Event';
import { Event } from './types/response';



// this event service instance shows how to create a event, get a event by id, and get all events with in-memory data
class EventService {
  
    async getEventById(id: string): Promise<IEvent | null> {
      return await EventModel.findById(id).exec();
    }

    async getEvents(page: number, limit: number, sortBy: string, sortDirection: string ): Promise<IEvent[]> {
      const sortCriteria = {};
      sortCriteria[sortBy] = sortDirection === 'asc'? 1 : -1;

      return await EventModel.find().sort(sortCriteria).skip((page - 1) * limit).limit(limit).exec(); 
    }

    async createEvent(createEventDto: CreateEventDto): Promise<IEvent> {
      const { name, description, date, location, duration, rating } = createEventDto;
      const newEvent = new EventModel({
        name,
        description,
        date: new Date(date),
        location,
        duration,
        rating
      });
  
      await newEvent.save();
      return newEvent;
    }
}
  
  export default EventService;
  