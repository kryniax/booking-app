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

export const validateUpdateUserRequest = [
  body("email").isEmail().notEmpty().withMessage("Email is required!"),
  body("oldPassword")
    .isStrongPassword()
    .notEmpty()
    .withMessage("Current password is required!"),
  body("password")
    .isStrongPassword()
    .notEmpty()
    .withMessage("New password is required!"),
  handleValidationErrors,
];

export const validateCreateHotelRequest = [
  body("name").notEmpty().withMessage("Name is required"),
  body("city").notEmpty().withMessage("City is required"),
  body("country").notEmpty().withMessage("Country is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("type").notEmpty().withMessage("Type is required"),
  body("pricePerNight")
    .notEmpty()
    .isNumeric()
    .withMessage("Price per night is required and must be a number"),
  body("adultCount")
    .notEmpty()
    .isNumeric()
    .withMessage("Adult count is required and must be a number"),
  body("childCount")
    .notEmpty()
    .isNumeric()
    .withMessage("Child count is required and must be a number"),
  body("facilities").notEmpty().isArray().withMessage("Facilities is required"),
  body("starRating")
    .notEmpty()
    .isNumeric()
    .withMessage("Star rating is required and must be a number"),
  body("imageUrls").notEmpty().isArray().withMessage("Images is required"),
];
