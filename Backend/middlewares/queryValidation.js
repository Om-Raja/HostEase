const Joi = require("joi");

const queryValidation = (req, res, next) => {
    const querySchema = Joi.object({
        question: Joi.string()
            .min(10)
            .required()
            .messages({
                "string.min": "Question must be at least 10 characters long.",
                "any.required": "Question is required.",
            }),
    });

    const { error } = querySchema.validate(req.body);
    if (error) {
        console.error(error.details[0]);
        return res.status(400).json({ message: error.details[0].message });
    }

    next();
};

module.exports = queryValidation;