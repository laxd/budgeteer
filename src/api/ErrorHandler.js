class ErrorHandler {

    notFoundErrorHandler(req, res, next) {
        const error = new Error(`Method ${req.method} not registered at ${req.path}`);
        error.status = 404;
        next(error);
    }

    catchAllErrorHandler(error, req, res, next) {
        console.log(error);
        res.status(error.status || 500)
            .send({
                error: error.message
            });
    };
}

module.exports = new ErrorHandler();