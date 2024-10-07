import type { Request, Response } from 'express';
import express from 'express';
import router from './routers';
import cors from 'cors';
import { Server } from 'socket.io';
import { errorHandler } from './middlewares/error';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
	cors({
		origin: '*',
	})
);

app.get('/', (req: Request, res: Response) => {
	res.send('Hello World');
});

app.use(router);
app.use(errorHandler);

const server = app.listen(3000, () => {
	console.log('Server is running on port 3000');
});

const io = new Server(server, {
	cors: {
		origin: '*',
	},
});

io.on('connection', (socket) => {
	console.log(socket.id);

	socket.on('chat message', (msg) => {
		io.to('room1').emit('aa');
	});

	socket.on('disconnect', () => {
		console.log('User disconnected');
	});
});
