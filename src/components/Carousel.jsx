import React, { useState } from "react";
import { Image } from "@chakra-ui/react";

const Carousel = ({ image }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevImage = () => {
    const newIndex = (currentIndex - 1 + image.length) % image.length;

    setCurrentIndex(newIndex);
  };

  const nextImage = () => {
    const newIndex = (currentIndex + 1) % image.length;

    setCurrentIndex(newIndex);
  };

  return (
    <div className="relative aspect-video bg-slate-100 ">
      <div className="relative  h-full">
        <div
          className="absolute h-full w-1/5 left-0 top-1/2 transform -translate-y-1/2  opacity-0 cursor-pointer hover:bg-gradient-to-r from-black via-Dark to-transparent  hover:opacity-30 duration-500"
          onClick={prevImage}
        ></div>
        <Image
          src={image[currentIndex]}
          fallback="https://placehold.co/1280x720"
          alt="BANNER IMAGE"
          width="full"
          h="full"
          className="object-cover"
        />
        <div
          className="absolute right-0 top-1/2 transform -translate-y-1/2  w-1/5 h-full opacity-0  hover:bg-gradient-to-l from-black via-Dark to-transparent  hover:opacity-30 duration-500 cursor-pointer"
          onClick={nextImage}
        ></div>
      </div>
    </div>
  );
};

export default Carousel;
