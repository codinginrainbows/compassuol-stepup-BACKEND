import { Document, ObjectId } from 'mongoose';

export interface Post extends Document {
  id: ObjectId;
  user: string;
  description: string;
  url_image: string;
  likes: number;
}
