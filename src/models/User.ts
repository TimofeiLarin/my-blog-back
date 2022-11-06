import { Schema, Document, model } from 'mongoose';

interface DocumentResult<T> {
  _doc: T;
  createdAt: Date;
  updatedAt: Date;
}
export interface IUserSchema extends Document, DocumentResult<IUserSchema> {
  fullName: string;
  email: string;
  passwordHash: string;
  avatarUrl?: string;
}

const UserSchema = new Schema({
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    avatarUrl: String,
  },
  {
    timestamps: true,
  }
);

const User = model<IUserSchema>('User', UserSchema)

export default User;
