import User from "../models/User";
import { User as UserType } from "../interfaces/Auth";

class UserHandler {
  static findUserByEmail(email: string): Promise<any> {
    return User.findOne({ email }).exec();
  }

  static createNewUser(data: UserType) {
    const user = new User({
      ...data,
    });

    return user.save();
  }
}

export default UserHandler;
