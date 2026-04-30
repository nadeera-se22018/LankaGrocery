const notFound = (req, res, next) => {
    const error = new Error(`Can not find link - ${req.originalUrl}`);
    res.status(404);
    next(error); 
};

const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;

    if (err.name === 'CastError' && err.kind === 'ObjectId') {
        message = 'Can not find product or resource';
        statusCode = 404;
    }

    res.status(statusCode).json({
        message: message,
        stack: process.env.NODE_ENV === 'production' ? 'pancakes' : err.stack,
    });
};

export { notFound, errorHandler };