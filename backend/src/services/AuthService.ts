import AuthUtil from "../utilities/AuthUtil";
import { LoginPayload } from "../interfaces/Auth";
import { UserConstants } from "../constants";
import { UserHandler } from "../handlers";
import { bcrypt } from "../helpers";
import config from "config";
import jwt from "jsonwebtoken";

class AuthService {
  static async login(data: LoginPayload) {
    AuthUtil.validateLoginRequest(data);

    const user = await UserHandler.findUserByEmail(data.email);

    AuthUtil.validateUserToAuthenticate(user);

    const passwordMatched = await bcrypt.compare(data.password, user.password);

    if (!passwordMatched) {
      throw new Error(UserConstants.MESSAGES.PASSWORD_DOES_NOT_MATCH);
    }

    const userToObject = user.toObject();
    userToObject.token = jwt.sign(userToObject, config.get("jwtToken"));

    return userToObject;
  }

  static async signup(data: any) {
    AuthUtil.validateSignUpRequest(data);

    const user = await UserHandler.findUserByEmail(data.email);

    AuthUtil.validateUserForSignUp(user);

    data.password = await AuthUtil.createHashedPassword(data.password);

    const userCreated = await UserHandler.createNewUser(data);

    const userToObject: any = userCreated.toObject();
    userToObject.token = jwt.sign(userToObject, config.get("jwtToken"));

    return userToObject;
  }
}

export default AuthService;
