import { LoginPayload, User } from "../interfaces/Auth";
import { Validators, bcrypt } from "../helpers";

import { UserConstants } from "../constants";

class AuthUtil {
  static validateUserForSignUp(user: User) {
    if (user) {
      throw new Error(UserConstants.MESSAGES.USER_ALREADY_EXIST);
    }
  }

  static async createHashedPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }

  static validateSignUpRequest(data: User) {
    if (!data?.email) {
      throw new Error(UserConstants.MESSAGES.INVALID_DATA_TO_SIGNUP_USER);
    }

    if (data.email && !Validators.isValidateEmail(data.email)) {
      throw new Error(UserConstants.MESSAGES.INVALID_EMAIL);
    }

    if (!Validators.isValidStr(data.password)) {
      throw new Error(UserConstants.MESSAGES.INVALID_PASSWORD);
    }
  }

  static validateLoginRequest(data: LoginPayload) {
    if (!data?.email) {
      throw new Error(UserConstants.MESSAGES.INVALID_DATA_TO_LOGIN);
    }

    if (data.email && !Validators.isValidateEmail(data.email)) {
      throw new Error(UserConstants.MESSAGES.INVALID_EMAIL);
    }

    if (!Validators.isValidStr(data.password)) {
      throw new Error(UserConstants.MESSAGES.INVALID_DATA_TO_LOGIN);
    }
  }

  static validateUserToAuthenticate(user: User) {
    if (!user) {
      throw new Error("User not found");
    }
  }
}

export default AuthUtil;
