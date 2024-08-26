export class CustomError extends Error {

    private constructor(
        public readonly statusCode: number,
        public readonly message: string,
        public readonly details?: string
    ) {
        super();
    }

    public static badRequest(message: string, details?: string) {
        return new CustomError(400, message, details);
    }

    public static unauthorized(message: string, details?: string) {
        return new CustomError(401, message, details);
    }

    public static forbidden(message: string, details?: string) {
        return new CustomError(403, message, details)
    }

    public static notFound(message: string, details?: string) {
        return new CustomError(404, message, details)
    }

    public static conflict(message: string, details?: string) {
        return new CustomError(409, message, details)
    }

    public static payloadTooLarge(message: string, details?: string) {
        return new CustomError(413, message, details)
    }

    public static internalServerError(message: string, details?: string) {
        return new CustomError(500, message, details)
    }
}