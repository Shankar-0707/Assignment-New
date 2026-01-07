import mongoose, { Schema, model, models } from 'mongoose';

export interface INote {
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}

const NoteSchema = new Schema<INote>(
    {
        title: {
            type: String,
            required: [true, 'Please provide a title for the note.'],
            maxlength: [100, 'Title cannot be more than 100 characters'],
        },
        content: {
            type: String,
            required: [true, 'Please provide content for the note.'],
        },
    },
    {
        timestamps: true,
    }
);

export default models.Note || model<INote>('Note', NoteSchema);
