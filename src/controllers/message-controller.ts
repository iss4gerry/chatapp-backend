import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { MessageService } from '../services/message-service';
import { GetRoom, RoomPayload } from '../models/message-model';

export class MessageContoller {
	static addRoom = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const request: RoomPayload = req.body as unknown as RoomPayload;
			const result = await MessageService.saveRoom(request);

			res.status(httpStatus.OK).json({
				status: httpStatus.OK,
				message: 'Add room success!',
				data: result,
			});
		} catch (error) {
			next(error);
		}
	};

	static getRoom = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const request: GetRoom = req.params as GetRoom;
			const result = await MessageService.getRoom(request);

			res.status(httpStatus.OK).json({
				status: httpStatus.OK,
				message: 'Get room success!',
				data: result,
			});
		} catch (error) {
			next(error);
		}
	};
}
