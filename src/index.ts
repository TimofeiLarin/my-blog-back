import express, { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { connect } from 'mongoose';
// import jwt from 'jsonwebtoken';

import { authValidation } from './validations/auth';

const app = express();

const connectDB = async () => {
 try {
  await connect('mongodb+srv://Admin:WmwTJ9XXUEkuUKGP@cluster0.a0jguwj.mongodb.net/?retryWrites=true&w=majority')
  console.log('Mongo DB OK!');

 } catch (error) {
  console.log('Mongo DB Error==>', error);
 }
};

connectDB();

app.use(express.json());

app.get('/', (_, res) => {
  res.send('hi tim');
});

app.post('/login', (req, res) => {
  console.log(req.body);

  res.json({
    success: true,
  });
  // res.send('hi tim');
})

app.post('/auth/register', authValidation, (request: Request, response: Response) => {
  const errors = validationResult(request);

  if(errors.isEmpty()) {
    return response.status(400).json(errors.array());
  }

  return response.json({
    success: true,
  });
});

app.listen(4444, () => {
  try {
    console.log('Server OK!');
  } catch (error) {
    console.log('error =>', error);
  }
});
