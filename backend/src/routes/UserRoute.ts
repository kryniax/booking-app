import express from "express";
import UserController from "../controllers/UserController";
import { validateRegisterUserRequest } from "../middleware/validation";

const router = express.Router();

router.post(
  "/register",
  validateRegisterUserRequest,
  UserController.createUser
);

export default router;
