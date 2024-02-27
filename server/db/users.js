import mongoose from 'mongoose';
import {randomUUID} from 'crypto'

// Chat Schema
const chatSchema = new mongoose.Schema({
  id: { type: String, defailt: randomUUID()},
  role: { type: String, required: true},
  content: { type: String, required: true}
})

// User Schema
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
});

export const UserModel = mongoose.model('User', UserSchema);
