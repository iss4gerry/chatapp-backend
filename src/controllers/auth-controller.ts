import { NextFunction, Request, Response } from 'express';
import { AuthService } from '../services/auth-service.ts';
import { LoginRequest, RegisterRequest } from '../models/auth-model.ts';
import httpStatus from 'http-status';

export class AuthController {
	static register = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const request: RegisterRequest = req.body as RegisterRequest;
			const result = await AuthService.register(request);

			res.status(httpStatus.OK).json({
				status: httpStatus.OK,
				message: 'Create user success!',
				data: result,
			});
		} catch (error) {
			next(error);
		}
	};

	static login = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const request: LoginRequest = req.body as LoginRequest;
			const result = await AuthService.login(request);

			res.status(httpStatus.OK).json({
				status: httpStatus.OK,
				message: 'Login success!',
				data: result,
			});
		} catch (error) {
			next(error);
		}
	};
}
