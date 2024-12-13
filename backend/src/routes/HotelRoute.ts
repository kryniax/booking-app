import express from "express";
import HotelController from "../controllers/HotelController";
import { param } from "express-validator";

const router = express.Router();

router.get("/search", HotelController.searchHotel);

router.get(
  "/:hotelId",
  param("hotelId")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("HotelId parameter must be a valid string"),
  HotelController.getHotel
);

export default router;
