import { prisma } from '../../prisma/index';
import { UserValidation } from '../validations/auth-validation';
import { RegisterRequest, Response } from '../models/auth-model';
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
			throw new apiError(400, 'Username already exist');
		}

		request.password = await bcrypt.hash(request.password, 10);

		const user = await prisma.user.create({
			data: request,
		});

		return toUserResponse(user);
	}
}
