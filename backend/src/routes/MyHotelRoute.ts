import express from "express";
import MyHotelsController from "../controllers/MyHotelsController";
import multer from "multer";
import verifyToken from "../middleware/auth";
import { validateCreateHotelRequest } from "../middleware/validation";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

router.post(
  "/",
  verifyToken,
  validateCreateHotelRequest,
  upload.array("imageFiles", 6),
  MyHotelsController.CreateMyHotel
);

router.get("/", verifyToken, MyHotelsController.GetMyHotels);

router.get("/:id", verifyToken, MyHotelsController.GetMyHotelById);

router.put(
  "/:hotelId",
  verifyToken,
  upload.array("imageFiles"),
  MyHotelsController.UpdateMyHotel
);

export default router;
