const Joi = require("joi");

const validateUserData = (req, res, next) => {
    const userDataSchema = Joi.object({
        crn: Joi.string().required().length(7).messages({
            "string.length": "CRN must be exactly 7 characters long.",
            "any.required": "CRN is required.",
        }),
        urn: Joi.string().required().length(7).messages({
            "string.length": "URN must be exactly 7 characters long.",
            "any.required": "URN is required.",
        }),
        room: Joi.number().required().min(1).max(999).messages({
            "number.min": "Room number must be at least 1.",
            "number.max": "Room number must not exceed 999.",
            "any.required": "Room number is required.",
        }),
        branch: Joi.string().min(2).required().valid("CSE", "ECE", "ME", "IT", "CE", "EE").messages({
            "any.only": "Branch must be one of CSE, ECE, ME, IT, CE, or EE.",
            "any.required": "Branch is required.",
        }),
        batch: Joi.string().required().pattern(/^\d{4}-\d{2}$/).messages({
            "string.pattern.base": "Batch must be in the format YYYY-YY (e.g., 2021-25).",
            "any.required": "Batch is required.",
        }),
        mobile: Joi.string().length(10).required().messages({
            "string.length": "Mobile number must be exactly 10 digits long.",
            "any.required": "Mobile number is required.",
        }),
        fatherName: Joi.string().min(3).required().messages({
            "string.min": "Father's name must be at least 3 characters long.",
            "any.required": "Father's name is required.",
        }),
        motherName: Joi.string().min(3).required().messages({
            "string.min": "Mother's name must be at least 3 characters long.",
            "any.required": "Mother's name is required.",
        }),
        address: Joi.string().min(5).required().messages({
            "string.min": "Address must be at least 5 characters long.",
            "any.required": "Address is required.",
        }),
        fatherPhoneNo: Joi.string().length(10).required().messages({
            "string.length": "Father's phone number must be exactly 10 digits long.",
            "any.required": "Father's phone number is required.",
        }),
        hostelNo: Joi.number().valid(1, 2, 3, 4).required().messages({
            "any.only": "Hostel number must be one of 1, 2, 3, or 4.",
            "any.required": "Hostel number is required.",
        }),
    });

    const { error } = userDataSchema.validate(req.body);
    if (error) {
        console.error("UserData validation failed:", error.details[0].message);
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};

const  validateCareTakerData = (req, res, next) => {
    const careTakerDataSchema = Joi.object({
        mobile: Joi.string().length(10).required().messages({
            "string.length": "Mobile number must be exactly 10 digits long.",
            "any.required": "Mobile number is required.",
        }),
        hostelNo: Joi.number().valid(1, 2, 3, 4).required().messages({
            "any.only": "Hostel number must be one of 1, 2, 3, or 4.",
            "any.required": "Hostel number is required.",
        }),
    });

    const { error } = careTakerDataSchema.validate(req.body);
    if (error) {
        console.error("CareTaker data validation failed:", error.details[0].message);
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};


module.exports = {validateUserData, validateCareTakerData};