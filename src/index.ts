import express from 'express';
import { connect } from 'mongoose';

import { userGetMe, userLogin, userRegister } from './controllers/UserController';
import {
  createPublication,
  getAllPublications,
  getOnePublication,
  removePublication,
  updatePublication,
} from './controllers/PostController';

import { authValidation, loginValidation } from './validations/auth';
import { createPublicationValidation } from './validations/publication';

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

app.post('/auth/login', loginValidation, userLogin);

app.post('/auth/register', authValidation, userRegister);

app.get('/auth/me', checkAuth, userGetMe);

app.get('/publications', checkAuth, getAllPublications);

app.get('/publications/:id', checkAuth, getOnePublication);

app.post('/publications', checkAuth, createPublicationValidation, createPublication);

app.delete('/publications/:id', checkAuth, removePublication);

app.patch('/publications/:id', checkAuth, createPublicationValidation, updatePublication);

app.listen(PORT, () => {
  try {
    console.log('Server OK!');
  } catch (error) {
    console.log('error =>', error);
  }
});
