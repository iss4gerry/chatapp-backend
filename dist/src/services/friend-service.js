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
exports.FriendService = void 0;
const prisma_1 = require("../../prisma");
const ApiError_1 = require("../middlewares/ApiError");
const http_status_1 = __importDefault(require("http-status"));
const auth_model_1 = require("../models/auth-model");
class FriendService {
}
exports.FriendService = FriendService;
_a = FriendService;
FriendService.add = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const isFriend = yield prisma_1.prisma.friend.count({
        where: {
            userId: req.userId,
            friendId: req.friendId,
        },
    });
    if (isFriend) {
        throw new ApiError_1.apiError(http_status_1.default.BAD_REQUEST, 'You guys already friend');
    }
    return yield prisma_1.prisma.friend.create({
        data: {
            userId: req.userId,
            friendId: req.friendId,
        },
    });
});
FriendService.accept = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield prisma_1.prisma.friend.update({
        where: {
            id: req.id,
        },
        data: {
            status: true,
        },
    });
    yield prisma_1.prisma.friend.create({
        data: {
            userId: res.friendId,
            friendId: res.userId,
            status: true,
        },
    });
    return res;
});
FriendService.list = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.prisma.friend.findMany({
        where: {
            userId: userId,
            status: true,
        },
        include: {
            friend: {
                select: {
                    name: true,
                    avatar: true,
                    username: true,
                    id: true,
                },
            },
            user: {
                select: {
                    avatar: true,
                    name: true,
                    username: true,
                },
            },
        },
    });
});
FriendService.searchFriend = (username) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield prisma_1.prisma.user.findFirst({
            where: {
                username: username,
            },
        });
        if (!res) {
            return null;
        }
        return (0, auth_model_1.toUserResponse)(res);
    }
    catch (error) {
        return null;
    }
});
FriendService.pendingRequest = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.prisma.friend.findMany({
        where: {
            friendId: userId,
            status: false,
        },
        include: {
            friend: {
                select: {
                    name: true,
                    avatar: true,
                    username: true,
                    id: true,
                },
            },
            user: {
                select: {
                    avatar: true,
                    name: true,
                    username: true,
                },
            },
        },
    });
});
FriendService.userInfo = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield prisma_1.prisma.user.findFirst({
        where: {
            id: userId,
        },
    });
    if (res) {
        return (0, auth_model_1.toUserResponse)(res);
    }
    else {
        throw new ApiError_1.apiError(http_status_1.default.BAD_REQUEST, 'User not found');
    }
});
//# sourceMappingURL=friend-service.js.map