import { Request } from "express";
import Hotel from "../models/hotel";

const searchHotel = async (req: Request, res: any) => {
  try {
    const pageSize = 5;
    const pageNumber = parseInt(
      req.query.page ? req.query.page.toString() : "1"
    );
    const skip = (pageNumber - 1) * pageSize;

    const hotels = await Hotel.find().skip(skip).limit(pageSize);
    const total = await Hotel.countDocuments();

    const response = {
      data: hotels,
      pagination: {
        total,
        page: pageNumber,
        pages: Math.ceil(total / pageSize),
      },
    };
  } catch (error) {
    console.log("search hotel error: ", error);
    return res.status(500).json({ message: "Error while search hotels" });
  }
};

export default { searchHotel };
