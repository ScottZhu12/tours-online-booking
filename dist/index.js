"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
dotenv_1.default.config();
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
// connect to database
mongoose_1.default.connect(DB).then((con) => {
    console.log(con.connection);
    console.log('DB connection successful');
});
// create schema for the model
const tourSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, 'A tour must have a name'],
        unique: true,
    },
    rating: {
        type: Number,
        default: 4.5,
    },
    price: {
        type: Number,
        required: [true, 'A tour must have a price'],
    },
});
// create a model
const Tour = mongoose_1.default.model('Tour', tourSchema);
const testTour = new Tour({
    name: 'The Forest Hiker',
    rating: 4.7,
    price: 497,
});
testTour
    .save()
    .then((doc) => {
    console.log(doc);
})
    .catch((err) => {
    console.log('ERROR: ', err);
});
const port = process.env.SERVER_PORT || 8000;
console.log(process.env.SERVER_PORT);
app_1.default.get('/', (req, res) => {
    res.send('hello from the server');
});
app_1.default.listen(port, () => {
    console.log(`App is running on port ${port}`);
});
//# sourceMappingURL=index.js.map