const ErrorCodes = Object.freeze({
  SUCCESS: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  DOCUMENT_NOT_FOUND: 404,
  CONFLICT_WITH_CURRENT_STATE: 409,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,

  REASON: {
    REQUEST_TIME_OUT: "requestTimeOut",
    FILE_CORRUPTED: "fileCorrupted",
  },
});

export const validHttpErrorCodes = [
  400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414,
  415, 416, 417, 500, 501, 502, 503, 504, 505,
];

export default ErrorCodes;
