import { Schema, model } from 'mongoose';

// create an interface representing a document in MongoDB
interface ITour {
  name: string;
  rating: number;
  price: number;
}

// create a schema corresponding to the document interface
const tourSchema = new Schema<ITour>({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
});

// create a model
const Tour = model<ITour>('Tour', tourSchema);

export default Tour;
