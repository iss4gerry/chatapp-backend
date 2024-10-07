import { http } from 'winston';
import { prisma } from '../../prisma';
import { apiError } from '../middlewares/ApiError';
import { AccRequest, FriendRequest, Response } from '../models/friend-model';
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

	static accept = async (req: AccRequest): Promise<Response> => {
		return await prisma.friend.update({
			where: {
				id: req.id,
			},
			data: {
				status: true,
			},
		});
	};

	static list = async (userId: string): Promise<any> => {
		return await prisma.friend.findMany({
			where: {
				userId: userId,
				status: true,
			},
			include: {
				friend: {
					select: {
						name: true,
						username: true,
						id: true,
					},
				},
			},
		});
	};
}
