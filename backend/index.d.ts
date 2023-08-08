import { ObjectId } from "mongoose";

declare namespace Express {
  interface Request {
    user: {
      _id: ObjectId;
      name?: string;
      email: string;
    };
  }
}
