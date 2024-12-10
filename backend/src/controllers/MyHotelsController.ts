import { Request, Response } from "express";

import cloudinary from "cloudinary";
import Hotel from "../models/hotel";
import mongoose from "mongoose";

const CreateMyHotel = async (req: Request, res: any) => {
  try {
    const imageUrls = await uploadImage(req.files as Express.Multer.File[]);
    const hotel = new Hotel(req.body);
    hotel.imageUrls = imageUrls;
    hotel.lastUpdated = new Date();
    hotel.userId = new mongoose.Types.ObjectId(req.userId);

    await hotel.save();
    res.status(201).send(hotel);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Creating hotel went wrong" });
  }
};

const uploadImage = async (files: Express.Multer.File[]) => {
  const uploadPromises = files.map(async (file) => {
    const image = file;
    const base64Image = Buffer.from(image.buffer).toString("base64");
    const dataURI = `data:${image.mimetype};base64,${base64Image}`;
    const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);
    return uploadResponse.url;
  });
  const imageUrls = await Promise.all(uploadPromises);
  return imageUrls;
};

const GetMyHotels = async (req: Request, res: any) => {
  try {
    const hotels = await Hotel.find({ userId: req.userId });

    if (!hotels) {
      return res.status(404).json({ message: "Hotels not found" });
    }

    res.json(hotels);
  } catch (error) {
    console.log("error: ", error);
    return res.status(500).json({ message: "Error fetching hotels" });
  }
};

const GetMyHotelById = async (req: Request, res: any) => {
  try {
    const hotelId = req.params.id.toString();
    const hotel = await Hotel.findOne({
      _id: hotelId,
      userId: req.userId,
    });

    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    res.json(hotel);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching hotel by id" });
  }
};

export default { CreateMyHotel, GetMyHotels, GetMyHotelById };
