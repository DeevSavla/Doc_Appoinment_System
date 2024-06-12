import { ApiError } from "./ApiError.js";

const asyncHandler = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(err => {
        if (err instanceof ApiError) {
            return res.status(err.statusCode).json({
                status: err.statusCode,
                message: err.message,
                success: err.success,
                errors: err.errors,
            });
        }
        next(err); 
    });
};

export {asyncHandler}