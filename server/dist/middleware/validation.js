export const validate = (schema) => (req, res, next) => {
    try {
        if (schema.params)
            req.params = schema.params.parse(req.params);
        if (schema.body)
            req.body = schema.body.parse(req.body);
        next();
    }
    catch (error) {
        res.status(400).json({ message: error });
    }
};
