import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type ImageSliderProps = {
  images: string[];
};

const ImageSlider = ({ images }: ImageSliderProps) => {
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageClick = (url: string) => {
    setSelectedImage(url);
    setIsFullscreen(true);
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
    setSelectedImage(null);
  };

  return (
    <div className="relative">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={5}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          768: {
            slidesPerView: 1,
          },
          1024: {
            slidesPerView: 2,
          },
          1280: {
            slidesPerView: 3,
          },
        }}
        className="w-full"
      >
        {images.map((url, index) => (
          <SwiperSlide key={index}>
            <img
              src={url}
              alt={`Image ${index + 1}`}
              className="w-full h-[300px] object-cover cursor-pointer"
              onClick={() => handleImageClick(url)}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {isFullscreen && selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
          onClick={closeFullscreen}
        >
          <button
            className="absolute top-4 right-4 text-white text-2xl"
            onClick={closeFullscreen}
          >
            &#x2715;
          </button>
          <div className="relative h-full flex items-center">
            <img
              src={selectedImage}
              alt="Fullscreen view"
              className="max-h-[90%] w-auto object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageSlider;
