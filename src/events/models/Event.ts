import mongoose, { Document, Schema } from 'mongoose';

export interface IEvent extends Document {
    name: string;
    description: string;
    date: Date;
    location: string;
    duration: string;
    rating?: number;
}

const EventSchema: Schema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    duration: { type: String, required: true },
    rating: { type: Number, default: 0 },
});

export default mongoose.model<IEvent>('Event', EventSchema);
