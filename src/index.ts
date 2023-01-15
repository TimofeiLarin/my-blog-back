import express from 'express';
import { connect } from 'mongoose';
import multer from 'multer';
import cors from 'cors';

import { userGetMe, userLogin, userRegister } from './controllers/UserController';
import {
  createPublication,
  getAllPublications,
  getOnePublication,
  removePublication,
  updatePublication,
  getLastFiveTags,
} from './controllers/PostController';

import { authValidation, loginValidation } from './validations/auth';
import { createPublicationValidation } from './validations/publication';

import { checkAuth } from './utils/checkAuth';
import { validationErrors } from './utils/validationErrors';

import { ROUTES } from './constants/routes';
import { MESSAGE } from './constants/message';

const PORT = process.env.PORT || 4444;

const URL = process.env.MONGODB_URI || '';

const app = express();

const connectDB = async () => {
 try {
  await connect(URL);
  console.log(MESSAGE.OK.MONGO);

 } catch (error) {
  console.log(MESSAGE.ERROR.MONGO, error);
 }
};

connectDB();

app.use(express.json());
app.use(cors());


const storage = multer.diskStorage({
  destination: (_, __, callback) => {
    callback(null, 'uploads')
  },
  filename: (_, file, callback) => {
    callback(null, file.originalname)
  }
});

const upload = multer({ storage });


app.use(ROUTES.UPLOADS, express.static('uploads'));

app.post(ROUTES.UPLOAD, checkAuth, upload.single('image'), (request, response) => {
  response.json({
    url: `/uploads/${request.file?.originalname}`,
  });
});

app.post(ROUTES.LOGIN, loginValidation, validationErrors, userLogin);

app.post(ROUTES.REGISTER, authValidation, validationErrors, userRegister);

app.get(ROUTES.GET_AUTH_ME, checkAuth, userGetMe);

app.get(ROUTES.PUBLICATIONS, getAllPublications);

app.get(ROUTES.PUBLICATION, getOnePublication);

app.get(ROUTES.TAGS, getLastFiveTags);

app.post(
  ROUTES.PUBLICATIONS,
  checkAuth,
  createPublicationValidation,
  validationErrors,
  createPublication,
);

app.delete(ROUTES.PUBLICATION, checkAuth, removePublication);

app.patch(
  ROUTES.PUBLICATION,
  checkAuth,
  createPublicationValidation,
  validationErrors,
  updatePublication,
);

app.listen(PORT, () => {
  try {
    console.log(MESSAGE.OK.SERVER);
  } catch (error) {
    console.log(MESSAGE.ERROR.SERVER, error);
  }
});
