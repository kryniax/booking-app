import express from "express";
import UserController from "../controllers/UserController";
import {
  validateLoginUserRequest,
  validateRegisterUserRequest,
} from "../middleware/validation";

const router = express.Router();

router.post(
  "/register",
  validateRegisterUserRequest,
  UserController.createUser
);

router.post("/login", validateLoginUserRequest, UserController.getUser);

export default router;
