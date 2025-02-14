"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const friend_controller_js_1 = require("../controllers/friend-controller.js");
const router = express_1.default.Router();
router.route('/add').post(friend_controller_js_1.FriendController.add);
router.route('/accept').patch(friend_controller_js_1.FriendController.accept);
router.route('/list/:userId').get(friend_controller_js_1.FriendController.list);
router.route('/search/:userId').get(friend_controller_js_1.FriendController.searchFriend);
router.route('/pending/:userId').get(friend_controller_js_1.FriendController.pendingRequest);
router.route('/:userId').get(friend_controller_js_1.FriendController.userInfo);
exports.default = router;
//# sourceMappingURL=friend-route.js.map