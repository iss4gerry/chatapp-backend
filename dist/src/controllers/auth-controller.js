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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("../services/auth-service");
const http_status_1 = __importDefault(require("http-status"));
const token_service_1 = require("../services/token-service");
class AuthController {
}
exports.AuthController = AuthController;
_a = AuthController;
AuthController.register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const request = req.body;
        const result = yield auth_service_1.AuthService.register(request);
        res.status(http_status_1.default.OK).json({
            status: http_status_1.default.OK,
            message: 'Create user success!',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
AuthController.login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const request = req.body;
        const result = yield auth_service_1.AuthService.login(request);
        const token = (0, token_service_1.generateToken)(result);
        res.set({
            Authorization: `Bearer ${token}`,
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Authorization, Content-Type',
            'Access-Control-Expose-Headers': 'Authorization',
        });
        res.status(http_status_1.default.OK).json({
            status: http_status_1.default.OK,
            message: 'Login success!',
            data: result,
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
//# sourceMappingURL=auth-controller.js.map