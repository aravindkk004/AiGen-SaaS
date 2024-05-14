"use client";
import { IoMdImages } from "react-icons/io";
import Image from "next/image";

const ImageGeneration = () => {
  return (
    <>
      <div className="w-full p-4">
        {/* account details  */}
        <div className="relative h-[50px]">
          <p className="absolute right-3 top-3 text-white flex items-center justify-center rounded-full h-9 w-9 text-xl bg-green-900">
            A
          </p>
        </div>

        {/* heading of the page  */}
        <div className="flex items-center gap-4 ml-6">
          <IoMdImages
            className="text-purple-500 bg-purple-200 rounded-lg p-2"
            size={50}
          />
          <div>
            <h2 className="text-2xl font-bold">Image Generator</h2>
            <p className="text-zinc-600">Turn your prompt into an image.</p>
          </div>
        </div>

        {/* input box  */}
        <div className="border border-zinc-400 my-4 rounded-lg p-2 mx-6 relative flex items-center justify-between">
          <input
            type="text"
            placeholder="Enter your prompt here"
            className="w-[70%] h-[40px] px-3 border-none outline-none"
          />
          <div className="flex items-center gap-3">
            <select className="border border-zinc-400 rounded-lg p-2">
              <option value="256*256">256 x 256</option>
              <option value="512*512">512 x 512</option>
              <option value="1024*1024">1024 x 1024</option>
            </select>

            <button className="bg-blue-800 text-white px-7 rounded-lg py-2">
              Generate
            </button>
          </div>
        </div>
        <div className="w-full flex items-center mt-10 flex-col">
          <Image src="/person.png" height={300} width={300} />
          <p className="my-3 text-zinc-700">No images generated.</p>
        </div>
      </div>
    </>
  );
};

export default ImageGeneration;
