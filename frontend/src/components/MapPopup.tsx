import React from "react";
import { Link } from "react-router-dom";

export type MapPopupProps = {
  name: string;
  imageUrl: string;
  url: string;
};

const MapPopup = ({ name, imageUrl, url }: MapPopupProps) => {
  return (
    <Link
      to={`/detail/${url}`}
      className="flex flex-col gap-2 bg-white p-2 w-full h-fit rounded-lg shadow-lg popup-content text-center"
    >
      <h3 className="font-semibold text-lg">{name}</h3>
      <img
        src={imageUrl}
        alt={name}
        className="w-48 h-32 object-cover rounded-lg"
      />
    </Link>
  );
};

export default MapPopup;
