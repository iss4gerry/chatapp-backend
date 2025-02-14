"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_js_1 = require("../controllers/auth-controller.js");
const router = express_1.default.Router();
router.route('/register').post(auth_controller_js_1.AuthController.register);
router.route('/login').post(auth_controller_js_1.AuthController.login);
exports.default = router;
//# sourceMappingURL=auth-route.js.map