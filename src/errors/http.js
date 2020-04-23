class HttpError extends Error {
  constructor(param, message) {
    super(message);
    this.param = param;
  }
}

module.exports = HttpError;
