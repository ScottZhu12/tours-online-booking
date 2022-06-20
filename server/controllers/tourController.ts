import fs from 'fs';
import { Request, Response, NextFunction } from 'express';

import Tour from '../models/tourModel';

export const getAllTours = (req: Request, res: Response) => {};

export const getTour = (req: Request, res: Response) => {};

export const createTour = async (req: Request, res: Response) => {
  try {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: 'Invalid data sent',
    });
  }
};

export const updateTour = (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here...>',
    },
  });
};

export const deleteTour = (req: Request, res: Response) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
