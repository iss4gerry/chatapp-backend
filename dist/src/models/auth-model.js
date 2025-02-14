"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toUserResponse = toUserResponse;
function toUserResponse(user) {
    return {
        id: user.id,
        avatar: user.avatar,
        name: user.name,
        username: user.username,
        email: user.email,
    };
}
//# sourceMappingURL=auth-model.js.map