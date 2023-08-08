import { NextFunction, Request, Response } from "express";

import { BaseController } from "../controllers/BaseController";
import { Exception } from "../helpers";
import User from "../models/User";
import config from "config";
import jwt from "jsonwebtoken";

/* global
errorResponse:readonly
newHttpError:readonly
logger:readonly
*/

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["x-auth-token"] as string;
  const TOKEN_KEY: string = config.get("jwtToken");

  if (!token) {
    return res.status(401).json(
      BaseController.errorResponse({
        error: "Unauthorized, please login",
        code: 401,
      })
    );
  }
  try {
    const user: any = jwt.verify(token, TOKEN_KEY);

    const dbUser = await User.findOne({
      email: user.email,
    }).exec();
    if (!dbUser) {
      throw new Exception("No user found with this email", 401, {
        reportError: true,
      });
    }
    (req as any).user = dbUser;
  } catch (err: any) {
    console.error(err);
    return res.status(401).send(
      BaseController.errorResponse({
        code: 401,
        error: err?.message ?? "Unauthorized",
      })
    );
  }
  return next();
};
