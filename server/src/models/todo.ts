import mongoose, { Schema, Document } from 'mongoose';
import { Todo } from '@todos-ts/shared';

export interface ITodoDocument extends Omit<Todo, 'id'>, Document {
  _id: string;
}

const TodoSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  description: {
    type: String,
    trim: true,
    maxlength: 1000
  },
  completed: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
  toJSON: {
    transform: function(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
});

export const TodoModel = mongoose.model<ITodoDocument>('Todo', TodoSchema);