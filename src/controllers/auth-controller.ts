import { NextFunction, Request, Response } from 'express';
import { AuthService } from '../services/auth-service.ts';
import { RegisterRequest } from '../models/auth-model.ts';

export class AuthController {
	static register = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const request: RegisterRequest = req.body as RegisterRequest;
			const result = await AuthService.register(request);

			res.status(200).json({
				status: 200,
				message: 'Create user success!',
				data: result,
			});
		} catch (error) {
			next(error);
		}
	};
}
