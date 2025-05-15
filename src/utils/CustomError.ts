export class CustomError extends Error {
  public status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = 'CustomError';
    this.status = status;
  }
}
