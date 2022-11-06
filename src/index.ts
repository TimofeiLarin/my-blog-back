import express from 'express';
import { connect } from 'mongoose';

import { authValidation } from './validations/auth';

import { userGetMe, userLogin, userRegister } from './controllers/UserController';

import { checkAuth } from './utils/checkAuth';

const PORT = 4444;

const app = express();

const connectDB = async () => {
 try {
  await connect('mongodb+srv://Admin:ISIl8PKZOqDaxLOb@cluster0.a0jguwj.mongodb.net/my_blog?retryWrites=true&w=majority')
  console.log('Mongo DB OK!');

 } catch (error) {
  console.log('Mongo DB Error==>', error);
 }
};

connectDB();

app.use(express.json());

app.get('/auth/me', checkAuth, userGetMe);

app.post('/auth/login', userLogin);

app.post('/auth/register', authValidation, userRegister);

app.listen(PORT, () => {
  try {
    console.log('Server OK!');
  } catch (error) {
    console.log('error =>', error);
  }
});
