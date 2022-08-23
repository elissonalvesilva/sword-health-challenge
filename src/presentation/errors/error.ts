export class AccessDeniedError extends Error {
  constructor() {
    super('Access denied');
    this.name = 'AccessDeniedError';
  }
}

export class BadRequestError extends Error {
  constructor(message?: any) {
    super(JSON.stringify(message));
    this.name = 'BadRequestError';
  }
}


export class InvalidParamError extends Error {
  constructor(paramName: string) {
    super(`Invalid param ${paramName}`);
    this.name = 'InvalidParamError';
  }
}

export class CantCreateTaskError extends Error {
  constructor() {
    super('Task cant be create');
    this.name = 'CantCreateTaskError';
  }
}

export class CantUpdateTaskError extends Error {
  constructor() {
    super('Task cant be update');
    this.name = 'CantUpdateTaskError';
  }
}

export class InvalidResumeMaxLengthError extends Error {
  constructor(length: number) {
    super(`Invalid resume length length must be less than 2500, actual length: ${length}`);
    this.name = 'InvalidResumeMaxLengthError';
  }
}

export class InvalidResumeMinLengthError extends Error {
  constructor() {
    super('Invalid resume length length must be greater than 0');
    this.name = 'InvalidResumeMinLengthError';
  }
}

export class MissingParamError extends Error {
  constructor(paramName: string) {
    super(`Missing param ${paramName}`);
    this.name = 'MissingParamError';
  }
}

export class NotFoundParamError extends Error {
  constructor(paramName: string) {
    super(`Not found param ${paramName}`);
    this.name = 'NotFoundParamError';
  }
}

export class ServerError extends Error {
  constructor(stack?: string) {
    super('Internal Server error');
    this.name = 'ServerError';
    this.stack = stack;
  }
}

export class UnauthorizedError extends Error {
  constructor() {
    super('Unauthorized');
    this.name = 'UnauthorizedError';
  }
}
