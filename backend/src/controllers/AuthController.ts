import { Request, Response } from "express";

import AuthService from "../services/AuthService";
import { BaseController } from "./BaseController";
import { Exception } from "../interfaces/Exception";
import { errorCodeIsValid } from "../utilities/helpers";

class AuthController {
  static async login(req: Request, res: Response) {
    try {
      const user = await AuthService.login(req.body);

      res.json(BaseController.successResponse({ data: user }));
    } catch (err) {
      const error = err as Exception;

      return res.status(errorCodeIsValid(error.code)).json(
        BaseController.errorResponse({
          error: error.message,
          code: error.code,
        })
      );
    }
  }

  static async signup(req: Request, res: Response) {
    try {
      const user = await AuthService.signup(req.body);

      res.json(BaseController.successResponse({ data: user }));
    } catch (err) {
      const error = err as Exception;
      return res.status(errorCodeIsValid(error.code)).json(
        BaseController.errorResponse({
          error: error.message,
          code: error.code,
        })
      );
    }
  }
}

export default AuthController;
