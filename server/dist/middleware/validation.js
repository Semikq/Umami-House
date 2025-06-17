export const validate = (schema) => (req, res, next) => {
    try {
        if (schema.params)
            req.params = schema.params.parse(req.params);
        if (schema.body)
            req.body = schema.body.parse(req.body);
        if (schema.query)
            req.query = schema.query.parse(req.query);
        next();
    }
    catch (error) {
        res.status(400).json({ message: error });
    }
};
//# sourceMappingURL=validation.js.map