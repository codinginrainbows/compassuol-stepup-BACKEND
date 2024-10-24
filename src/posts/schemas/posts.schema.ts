import * as mongoose from 'mongoose';
export const PostsSchema = new mongoose.Schema({
  user: {
    type: String,
  },
  description: {
    type: String,
  },
  url_image: {
    type: String,
  },
  likes: {
    type: Number,
  },
  post_date: {
    type: Date,
    default: Date.now,
  },
});
