export class InvalidSession extends Error {
  status = 401;

  constructor(public message = "Unauthorized") {
    super(message);
  }
}

export class BadCredentials extends Error {
  status = 401;

  constructor(public message = "Bad credentials") {
    super(message);
  }
}
