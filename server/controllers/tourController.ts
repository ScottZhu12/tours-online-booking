import fs from 'fs';
import { Request, Response, NextFunction } from 'express';
import path from 'path';

interface TourProps {
  id: number;
}

const filePath = path.join(__dirname, '..', '..', 'data', 'tours-simple.json');

const tours = JSON.parse(
  // toString() ensures a string argument is passed to JSON.parse()
  fs.readFileSync(filePath).toString()
);

export const checkID = (
  req: Request,
  res: Response,
  next: NextFunction,
  val: string
) => {
  const id = Number(req.params.id);
  console.log(val);

  if (id > tours.length) {
    return res.status(404).json({
      status: 'error',
      message: 'No tour found',
    });
  }

  next();
};

export const checkBody = (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'error',
      message: 'Missing name or price',
    });
  }

  next();
};

export const getAllTours = (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
};

export const getTour = (req: Request, res: Response) => {
  // get the id params from url
  const id = Number(req.params.id);
  // get the specific tour based on the id
  const tour = tours.find((tour: TourProps) => tour.id === id);

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

export const createTour = (req: Request, res: Response) => {
  // assign an id to the new data
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  // add the new tour to the existing data
  tours.push(newTour);

  // persist data to the backend server
  fs.writeFile(filePath, JSON.stringify(tours), (err) => {
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  });
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
