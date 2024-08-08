import mongoose, { models, Schema } from "mongoose";
type UserType = {
  name: string;
  email: string;
  password: string;
  userPhoto: string;
};

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: true },
  userPhoto: { type: String },
});

const User = models.User || mongoose.model<UserType>("User", UserSchema);

export default User;