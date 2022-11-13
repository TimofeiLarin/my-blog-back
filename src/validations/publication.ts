import { body } from 'express-validator';

const createPublicationValidation = [
  body('title', 'Enter the post title').isLength({min: 3}).isString(),
  body('text', 'Enter the post text').isLength({min: 3}).isString(),
  body('tags', 'Invalid tags format').optional().isArray(),
  body('imageUrl', 'Invalid Url format').optional().isURL(),
];

export { createPublicationValidation };