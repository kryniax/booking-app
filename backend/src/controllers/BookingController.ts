import { Request } from "express";
import Stripe from "stripe";
import Hotel from "../models/hotel";
import Booking, { BookingType } from "../models/booking";

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

export default { createPayment, processPayment };
