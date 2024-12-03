import express from "express";
import UserController from "../controllers/UserController";
import {
  validateLoginUserRequest,
  validateRegisterUserRequest,
} from "../middleware/validation";
import verifyToken from "../middleware/auth";

const router = express.Router();

router.post(
  "/register",
  validateRegisterUserRequest,
  UserController.createUser
);
router.post("/login", validateLoginUserRequest, UserController.getUser);
router.get("/validate-token", verifyToken, UserController.getUserToken);
router.post("/logout", UserController.logoutUser);

export default router;
