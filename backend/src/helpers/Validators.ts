class Validators {

  static isValidStr (str: string) {

    if (!str) {

      return false;

    }

    return (str && typeof (str) === 'string' && str.trim() && str !== '');

  }

  static isValidateEmail (email: string) {

    const re = /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/im;

    return re.test(String(email).toLowerCase());

  }


  static validateCode (code: number, defaultCode: number) {

    if (code >= 400 && code < 500) {

      return code;

    }

    return defaultCode;
  
  }
}

export default Validators;
