import mongoose, { Schema, Document, models } from 'mongoose';

export interface ISavedEvent extends Document {
  userId: string;
  eventId: string;
  status: 'going' | 'not going';
}

const SavedEventSchema = new Schema<ISavedEvent>(
  {
    userId: { type: String, required: true },
    eventId: { type: String, required: true },
    status: { type: String, enum: ['going', 'not going'], required: true },
  },
  { timestamps: true }
);

export default models.SavedEvent || mongoose.model<ISavedEvent>('SavedEvent', SavedEventSchema);
