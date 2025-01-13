import { useEffect, useRef, useState } from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import { fromLonLat } from "ol/proj";
import { Feature } from "ol";
import { Point } from "ol/geom";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { Style, Circle, Fill, Stroke } from "ol/style";
import Overlay from "ol/Overlay";
import "ol/ol.css";
import { useGetMainPageHotels } from "../api/HotelApi";
import { twMerge } from "tailwind-merge";
import MapPopup, { MapPopupProps } from "./MapPopup";
import { HotelType } from "../types";
import PulseLoader from "react-spinners/PulseLoader";
import { useAppContext } from "../contexts/AppContext";

type MapComponentProps = {
  hotel?: HotelType;
  zoom?: number;
  className: string;
};

const MapView = ({ hotel, zoom = 13, className }: MapComponentProps) => {
  const { mainPageHotels, isLoading } = useGetMainPageHotels();
  const { theme } = useAppContext();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<Map | null>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const [popupContent, setPopupContent] = useState<MapPopupProps | null>(null);

  useEffect(() => {
    if (!mapRef.current || !popupRef.current) return;

    const popup = new Overlay({
      element: popupRef.current,
      positioning: "bottom-center",
      stopEvent: true,
      offset: [0, -10],
    });

    const markerStyle = new Style({
      image: new Circle({
        radius: 8,
        fill: new Fill({
          color: theme ? "#60a5fa" : "#1e40af",
        }),
        stroke: new Stroke({
          color: theme ? "#1e1e1e" : "#ffffff",
          width: 2,
        }),
      }),
    });

    let features: Feature[] = [];

    if (hotel) {
      const feature = new Feature({
        geometry: new Point(fromLonLat([hotel.lng, hotel.lat])),
        name: hotel.name,
        img: hotel.imageUrls[0],
        url: hotel._id,
      });
      feature.setStyle(markerStyle);
      features = [feature];
    } else if (mainPageHotels) {
      features = mainPageHotels.map((hotel) => {
        const feature = new Feature({
          geometry: new Point(fromLonLat([hotel.lng, hotel.lat])),
          name: hotel.name,
          img: hotel.imageUrls[0],
          url: hotel._id,
        });
        feature.setStyle(markerStyle);
        return feature;
      });
    }

    const vectorLayer = new VectorLayer({
      source: new VectorSource({
        features: features,
      }),
    });

    const tileLayer = new TileLayer({
      source: new XYZ({
        url: theme
          ? "https://cartodb-basemaps-a.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
          : "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
        maxZoom: 19,
      }),
    });

    if (!mapInstanceRef.current) {
      const map = new Map({
        target: mapRef.current,
        layers: [tileLayer, vectorLayer],
        overlays: [popup],
        view: new View({
          center: hotel
            ? fromLonLat([hotel.lng, hotel.lat])
            : fromLonLat([19.145136, 51.919438]),
          zoom: zoom,
        }),
      });

      map.on("click", (evt) => {
        const feature = map.forEachFeatureAtPixel(
          evt.pixel,
          (feature) => feature
        );
        if (feature) {
          const coordinates = (feature.getGeometry() as Point).getCoordinates();
          const name = feature.get("name");
          const hotelImg = feature.get("img");
          const url = feature.get("url");

          setPopupContent({
            name,
            imageUrl: hotelImg,
            url,
          });
          popup.setPosition(coordinates);
        } else {
          setPopupContent(null);
          popup.setPosition(undefined);
        }
      });

      map.on("pointermove", (evt) => {
        const pixel = map.getEventPixel(evt.originalEvent);
        const hit = map.hasFeatureAtPixel(pixel);
        const mapTarget = map.getTarget() as HTMLElement;
        mapTarget.style.cursor = hit ? "pointer" : "";
      });

      mapInstanceRef.current = map;

      if (!hotel && features.length > 0) {
        const vectorSource = vectorLayer.getSource();
        const extent = vectorSource?.getExtent();
        map.getView().fit(extent!, {
          padding: [50, 50, 50, 50],
          maxZoom: 15,
        });
      }
    } else {
      const layers = mapInstanceRef.current.getLayers();
      const currentTileLayer = layers.getArray()[0] as TileLayer<XYZ>;
      currentTileLayer.setSource(
        new XYZ({
          url: theme
            ? "https://cartodb-basemaps-a.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
            : "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
          maxZoom: 19,
        })
      );
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.setTarget(undefined);
        mapInstanceRef.current = null;
      }
    };
  }, [hotel, mainPageHotels, theme]);

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center py-10">
        <PulseLoader color="#1e40af" size={25} />
      </div>
    );
  }

  return (
    <div className={twMerge("relative flex flex-1 overflow-hidden", className)}>
      <div ref={mapRef} className="w-full h-full" />
      <div ref={popupRef} className="absolute z-10 bottom-0 left-0 w-40">
        {popupContent && <MapPopup {...popupContent} />}
      </div>
    </div>
  );
};

export default MapView;
