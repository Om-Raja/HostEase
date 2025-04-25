const Joi = require("joi");

const signUpValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    email: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]+@[gndec]+\\.ac\\.in$"))
      .required()
      .messages({
        "string.pattern.base":
          "Email must be a valid GNDEC email (e.g., ram1234567@gndec.ac.in).",
      }),
    role: Joi.string()
      .valid("student", "admin", "principal")
      .default("student"),
    password: Joi.string()
      .pattern(
        new RegExp(
          "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
        ),
      )
      .required()
      .messages({
        "string.pattern.base":
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
      }),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Bad request", error: error });
  }
  return next();
};

const loginValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(100).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Bad request", error: error });
  }
  return next();
};

const sendOtpValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]+@[gndec]+\\.ac\\.in$"))
      .required()
      .messages({
        "string.pattern.base":
          "Email must be a valid GNDEC email (e.g., ram1234567@gndec.ac.in).",
      }),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Bad request", error: error });
  }
  return next();
};

module.exports = { signUpValidation, loginValidation, sendOtpValidation };
