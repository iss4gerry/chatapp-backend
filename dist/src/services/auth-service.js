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
exports.AuthService = void 0;
const index_1 = require("../../prisma/index");
const http_status_1 = __importDefault(require("http-status"));
const auth_model_1 = require("../models/auth-model");
const ApiError_1 = require("../middlewares/ApiError");
const bcrypt_1 = __importDefault(require("bcrypt"));
class AuthService {
    static register(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const usernameExist = yield index_1.prisma.user.count({
                where: {
                    email: request.email,
                },
            });
            if (usernameExist) {
                throw new ApiError_1.apiError(http_status_1.default.BAD_REQUEST, 'Username already exist');
            }
            request.password = yield bcrypt_1.default.hash(request.password, 10);
            const user = yield index_1.prisma.user.create({
                data: request,
            });
            return (0, auth_model_1.toUserResponse)(user);
        });
    }
    static login(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = yield index_1.prisma.user.findUnique({
                where: {
                    email: request.email,
                },
            });
            if (!email) {
                throw new ApiError_1.apiError(http_status_1.default.BAD_REQUEST, 'Email or password wrong');
            }
            const isPasswordValid = yield bcrypt_1.default.compare(request.password, email.password);
            if (!isPasswordValid) {
                throw new ApiError_1.apiError(http_status_1.default.BAD_REQUEST, 'Email or password wrong');
            }
            return (0, auth_model_1.toUserResponse)(email);
        });
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth-service.js.map