"use client";
import GetImageByQuery from "@/app/lib/getImageByQuery";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import ShowImages from "../ShowImages/ShowImages";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
let Page = 1;

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
  const [inputVal, setInputVal] = useState("");
  const pageRef = useRef<number>(1);
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!inputVal) {
      return;
    }

    const data = await GetImageByQuery({ query: inputVal, PageCount: 1 });
    setImageData(data.results);
  };
  const { ref, inView } = useInView();
  useEffect(() => {
    const fetchData = async () => {
      if (inView) {
        const data = await GetImageByQuery({
          query: inputVal,
          PageCount: pageRef.current,
        });
        setImageData((prevData) => [...prevData, ...data.results]);
        pageRef.current++;
      }
    };

    fetchData();
  }, [inView, inputVal]);

  const varients = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };
  return (
    <>
      <form method="post" onSubmit={handleSubmit} className="p-5">
        <input
          type="search"
          className="py-2 w-72 rounded-md outline-none border-2 border-gray-200 m-2 px-2"
          placeholder="search images"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
        />
      </form>
      <span>
        Hit <kbd className="px-2"> Enter </kbd> to see results
      </span>
      <section
        key={Math.random()}
        className="flex items-center justify-center lg:justify-between gap-2 flex-wrap"
      >
        {imageData?.map((imageUrl, index) => (
          <>
            <React.Fragment key={imageUrl.urls.raw}>
              <motion.div
                variants={varients}
                initial="hidden"
                animate="visible"
                transition={{
                  delay: 0.25 * index,
                  ease: "easeInOut",
                  duration: 0.5,
                }}
                viewport={{ amount: 0 }}
                key={index * 3}
                className="grid grid-flow-row"
              >
                <ShowImages
                  key={index * 2}
                  imageUrl={imageUrl.urls.regular}
                  altText={altTexts[index]}
                />
              </motion.div>
            </React.Fragment>
          </>
        ))}
      </section>
      <div className="block">
        <div>
          <div role="status">
            <svg
              ref={ref}
              aria-hidden="true"
              className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Input;
