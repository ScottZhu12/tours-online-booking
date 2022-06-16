"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTour = exports.updateTour = exports.createTour = exports.getTour = exports.getAllTours = exports.checkBody = exports.checkID = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const filePath = path_1.default.join(__dirname, '..', '..', 'data', 'tours-simple.json');
const tours = JSON.parse(
// toString() ensures a string argument is passed to JSON.parse()
fs_1.default.readFileSync(filePath).toString());
const checkID = (req, res, next, val) => {
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
exports.checkID = checkID;
const checkBody = (req, res, next) => {
    if (!req.body.name || !req.body.price) {
        return res.status(400).json({
            status: 'error',
            message: 'Missing name or price',
        });
    }
    next();
};
exports.checkBody = checkBody;
const getAllTours = (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours,
        },
    });
};
exports.getAllTours = getAllTours;
const getTour = (req, res) => {
    // get the id params from url
    const id = Number(req.params.id);
    // get the specific tour based on the id
    const tour = tours.find((tour) => tour.id === id);
    res.status(200).json({
        status: 'success',
        data: {
            tour,
        },
    });
};
exports.getTour = getTour;
const createTour = (req, res) => {
    // assign an id to the new data
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({ id: newId }, req.body);
    // add the new tour to the existing data
    tours.push(newTour);
    // persist data to the backend server
    fs_1.default.writeFile(filePath, JSON.stringify(tours), (err) => {
        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour,
            },
        });
    });
};
exports.createTour = createTour;
const updateTour = (req, res) => {
    res.status(200).json({
        status: 'success',
        data: {
            tour: '<Updated tour here...>',
        },
    });
};
exports.updateTour = updateTour;
const deleteTour = (req, res) => {
    res.status(204).json({
        status: 'success',
        data: null,
    });
};
exports.deleteTour = deleteTour;
//# sourceMappingURL=tourController.js.map