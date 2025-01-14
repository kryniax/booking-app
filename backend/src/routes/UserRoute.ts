import express from "express";
import UserController from "../controllers/UserController";
import {
  validateLoginUserRequest,
  validateRegisterUserRequest,
  validateUpdateUserRequest,
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
router.get("/me", verifyToken, UserController.getUserToBook);
router.post(
  "/update",
  validateUpdateUserRequest,
  verifyToken,
  UserController.updateUser
);
router.delete("/delete", verifyToken, UserController.deleteUser);

export default router;
