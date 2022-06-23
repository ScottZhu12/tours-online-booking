import fs from 'fs';
import path from 'path';
import { connect } from 'mongoose';
import dotenv from 'dotenv';

import Tour from './models/tourModel';

dotenv.config();

const run = async () => {
  // connect to mongodb
  const DB = `mongodb+srv://scottzhu:930831@cluster0.5vd9t.mongodb.net/tour-online-booking?retryWrites=true&w=majority`;
  await connect(DB);
};

run().catch((err) => {
  console.log(err);
});

const filePath = path.join(`${__dirname}`, 'tours-simple.json');

// read json file
const tours = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

// import data into database
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('data successfully loaded');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

// delete all data from database
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('data successfully deleted');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
