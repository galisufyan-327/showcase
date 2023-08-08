import { Meta } from "../interfaces/Exception";

class Exception extends Error {
  code: number;
  meta: Meta;

  constructor(message: string, code: number = 500, meta: Meta = {}) {

    super(message);
    this.code = code;
    this.meta = meta;

  }


  toJson() {

    const json = JSON.parse(JSON.stringify(this.meta || {}));

    json.code = this.code;
    json.message = this.message;

    return json;

  }

}

export default Exception;
