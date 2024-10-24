import * as mongoose from 'mongoose';
export const CommentsSchema = new mongoose.Schema({
  post_id: {
    type: String,
  },
  user: {
    type: String,
  },
  comment: {
    type: String,
  },
});
