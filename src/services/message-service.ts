import httpStatus from 'http-status';
import { prisma } from '../../prisma';
import { apiError } from '../middlewares/ApiError';
import {
	GetRoom,
	MessagePayload,
	RoomPayload,
	RoomResponse,
} from '../models/message-model';

export class MessageService {
	static saveMessage = async (payload: MessagePayload): Promise<any> => {
		return await prisma.message.create({
			data: {
				roomId: payload.roomId,
				senderId: payload.senderId,
				content: payload.content,
			},
		});
	};

	static saveRoom = async (
		payload: RoomPayload
	): Promise<RoomResponse | undefined> => {
		try {
			const roomExist = await prisma.room.findMany({
				where: { id: payload.roomId },
			});

			if (roomExist.length > 0) {
				throw new apiError(httpStatus.BAD_REQUEST, 'room exist');
			}

			console.log(payload);
			return await prisma.room.create({
				data: {
					id: payload.roomId,
					user1Id: payload.user1Id,
					user2Id: payload.user2Id,
				},
			});
		} catch (error) {
			console.log(error);
		}
	};

	static getRoom = async (request: GetRoom) => {
		return await prisma.room.findFirst({
			where: {
				id: request.roomId,
			},
		});
	};
}
