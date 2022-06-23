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
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const mongoose_1 = require("mongoose");
const dotenv_1 = __importDefault(require("dotenv"));
const tourModel_1 = __importDefault(require("./models/tourModel"));
dotenv_1.default.config();
const run = () => __awaiter(void 0, void 0, void 0, function* () {
    // connect to mongodb
    const DB = `mongodb+srv://scottzhu:930831@cluster0.5vd9t.mongodb.net/tour-online-booking?retryWrites=true&w=majority`;
    yield (0, mongoose_1.connect)(DB);
});
run().catch((err) => {
    console.log(err);
});
const filePath = path_1.default.join(`${__dirname}`, 'tours-simple.json');
// read json file
const tours = JSON.parse(fs_1.default.readFileSync(filePath, 'utf-8'));
// import data into database
const importData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield tourModel_1.default.create(tours);
        console.log('data successfully loaded');
        process.exit();
    }
    catch (err) {
        console.log(err);
    }
});
// delete all data from database
const deleteData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield tourModel_1.default.deleteMany();
        console.log('data successfully deleted');
        process.exit();
    }
    catch (err) {
        console.log(err);
    }
});
if (process.argv[2] === '--import') {
    importData();
}
else if (process.argv[2] === '--delete') {
    deleteData();
}
//# sourceMappingURL=import-dev-data.js.map