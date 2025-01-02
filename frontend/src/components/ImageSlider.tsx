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
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleImageClick = (index: number) => {
    setSelectedIndex(index);
    setIsFullscreen(true);
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
          768: { slidesPerView: 1 },
          1024: { slidesPerView: 2 },
          1280: { slidesPerView: 3 },
        }}
        className="w-full"
      >
        {images.map((url, index) => (
          <SwiperSlide key={index}>
            <img
              src={url}
              alt={`Image ${index + 1}`}
              className="w-full h-[300px] object-cover cursor-pointer"
              onClick={() => handleImageClick(index)}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {isFullscreen && (
        <div className="fixed inset-0 bg-black/90 z-50">
          <button
            className="absolute top-4 right-4 text-white text-2xl z-50"
            onClick={() => setIsFullscreen(false)}
          >
            &#x2715;
          </button>
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={0}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            initialSlide={selectedIndex}
            className="w-full h-full [&_.swiper-button-next]:!text-white [&_.swiper-button-prev]:!text-white [&_.swiper-button-next]:!right-4 [&_.swiper-button-prev]:!left-4 lg:[&_.swiper-button-next]:!right-8 lg:[&_.swiper-button-prev]:!left-8"
          >
            {images.map((url, index) => (
              <SwiperSlide
                key={index}
                className="!flex justify-center items-center"
              >
                <img
                  src={url}
                  alt={`Fullscreen ${index + 1}`}
                  className="max-h-[90%] p-2 lg:p-4 w-auto"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
};

export default ImageSlider;
