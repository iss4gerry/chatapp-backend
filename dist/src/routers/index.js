"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = __importDefault(require("./auth-route"));
const friend_route_1 = __importDefault(require("./friend-route"));
const message_route_1 = __importDefault(require("./message-route"));
const router = (0, express_1.default)();
const defaultRoute = [
    {
        path: '/auth',
        route: auth_route_1.default,
    },
    {
        path: '/friend',
        route: friend_route_1.default,
    },
    {
        path: '/message',
        route: message_route_1.default,
    },
];
defaultRoute.forEach((route) => {
    router.use(route.path, route.route);
});
exports.default = router;
//# sourceMappingURL=index.js.map