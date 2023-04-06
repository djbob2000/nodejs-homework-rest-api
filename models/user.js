const { Schema, model } = require("mongoose");
const Joi = require("joi");

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      required: [true, "Avatar is required"],
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
      default: "",
    },
  },
  { versionKey: false, timestamps: true }
);

const joiRegisterSchema = Joi.object({
  password: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
});

const joiVerifyEmailSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.base": "Email должен быть строкой.",
    "string.email": "Email должен быть валидным email адресом.",
    "string.empty": "Email является обязательным полем.",
    "any.required": "Email является обязательным полем.",
  }),
});

const joiLoginSchema = Joi.object({
  password: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
});

const User = model("user", userSchema);

module.exports = {
  User,
  joiVerifyEmailSchema,
  joiRegisterSchema,
  joiLoginSchema,
};
