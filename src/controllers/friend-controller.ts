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

	static list = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const request = req.params.userId;
			const result = await FriendService.list(request);

			res.status(httpStatus.OK).json({
				status: httpStatus.OK,
				message: 'Get all friend success!',
				data: result,
			});
		} catch (error) {
			next(error);
		}
	};

	static searchFriend = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const request = req.params.userId;
			const result = await FriendService.searchFriend(request);

			res.status(httpStatus.OK).json({
				status: httpStatus.OK,
				message: 'Search friend success!',
				data: result,
			});
		} catch (error) {
			next(error);
		}
	};

	static pendingRequest = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const request = req.params.userId;
			const result = await FriendService.pendingRequest(request);

			res.status(httpStatus.OK).json({
				status: httpStatus.OK,
				message: 'Get pending request success!',
				data: result,
			});
		} catch (error) {
			next(error);
		}
	};

	static userInfo = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const request = req.params.userId;
			const result = await FriendService.userInfo(request);

			res.status(httpStatus.OK).json({
				status: httpStatus.OK,
				message: 'Get user info success!',
				data: result,
			});
		} catch (error) {
			next(error);
		}
	};
}
