// Middleware function to handle 404 Not Found errors
const notFound = (req, res, next) => {
    // Create a new error with a custom message that includes the original URL of the request
    const error = new Error(`Not Found - ${req.originalUrl}`);
    // Set the HTTP response status code to 404 (Not Found)
    res.status(404);
    // Pass the error to the next middleware function in the stack
    next(error);
};

// Middleware function to handle other errors
const errorHandler = (err, req, res, next) => {
    // Set the HTTP status code to 500 (Internal Server Error) if it's 200 (OK)
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    // Retrieve the error message from the error object
    let message = err.message;

    // If the error is a CastError (usually occurs when an invalid ObjectId is used in MongoDB)
    // and the kind of the error is 'ObjectId', change the status code to 404 (Not Found)
    // and set the message to 'Resource not found'
    if (err.name === 'CastError' && err.kind === 'ObjectId') {
        statusCode = 404;
        message = 'Resource not found';
    }

    // Send the HTTP response with the error status code and a JSON object
    // The JSON object contains the error message and, if not in production, the stack trace of the error
    res.status(statusCode).json({
        message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};

// Export the middleware functions for use in other parts of the application
module.exports = { notFound, errorHandler };
