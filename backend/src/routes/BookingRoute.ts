import express from "express";
import verifyToken from "../middleware/auth";
import BookingController from "../controllers/BookingController";

const router = express.Router();

router.post(
  "/:hotelId/bookings/payment-intent",
  verifyToken,
  BookingController.createPayment
);

router.post(
  "/:hotelId/bookings",
  verifyToken,
  BookingController.processPayment
);

router.get("/my-bookings", verifyToken, BookingController.getMyBooking);

export default router;
