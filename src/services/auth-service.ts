import { prisma } from '../../prisma/index';
import httpStatus from 'http-status';
import { LoginRequest, RegisterRequest, Response } from '../models/auth-model';
import { toUserResponse } from '../models/auth-model';
import { apiError } from '../middlewares/ApiError';
import bcrypt from 'bcrypt';

export class AuthService {
	static async register(request: RegisterRequest): Promise<Response> {
		const usernameExist = await prisma.user.count({
			where: {
				email: request.email,
			},
		});

		if (usernameExist) {
			throw new apiError(httpStatus.BAD_REQUEST, 'Username already exist');
		}

		request.password = await bcrypt.hash(request.password, 10);

		const user = await prisma.user.create({
			data: request,
		});

		return toUserResponse(user);
	}

	static async login(request: LoginRequest): Promise<Response> {
		const email = await prisma.user.findUnique({
			where: {
				email: request.email,
			},
		});

		if (!email) {
			throw new apiError(httpStatus.BAD_REQUEST, 'Email or password wrong');
		}

		const isPasswordValid = await bcrypt.compare(
			request.password,
			email.password
		);

		if (!isPasswordValid) {
			throw new apiError(httpStatus.BAD_REQUEST, 'Email or password wrong');
		}

		return toUserResponse(email);
	}
}
