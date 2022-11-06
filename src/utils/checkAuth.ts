import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

interface IDecoded {
  _id: string,
  iat: number,
  exp: number,
}

const checkAuth = (request: Request, response: Response, next: () => void ) => {
  const token = (request.headers.authorization || '').replace(/Bearer\s?/, '');

  if (!token) {
    return response.status(403).json({
      message: 'Invalid token',
    });
  }

  try {
    const decoded = jwt.verify(token, 'keySecret521');

    const { _id } = decoded as IDecoded;
    request.userId = _id;

    next();
  } catch (error) {
    return response.status(403).json({
      message: 'Invalid token',
    });
  }
}

export { checkAuth };