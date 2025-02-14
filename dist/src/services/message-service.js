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
exports.MessageService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const prisma_1 = require("../../prisma");
const ApiError_1 = require("../middlewares/ApiError");
class MessageService {
}
exports.MessageService = MessageService;
_a = MessageService;
MessageService.saveMessage = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.prisma.message.create({
        data: {
            roomId: payload.roomId,
            senderId: payload.senderId,
            content: payload.content,
            createdAt: payload.dateTime,
        },
    });
});
MessageService.saveRoom = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roomExist = yield prisma_1.prisma.room.findMany({
            where: { id: payload.roomId },
        });
        if (roomExist.length > 0) {
            throw new ApiError_1.apiError(http_status_1.default.BAD_REQUEST, 'room exist');
        }
        console.log(payload);
        return yield prisma_1.prisma.room.create({
            data: {
                id: payload.roomId,
                user1Id: payload.user1Id,
                user2Id: payload.user2Id,
            },
        });
    }
    catch (error) {
        console.log(error);
    }
});
MessageService.getRoom = (request) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.prisma.room.findFirst({
        where: {
            id: request.roomId,
        },
    });
});
MessageService.getAllMessage = (request) => __awaiter(void 0, void 0, void 0, function* () {
    const a = prisma_1.prisma.message.findMany({
        where: {
            roomId: request.roomId,
        },
        orderBy: {
            createdAt: 'asc',
        },
    });
    return a;
});
//# sourceMappingURL=message-service.js.map