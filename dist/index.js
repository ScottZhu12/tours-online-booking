"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
dotenv_1.default.config();
const port = process.env.SERVER_PORT || 8000;
console.log(process.env.SERVER_PORT);
app_1.default.get('/', (req, res) => {
    res.send('hello from the server');
});
app_1.default.listen(port, () => {
    console.log(`App is running on port ${port}`);
});
//# sourceMappingURL=index.js.map