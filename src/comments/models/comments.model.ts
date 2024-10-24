import { Document, ObjectId } from 'mongoose';

export interface Post extends Document {
  post_id: ObjectId;
  user: string;
  comment: string;
}
