import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/auth-service.ts";
import { LoginRequest, RegisterRequest } from "../models/auth-model.ts";
import httpStatus from "http-status";
import { generateToken } from "../services/token-service.ts";

export class AuthController {
  static register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const request: RegisterRequest = req.body as RegisterRequest;
      console.log(request + "ASDASDADAS");
      const result = await AuthService.register(request);

      res.status(httpStatus.OK).json({
        status: httpStatus.OK,
        message: "Create user success!",
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
      const token = generateToken(result);
      res.set({
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Authorization, Content-Type",
        "Access-Control-Expose-Headers": "Authorization",
      });

      res.status(httpStatus.OK).json({
        status: httpStatus.OK,
        message: "Login success!",
        data: result,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}
