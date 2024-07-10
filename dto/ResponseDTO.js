export class ResponseDTO {
    constructor(message, wallet = null) {
      this.message = message;
      this.wallet = wallet;
      Object.freeze(this);
    }
  }