
import { Schema, model, models } from 'mongoose';

interface ILocation {
  name: string;
  lat: number;
  lng: number;
  type: string;
  link: string;
}

const locationSchema = new Schema<ILocation>({
  name: { type: String, required: true },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  type: { type: String, required: true },
  link: String
});

module.exports = models.Location || model('Location', locationSchema);