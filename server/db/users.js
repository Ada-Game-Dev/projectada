import mongoose from 'mongoose';

// User Schema
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
});

export const UserModel = mongoose.model('User', UserSchema);
