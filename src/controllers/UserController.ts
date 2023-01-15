import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import UserModel from '../models/User';

const userRegister = async (request: Request, response: Response) => {
  try {
    const password = request.body.password;
    const salt = await bcrypt.genSalt(10);
    const createdPasswordHash = await bcrypt.hash(password, salt)

    const doc = new UserModel({
      email: request.body.email,
      fullName: request.body.fullName,
      passwordHash: createdPasswordHash,
      avatarUrl: request.body.avatarUrl || '',
    });

    const user = await doc.save();

    const token = jwt.sign({
        _id: user._id,
      },
      'keySecret521',
      {
        expiresIn: '30d',
      },
    );

    const {passwordHash, ...requiredUserData} = user._doc;

    return response.json({...requiredUserData, token});
  } catch(error) {
    console.log('error, /auth/register', error)
    response.status(500).json({
      message: 'Failed to register',
      error,
    });
  }
};

const userLogin = async (request: Request, response: Response) => {
  try {
    const currentUser = await UserModel.findOne({email: request.body.email})

    if (!currentUser) {
      return response.status(403).json({
        message: 'Incorrect login or password',
      }); 
    }

    const isValid = await bcrypt.compare(request.body.password, currentUser._doc.passwordHash);

    if (!isValid) {
      return response.status(403).json({
        message: 'Incorrect login or password',
      }); 
    }

    const token = jwt.sign(
      { _id: currentUser._id },
      'keySecret521',
      { expiresIn: '30d' },
    );

  const {passwordHash, ...requiredUserData} = currentUser._doc;

  return response.json({...requiredUserData, token});
  } catch (error) {
    console.log('error, auth/login', error);
    response.status(500).json({
      message: 'Failed to authorization',
      error,
    });
  }
};

const userGetMe = async (request: Request, response: Response) => {
  try {
    const currentUser = await UserModel.findById(request.userId);

    if (!currentUser) {
      return response.status(404).json({
        message: 'User is not found'
      })
    }

    const {passwordHash, ...requiredUserData} = currentUser._doc;

    return response.status(200).json(requiredUserData);
  } catch (error) {
    console.log('error, /auth/me', error);
    response.status(500).json({
      message: 'Failed to get data',
      error,
    });
  }
}





export { userRegister, userLogin, userGetMe };