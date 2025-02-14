"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const message_controller_1 = require("../controllers/message-controller");
const router = express_1.default.Router();
router.route('/room/add').post(message_controller_1.MessageContoller.addRoom);
router.route('/room/:roomId').get(message_controller_1.MessageContoller.getRoom);
router.route('/:roomId').get(message_controller_1.MessageContoller.getAllMessage);
exports.default = router;
//# sourceMappingURL=message-route.js.map