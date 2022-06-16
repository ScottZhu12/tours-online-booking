"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const tourRouter_1 = __importDefault(require("./routes/tourRouter"));
const userRouter_1 = __importDefault(require("./routes/userRouter"));
const app = (0, express_1.default)();
// create a middleware for handling response and request
if (process.env.NODE_ENV === 'development') {
    app.use((0, morgan_1.default)('dev'));
}
app.use(express_1.default.json());
app.use('/api/v1/tours', tourRouter_1.default);
app.use('/api/v1/users', userRouter_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map