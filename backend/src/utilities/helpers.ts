import { validHttpErrorCodes } from "../constants/ErrorCodes";

export const errorCodeIsValid = (code: number) =>
  validHttpErrorCodes.includes(code) ? code : 500;
