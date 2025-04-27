const Joi = require("joi");

const complaintValidation = (req, res, next) => {
    const complaintSchema = Joi.object({
        complaint:Joi.object({
            complaintText: Joi.string().min(10).required().messages({
                "string.min": "Description of complaint should be at least 10 characters long",
                "any.required": "Complaint description is required",
            }),
        }),
    });

    const {error} = complaintSchema.validate(req.body);
    if(error){
        return res.status(400).json({message: error.details[0].message});
    }

    next();
}

module.exports = complaintValidation;