import mongoose, { InferSchemaType } from "mongoose";

const bookingSchema = new mongoose.Schema({
  hotelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hotel",
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  adultCount: {
    type: Number,
    required: true,
  },
  childCount: {
    type: Number,
    required: true,
  },
  checkIn: {
    type: Date,
    required: true,
  },
  checkOut: {
    type: Date,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  totalCost: {
    type: Number,
    required: true,
  },
});

export type BookingType = InferSchemaType<typeof bookingSchema>;

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;