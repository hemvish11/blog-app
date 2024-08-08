import mongoose, { Document, Schema } from "mongoose";

export interface BlogInterface extends Document {
  user: mongoose.Types.ObjectId;
  userPhoto:string;
  name: string;
  title: string;
  description: string;
  img: string;
}

const blogSchema: Schema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
  },
  userPhoto: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
});

const Blog =
  mongoose.models.Blog || mongoose.model<BlogInterface>("Blog", blogSchema);

export default Blog;
