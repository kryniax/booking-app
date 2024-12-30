import { Request } from "express";
import Stripe from "stripe";
import Hotel from "../models/hotel";
import Booking from "../models/booking";

const stripe = new Stripe(process.env.STRIPE_API_KEY as string);

const createPayment = async (req: Request, res: any) => {
  try {
    const { numberOfNights } = req.body;
    const hotelId = req.params.hotelId;
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      return res.status(400).json({ message: "Hotel not found" });
    }

    const totalCost = hotel.pricePerNight * numberOfNights;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalCost * 100,
      currency: "usd",
      metadata: {
        hotelId,
        userId: req.userId,
      },
    });

    if (!paymentIntent.client_secret) {
      return res.status(500).json({ message: "Error creating payment intent" });
    }

    const paymentResponse = {
      paymentIntentId: paymentIntent.id,
      clientSecret: paymentIntent.client_secret.toString(),
      totalCost,
    };

    return res.send(paymentResponse);
  } catch (error) {
    console.log("Create payment: ", error);
    return res
      .status(500)
      .json({ message: "Something went wrong while creating payment" });
  }
};

const processPayment = async (req: Request, res: any) => {
  try {
    const paymentIntentId = req.body.paymentIntentId;
    const paymentIntent = await stripe.paymentIntents.retrieve(
      paymentIntentId as string
    );

    if (!paymentIntent) {
      return res.status(400).json({ message: "Payment intent not found" });
    }

    if (
      paymentIntent.metadata.hotelId !== req.params.hotelId ||
      paymentIntent.metadata.userId !== req.userId
    ) {
      return res.status(400).json({ message: "Payment intent mismatch" });
    }

    if (paymentIntent.status !== "succeeded") {
      return res.status(400).json({
        message: `Payment intent not succeeded. Status: ${paymentIntent.status}`,
      });
    }

    const newBooking = new Booking({
      ...req.body,
      userId: req.userId,
    });
    const savedBooking = await newBooking.save();

    const hotel = await Hotel.findByIdAndUpdate(
      { _id: req.params.hotelId },
      { $push: { bookings: savedBooking._id } }
    );

    if (!hotel) {
      await Booking.findByIdAndDelete(savedBooking._id);
      return res.status(400).json({ message: "Hotel not found" });
    }

    await hotel.save();
    return res.status(200).send();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Something went wrong while processing the payment" });
  }
};

const getMyBooking = async (req: Request, res: any) => {
  try {
    const bookings = await Booking.find({ userId: req.userId }).populate({
      path: "hotelId",
      select: "name city country imageUrls",
    });

    if (!bookings) {
      return res.status(400).json({ message: "Bookings not found" });
    }

    const bookingsWithCancelStatus = bookings.map((booking) => {
      const checkInDate = new Date(booking.checkIn);
      const currentDate = new Date();
      const timeDifference = checkInDate.getTime() - currentDate.getTime();
      const daysUntilCheckIn = Math.ceil(
        timeDifference / (1000 * 60 * 60 * 24)
      );

      return {
        ...booking.toObject(),
        cancelStatus: daysUntilCheckIn > 2,
      };
    });

    return res.json(bookingsWithCancelStatus);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Something went wrong while getting my booking" });
  }
};

const deleteBooking = async (req: Request, res: any) => {
  const { bookingId } = req.params;

  try {
    const booking = await Booking.findOne({
      _id: bookingId,
      userId: req.userId,
    });

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found or unauthorized",
      });
    }

    const checkInDate = new Date(booking.checkIn);
    const currentDate = new Date();

    const timeDifference = checkInDate.getTime() - currentDate.getTime();
    const daysUntilCheckIn = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    if (daysUntilCheckIn <= 2) {
      return res.status(400).json({
        message:
          "Booking can only be cancelled at least 2 days before check-in date",
      });
    }

    await Hotel.findByIdAndUpdate(booking.hotelId, {
      $pull: { bookings: bookingId },
    });

    await Booking.findByIdAndDelete(bookingId);

    return res.status(200).json({
      message: "Booking cancelled successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong while cancelling the booking",
    });
  }
};

export default { createPayment, processPayment, getMyBooking, deleteBooking };
