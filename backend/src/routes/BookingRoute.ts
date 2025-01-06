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

router.put("/cancel/:bookingId", verifyToken, BookingController.cancelBooking);

router.delete(
  "/delete/:bookingId",
  verifyToken,
  BookingController.deleteBooking
);

export default router;
