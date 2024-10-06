import { http } from 'winston';
import { prisma } from '../../prisma';
import { apiError } from '../middlewares/ApiError';
import { FriendRequest, Response } from '../models/friend-model';
import httpStatus from 'http-status';

export class FriendService {
	static add = async (req: FriendRequest): Promise<Response> => {
		const isFriend = await prisma.friend.count({
			where: {
				userId: req.userId,
				friendId: req.friendId,
			},
		});

		if (isFriend) {
			throw new apiError(httpStatus.BAD_REQUEST, 'You guys already friend');
		}

		return await prisma.friend.create({
			data: {
				userId: req.userId,
				friendId: req.friendId,
			},
		});
	};
}
