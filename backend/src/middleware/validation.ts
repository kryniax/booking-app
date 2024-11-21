import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

const handleValidationErrors = async (
  req: Request,
  res: any,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const validateRegisterUserRequest = [
  body("email").isEmail().notEmpty().withMessage("Email must be a email!"),
  body("password")
    .isStrongPassword()
    .notEmpty()
    .withMessage("Password must be a strong!"),
  body("firstName")
    .isString()
    .notEmpty()
    .withMessage("Firstname must be a string!"),
  body("lastName")
    .isString()
    .notEmpty()
    .withMessage("Lastname must be a string!"),
  handleValidationErrors,
];

export const validateLoginUserRequest = [
  body("email").isEmail().notEmpty().withMessage("Email is required!"),
  body("password")
    .isStrongPassword()
    .notEmpty()
    .withMessage("Password is required!"),
  handleValidationErrors,
];
