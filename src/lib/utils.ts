export class InvalidSession extends Error {
  status = 401;

  constructor(public message = "Unauthorized") {
    super(message);
  }
}
