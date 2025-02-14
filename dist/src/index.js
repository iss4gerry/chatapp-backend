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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./routers/index"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const socket_io_1 = require("socket.io");
const error_1 = require("./middlewares/error");
const message_service_1 = require("./services/message-service");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: '*',
}));
app.use(helmet_1.default.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.get('/', (req, res) => {
    res.send('Hello World');
});
app.use(index_1.default);
const server = app.listen(8090, () => {
    console.log('Server is running on port 8080');
});
const io = new socket_io_1.Server(server, {
    cors: {
        origin: '*',
    },
});
io.on('connection', (socket) => {
    const users = {};
    const userId = socket.handshake.query.userId;
    users[userId] = { online: true, lastOnline: null };
    io.emit('userStatusUpdate', users);
    socket.on('disconnect', () => {
        console.log('A user disconnected:', userId);
        users[userId].online = false;
        users[userId].lastOnline = new Date().toISOString();
        io.emit('userStatusUpdate', users);
    });
    socket.on('joinRoom', (roomId) => {
        socket.join(roomId);
        console.log(`User ${socket.id} join to room: ${roomId}`);
        users[userId] = { online: true, lastOnline: null };
        io.emit('userStatusUpdate', users);
    });
    socket.on('sendMessage', (payload) => __awaiter(void 0, void 0, void 0, function* () {
        const { roomId } = payload;
        yield message_service_1.MessageService.saveMessage(payload);
        io.to(roomId).emit('newMessage', payload);
    }));
    socket.on('disconnect', () => {
        console.log(`User disconnect: ${socket.id}`);
    });
});
app.use(error_1.errorHandler);
exports.default = app;
//# sourceMappingURL=index.js.map