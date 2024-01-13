import Image from "next/image";
import React from "react";

type Props = {};
interface ShowImagesProps {
  imageUrl: string | null;
  altText: string;
}

const ShowImages: React.FC<ShowImagesProps> = ({ imageUrl, altText }) => {
  if (!imageUrl) {
    return null;
  }

  return (
    <>
      <div className="flex flex-1">
        <Image
          src={imageUrl}
          alt={altText}
          height={100}
          width={100}
          className="w-96 h-96 rounded-md shadow-md"
        />
      </div>
    </>
  );
};

export default ShowImages;
