"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const http_status_1 = __importDefault(require("http-status"));
class ErrorApi extends Error {
    constructor(message, code) {
        super(message);
        this.status = code;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
const errorHandler = (err, req, res, next) => {
    const statusCode = err.status || http_status_1.default.INTERNAL_SERVER_ERROR;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        status: statusCode,
        message: message,
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=error.js.map