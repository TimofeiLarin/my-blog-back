import { Schema, Document, model } from 'mongoose';

interface DocumentResult<T> {
  _doc: T;
  createdAt: Date;
  updatedAt: Date;
}
export interface IUserSchema extends Document, DocumentResult<IUserSchema> {
  title: string;
  text: string;
  tags: string[];
  viewsCount: number;
  user: Schema.Types.ObjectId;
  imageUrl: string;
}

const PublicationSchema = new Schema({
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    tags: {
      type: Array,
      default: [],
    },
    viewsCount: {
      type: Number,
      default: 0,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    imageUrl: String,
  },
  {
    timestamps: true,
  }
);

const Publication = model<IUserSchema>('Publication', PublicationSchema)

export default Publication;
