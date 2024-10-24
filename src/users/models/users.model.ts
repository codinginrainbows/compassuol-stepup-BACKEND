import { Document, ObjectId } from 'mongoose';

export interface User extends Document {
  id: ObjectId;
  name: string;
  user: string;
  birthdate: Date;
  email: string;
  password: string;
}
