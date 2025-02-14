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
exports.MessageContoller = void 0;
const http_status_1 = __importDefault(require("http-status"));
const message_service_1 = require("../services/message-service");
class MessageContoller {
}
exports.MessageContoller = MessageContoller;
_a = MessageContoller;
MessageContoller.addRoom = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const request = req.body;
        const result = yield message_service_1.MessageService.saveRoom(request);
        res.status(http_status_1.default.OK).json({
            status: http_status_1.default.OK,
            message: 'Add room success!',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
MessageContoller.getRoom = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const request = req.params;
        const result = yield message_service_1.MessageService.getRoom(request);
        res.status(http_status_1.default.OK).json({
            status: http_status_1.default.OK,
            message: 'Get room success!',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
MessageContoller.getAllMessage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const request = req.params;
        const result = yield message_service_1.MessageService.getAllMessage(request);
        res.status(http_status_1.default.OK).json({
            status: http_status_1.default.OK,
            message: 'Get message success!',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
//# sourceMappingURL=message-controller.js.map