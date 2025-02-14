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
exports.FriendController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const friend_service_1 = require("../services/friend-service");
class FriendController {
}
exports.FriendController = FriendController;
_a = FriendController;
FriendController.add = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const request = req.body;
        const result = yield friend_service_1.FriendService.add(request);
        res.status(http_status_1.default.OK).json({
            status: http_status_1.default.OK,
            message: 'Add friend success!',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
FriendController.accept = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const request = req.body;
        const result = yield friend_service_1.FriendService.accept(request);
        res.status(http_status_1.default.OK).json({
            status: http_status_1.default.OK,
            message: 'Accept friend success!',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
FriendController.list = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const request = req.params.userId;
        const result = yield friend_service_1.FriendService.list(request);
        res.status(http_status_1.default.OK).json({
            status: http_status_1.default.OK,
            message: 'Get all friend success!',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
FriendController.searchFriend = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const request = req.params.userId;
        const result = yield friend_service_1.FriendService.searchFriend(request);
        res.status(http_status_1.default.OK).json({
            status: http_status_1.default.OK,
            message: 'Search friend success!',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
FriendController.pendingRequest = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const request = req.params.userId;
        const result = yield friend_service_1.FriendService.pendingRequest(request);
        res.status(http_status_1.default.OK).json({
            status: http_status_1.default.OK,
            message: 'Get pending request success!',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
FriendController.userInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const request = req.params.userId;
        const result = yield friend_service_1.FriendService.userInfo(request);
        res.status(http_status_1.default.OK).json({
            status: http_status_1.default.OK,
            message: 'Get user info success!',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
//# sourceMappingURL=friend-controller.js.map