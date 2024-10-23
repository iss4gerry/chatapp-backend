import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { apiError } from './ApiError';
import httpStatus from 'http-status';

class ErrorApi extends Error {
	status: number;

	constructor(message: string, code: number) {
		super(message);
		this.status = code;
		this.name = this.constructor.name;
		Error.captureStackTrace(this, this.constructor);
	}
}

export const errorHandler = (
	err: ErrorApi,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const statusCode = err.status || httpStatus.INTERNAL_SERVER_ERROR;
	const message = err.message || 'Internal Server Error';
	res.status(statusCode).json({
		status: statusCode,
		message: message,
	});
};
