import { Schema, model } from 'mongoose';

interface IUserSchema {
  fullName: string;
  email: string;
  passwordHash: string;
  avatarUrl?: string;
}

const UserSchema = new Schema<IUserSchema>({
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

export default model('User', UserSchema);
