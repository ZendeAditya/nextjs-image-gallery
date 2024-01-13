"use client";
import GetImageByQuery from "@/app/lib/getImageByQuery";
import React, { FormEvent, useRef, useState } from "react";
import ShowImages from "../ShowImages/ShowImages";
import axios from "axios";

const Input: React.FC = () => {
  const [imageData, setImageData] = useState<
    {
      urls: {
        raw: string;
        regular: string;
      };
    }[]
  >([]);
  const [altTexts, setAltTexts] = useState<string[]>([]);
  const refValue = useRef<HTMLInputElement | null>(null);
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const inputValue = refValue.current?.value;
    console.log("inputvalue", inputValue);
    console.log(inputValue);
    if (!inputValue) {
      return;
    }

    const data = await GetImageByQuery({ query: inputValue });
    setImageData(data.results);
    if (refValue.current) {
      refValue.current.value = "";
    }
  };

  return (
    <>
      <form method="post" onSubmit={handleSubmit}>
        <input
          type="text"
          ref={refValue}
          className="py-2 w-72 rounded-md outline-none border-2 border-gray-200 m-2 px-2"
          placeholder="search images"
        />
      </form>
      {imageData?.map((imageUrl, index) => (
        <div
          key={index}
          className="flex items-center justify-between gap-2 flex-row"
        >
          <ShowImages
            key={index}
            imageUrl={imageUrl.urls.raw}
            altText={altTexts[index]}
          />
        </div>
      ))}
    </>
  );
};

export default Input;
