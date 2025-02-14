"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const configs_1 = __importDefault(require("../configs"));
const secretKey = configs_1.default.jwt.secret;
const generateToken = (user) => {
    const payload = {
        id: user.id,
        name: user.name,
        username: user.username
    };
    return jsonwebtoken_1.default.sign(payload, secretKey, { expiresIn: '2h' });
};
exports.generateToken = generateToken;
//# sourceMappingURL=token-service.js.map