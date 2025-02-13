import type { Request, Response } from 'express';
import axios, { AxiosError } from 'axios';
import express from 'express';
import router from './routers';
import cors from 'cors';
import helmet from 'helmet';
import { Server } from 'socket.io';
import { errorHandler } from './middlewares/error';
import { MessagePayload } from './models/message-model';
import { MessageService } from './services/message-service';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
	cors({
		origin: '*',
	})
);

app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));

app.get('/', (req: Request, res: Response) => {
	res.send('Hello World');
});

app.get('/avatar/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const response = await axios.get(`https://api.multiavatar.com/${id}.svg`, {
			headers: {
				'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)', // Simulasi request dari browser
			},
		});
		res.setHeader('Content-Type', 'image/svg+xml');
		res.send(response.data);
	} catch (error) {
		console.error('Error fetching avatar:', error.message);
		res.status(500).json({ error: 'Failed to fetch avatar' });
	}
});

app.use(router);

const server = app.listen(8080, () => {
	console.log('Server is running on port 8080');
});

const io = new Server(server, {
	cors: {
		origin: '*',
	},
});

io.on('connection', (socket) => {
	const users: {
		[key: string]: { online: boolean; lastOnline: string | null };
	} = {};
	const userId = socket.handshake.query.userId as string;

	users[userId] = { online: true, lastOnline: null };
	io.emit('userStatusUpdate', users);

	socket.on('disconnect', () => {
		console.log('A user disconnected:', userId);

		users[userId].online = false;
		users[userId].lastOnline = new Date().toISOString();
		io.emit('userStatusUpdate', users);
	});
	socket.on('joinRoom', (roomId: string) => {
		socket.join(roomId);
		console.log(`User ${socket.id} join to room: ${roomId}`);
		users[userId] = { online: true, lastOnline: null };
		io.emit('userStatusUpdate', users);
	});

	socket.on('sendMessage', async (payload: MessagePayload) => {
		const { roomId } = payload;
		await MessageService.saveMessage(payload);

		io.to(roomId).emit('newMessage', payload);
	});

	socket.on('disconnect', () => {
		console.log(`User disconnect: ${socket.id}`);
	});
});

app.use(errorHandler);
