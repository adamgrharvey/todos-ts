import mongoose, {Document, Schema} from "mongoose";
import { v4 as uuidv4 } from 'uuid';

export interface ITodo extends Document {
    _id: string
    title: string
    isComplete: boolean
    createdAt: Date
    updatedAt: Date
}

const TodoSchema = new Schema<ITodo>({
    _id: {
        type: String,
        required: true,
        default: uuidv4
    },
    title: {
        type: String,
        required: true,
    },
    isComplete: {
        type: Boolean,
        default: false
    }
    
}, {
    timestamps: true
})

export const Todo = mongoose.model<ITodo>('Todo', TodoSchema)