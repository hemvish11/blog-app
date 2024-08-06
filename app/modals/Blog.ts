import mongoose, { Document, Schema } from "mongoose";

export interface BlogInterface extends Document {
  id: number;
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
