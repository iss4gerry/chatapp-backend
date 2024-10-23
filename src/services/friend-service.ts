import { http } from 'winston';
import { prisma } from '../../prisma';
import { apiError } from '../middlewares/ApiError';
import {
	AccRequest,
	FriendRequest,
	Response,
	SearchFriend,
} from '../models/friend-model';
import httpStatus from 'http-status';
import { toUserResponse, Response as UserInfo } from '../models/auth-model';

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
		const res = await prisma.friend.update({
			where: {
				id: req.id,
			},
			data: {
				status: true,
			},
		});

		await prisma.friend.create({
			data: {
				userId: res.friendId,
				friendId: res.userId,
				status: true,
			},
		});

		return res;
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
						avatar: true,
						username: true,
						id: true,
					},
				},
				user: {
					select: {
						avatar: true,
						name: true,
						username: true,
					},
				},
			},
		});
	};

	static searchFriend = async (
		username: string
	): Promise<SearchFriend | null | undefined> => {
		try {
			const res = await prisma.user.findFirst({
				where: {
					username: username,
				},
			});
			if (!res) {
				return null;
			}
			return toUserResponse(res!);
		} catch (error) {
			return null;
		}
	};

	static pendingRequest = async (userId: string): Promise<any> => {
		return await prisma.friend.findMany({
			where: {
				friendId: userId,
				status: false,
			},
			include: {
				friend: {
					select: {
						name: true,
						avatar: true,
						username: true,
						id: true,
					},
				},
				user: {
					select: {
						avatar: true,
						name: true,
						username: true,
					},
				},
			},
		});
	};

	static userInfo = async (userId: string): Promise<UserInfo> => {
		const res = await prisma.user.findFirst({
			where: {
				id: userId,
			},
		});

		if (res) {
			return toUserResponse(res);
		} else {
			throw new apiError(httpStatus.BAD_REQUEST, 'User not found');
		}
	};
}
