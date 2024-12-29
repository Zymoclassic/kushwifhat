
// non-existing routes
export const notFound = (req, res, next) => {
    res.status(404).json({ message: `Not found - ${req.originalUrl}` });
}

export const errorHandler = (error, req, res, next) => {
    if(res.headerSent) {
        return next(error)
    }
    res.status(error.code || 500).json({message:error.message || "An error occured"})
}