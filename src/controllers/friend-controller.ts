import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { AccRequest, FriendRequest } from '../models/friend-model';
import { FriendService } from '../services/friend-service';

export class FriendController {
	static add = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const request: FriendRequest = req.body as FriendRequest;
			const result = await FriendService.add(request);

			res.status(httpStatus.OK).json({
				status: httpStatus.OK,
				message: 'Add friend success!',
				data: result,
			});
		} catch (error) {
			next(error);
		}
	};

	static accept = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const request: AccRequest = req.body as AccRequest;
			const result = await FriendService.accept(request);

			res.status(httpStatus.OK).json({
				status: httpStatus.OK,
				message: 'Accept friend success!',
				data: result,
			});
		} catch (error) {
			next(error);
		}
	};
}
