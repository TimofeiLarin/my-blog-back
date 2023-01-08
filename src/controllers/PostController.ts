import { Request, Response } from "express";

import PublicationModel from '../models/Publication';

const createPublication = async (request: Request, response: Response) => {
  try {
    const doc = new PublicationModel({
      title: request.body.title,
      text: request.body.text,
      tags: request.body.tags,
      imageUrl: request.body.imageUrl,
      user: request.userId,
    });

    const publication = await doc.save();

    return response.status(200).json(publication);
  } catch (error) {
    console.log('createPublication', error);
    response.status(500).json({
      message: 'Failed create publication',
      error,
    });
  }
};

const getAllPublications = async (request: Request, response: Response) => {
  try {
    const publications = await PublicationModel.find().populate('user').exec();

    return response.status(200).json(publications);
  } catch (error) {
    console.log('getAllPublications', error);
    response.status(500).json({
      message: 'Failed get all publications',
      error,
    });
  }
};

const getOnePublication = async (request: Request, response: Response) => {
  try {
    const publicationId = request.params.id;

    PublicationModel.findByIdAndUpdate(
      {
        _id: publicationId,
      },
      {
        $inc: { viewsCount: 1 },
      },
      {
        returnDocument: 'after',
      },
      (error, doc) => {
        if (error) {
          console.log('getOnePublication', error);

          return response.status(500).json({
            message: 'Failed get a publication',
            error,
          });
        }

        if (!doc) {
          return response.status(404).json({
            message: 'Publication not found',
          });
        }

        return response.status(200).json(doc);
      }
    );
  } catch (error) {
    console.log('getOnePublication', error);
    response.status(500).json({
      message: 'Failed get a publication',
      error,
    });
  }
};

const removePublication = async (request: Request, response: Response) => {
  try {
    const publicationId = request.params.id;

    await PublicationModel.findByIdAndDelete(
      {
        _id: publicationId,
      },
      {},
      (error, doc) => {
        if (error) {
          console.log('getOnePublication', error);

          return response.status(500).json({
            message: 'Failed remove a publication',
            error,
          });
        }

        if (!doc) {
          return response.status(404).json({
            message: 'Publication not found',
          });
        }

        return response.status(200).json({
          success: true,
        });
      }
    );
  } catch (error) {
    console.log('removePublication', error);
    response.status(500).json({
      message: 'Failed remove a publication',
      error,
    });
  }
};

const updatePublication = async (request: Request, response: Response) => {
  try {
    const publicationId = request.params.id;

    await PublicationModel.updateOne(
      {
        _id: publicationId,
      },
      {
        title: request.body.title,
        text: request.body.text,
        tags: request.body.tags,
        imageUrl: request.body.imageUrl,
        user: request.userId,
      },
    );

    return response.status(200).json({
      success: true,
    });
  } catch (error) {
    console.log('updatePublication', error);
    response.status(500).json({
      message: 'Failed update a publication',
      error,
    });
  }
};

const getLastFiveTags = async (request: Request, response: Response) => {
  try {
    const publications = await PublicationModel.find().limit(5).exec();

    const tags = publications
      .map(publication => publication.tags)
      .flat()
      .filter((tag, index, tags) => tags.indexOf(tag) === index)
      .slice(0, 5);

    return response.status(200).json(tags);
  } catch (error) {
    console.log('getAllPublications', error);
    response.status(500).json({
      message: 'Failed get all publications',
      error,
    });
  }
};

export {
  createPublication,
  getAllPublications,
  getOnePublication,
  removePublication,
  updatePublication,
  getLastFiveTags,
};