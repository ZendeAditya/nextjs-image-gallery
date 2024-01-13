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
      <Image
        src={imageUrl}
        alt="alt text of image "
        height={100}
        width={100}
        className="w-96 h-96 rounded-md shadow-md aspect-square object-cover "
      />
    </>
  );
};

export default ShowImages;
