export class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public isOperational = true
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(400, message);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string) {
    super(404, message);
  }
}

export class StorageError extends AppError {
  constructor(message: string) {
    super(500, `Storage error: ${message}`);
  }
}

export class SoraAPIError extends AppError {
  constructor(message: string) {
    super(500, `Sora API error: ${message}`);
  }
}

export class FFmpegError extends AppError {
  constructor(message: string) {
    super(500, `FFmpeg error: ${message}`);
  }
}

export const asyncHandler = (fn: Function) => {
  return (req: any, res: any, next: any) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export const errorHandler = (err: Error | AppError, req: any, res: any, next: any) => {
  console.error('Error:', err);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      error: err.name,
      message: err.message,
    });
  }

  return res.status(500).json({
    success: false,
    error: 'InternalServerError',
    message: 'An unexpected error occurred',
  });
};
