
import { Schema, model, models } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
interface IUser {
  name: string;
  email: string;
  type: string;
  squad: string;
  avatar?: string;
}

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  type: { type: String, required: true },
  squad: String,
  avatar: String
});

// 3. Create a Model.

module.exports = models.User || model('User', userSchema);
