"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
dotenv_1.default.config();
// create a schema corresponding to the document interface
const tourSchema = new mongoose_1.Schema({
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
const Tour = (0, mongoose_1.model)('Tour', tourSchema);
const run = () => __awaiter(void 0, void 0, void 0, function* () {
    // connect to mongodb
    const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
    yield (0, mongoose_1.connect)(DB);
    const testTour = new Tour({
        name: 'The Forest Hiker',
        rating: 4.7,
        price: 497,
    });
    yield testTour.save();
});
run().catch((err) => console.log(err));
const port = process.env.SERVER_PORT || 8000;
app_1.default.get('/', (req, res) => {
    res.send('hello from the server');
});
app_1.default.listen(port, () => {
    console.log(`App is running on port ${port}`);
});
//# sourceMappingURL=index.js.map