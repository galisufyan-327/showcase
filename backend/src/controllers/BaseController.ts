import { ErrorObject, SuccessObject } from "../interfaces/Common";

import { Exception } from "../helpers";
import config from "config";
import { errorCodeIsValid } from "../utilities/helpers";

export class BaseController {
  static successResponse = ({
    data = null,
    message = "Success",
  }: SuccessObject) => {
    return {
      data,
      message,
      success: true,
      code: 200,
    };
  };

  static errorResponse = ({
    data = null,
    error = "Something went Wrong",
    code = 500,
  }: ErrorObject) => {
    const errorMessage =
      config.get("environment") === "development"
        ? error
        : "Something went wrong";
    return {
      data,
      error: errorMessage,
      success: false,
      code: errorCodeIsValid(code),
    };
  };
}
