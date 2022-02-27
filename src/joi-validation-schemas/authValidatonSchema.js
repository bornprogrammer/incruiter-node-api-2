import Joi from "joi";
import UserType from "../../infrastructure/constants/UserType.js";
import SignUpType from "../../infrastructure/constants/SignUpType.js";

const signUpSchema = Joi.object({
  userType: Joi.string().trim().valid(UserType.EMPLOYER, UserType.INTERVIEWER, UserType.RECRUITER).required(),
  name: Joi.string().trim().min(3).max(50).regex(/[a-zA-Z][a-zA-Z ]*/).required(),
  password: Joi.string().trim().min(6).max(16).required(),
  signupType: Joi.string().trim().valid(SignUpType.GOOGLE, SignUpType.LINKED_IN, SignUpType.INCRUITER).required(),
  email: Joi.string().trim().email().required(),
  scope: Joi.string().alphanum().trim().optional(),
});

const loginSchema = Joi.object({
  password: Joi.string().min(6).max(16).required(),
  email: Joi.string().email().required(),
});


export { signUpSchema, loginSchema };