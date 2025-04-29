const Joi = require("joi");

const validateNotice = (req, res, next) => {
    const noticeSchema = Joi.object({
        title: Joi.string().min(5).required(),
        description: Joi.string().min(10).required(),
        hostelNo: Joi.number().required().valid(1, 2, 3, 4, 5).messages({"any.only": "Hostel no can only be from 1, 2, 3, 4 or 5"}),
        expiresAt: Joi.date().iso().greater('now').required()
            .messages({
                'date.base': 'Expiry date must be a valid date',
                'date.greater': 'Expiry date must be in the future',
                'any.required': 'Expiry date is required'
            })
    });

    const { error } = noticeSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};

module.exports = validateNotice;
