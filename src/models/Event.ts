// src/models/Event.js

import mongoose, { Document, Schema } from 'mongoose';

interface IEvent extends Document {
eventId: string;
image: string | null;
video: string | null;
caption: string;
isVideo: boolean;
eventDate?: string | null;
eventTime?: string | null;
location?: string | null;
postDate: string;
}

const eventSchema: Schema = new Schema({
eventId: { type: String, required: true, unique: true },
image: { type: String, default: null },
video: { type: String, default: null },
caption: { type: String, required: true },
isVideo: { type: Boolean, required: true },
eventDate: { type: String, default: null },
eventTime: { type: String, default: null },
location: { type: String, default: null },
postDate: { type: String, required: true }
}, {
timestamps: true
});

const Event = mongoose.models.Event || mongoose.model<IEvent>('Event', eventSchema);

export default Event;
