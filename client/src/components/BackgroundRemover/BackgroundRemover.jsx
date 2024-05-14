"use client";
import { useState } from "react";
import { BsImageAlt } from "react-icons/bs";
import Image from "next/image";
import { RiMenu2Fill } from "react-icons/ri";

const BackgroundRemover = ({ openSidenav, username}) => {
  const [fileName, setFileName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [bgRemovedImageUrl, setBgRemovedImageUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFileName(file.name);
    setImageFile(file);
  };

  const handleGenerate = async () => {
    if (!imageFile) {
      setError("No image selected");
      return;
    }

    const formData = new FormData();
    formData.append("image", imageFile);
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/bgremover`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error removing background");
      }

      const responseData = await response.json();
      console.log("img url", responseData.image_url);
      setBgRemovedImageUrl(responseData.image_url);
      setError("");
      setFileName("");
      setImageFile("");
      setLoading(false);
    } catch (error) {
      setError("Error removing background");
      console.error("Error removing background:", error);
      setLoading(false);
    }
  };

  const handleButtonClick = () => {
    openSidenav();
  };

  return (
    <>
      <div className="px-2">
      <button
          type="button"
          className="sm:hidden"
        >
          <RiMenu2Fill
            className="text-black m-3"
            size={30}
            onClick={handleButtonClick}
          />
        </button>

        <div className="absolute right-3 top-3 h-[70px] cursor-pointer">
          <p className=" text-white flex items-center justify-center rounded-full h-9 w-9 text-xl bg-green-900">
            {username}
          </p>
        </div>

        {/* heading of the page  */}
        <div className="flex items-center gap-4 ml-6 sm:mt-[100px]">
          <BsImageAlt
            className="text-red-600 bg-red-200 rounded-lg p-2"
            size={50}
          />
          <div>
            <h2 className="sm:text-2xl text-xl font-bold">Background Remover</h2>
            <p className="text-zinc-600 sm:text-lg text-sm">
              Upload an image and remove the background
            </p>
          </div>
        </div>

        {/* input box  */}
        <div className="border border-zinc-400 my-4 rounded-lg p-2 mx-6 relative flex items-center justify-between">
          <input
            type="file"
            className="hidden"
            id="fileInput"
            accept="image/*"
            onChange={handleFileChange}
          />
          {fileName ? (
            <p className="text-zinc-400">
              selected image:{" "}
              <span className="font-semibold text-black text-xl">
                {fileName}
              </span>
            </p>
          ) : (
            <p className="text-zinc-400 text-sm sm:text-lg">
              Upload Image here to remove the background with our powerful Ai.
            </p>
          )}
          <div className="flex gap-3">
            <button
              id="uploadButton"
              className="cursor-pointer px-4 py-2 bg-blue-800 text-white rounded inline-block text-sm sm:text-lg"
              onClick={() => document.getElementById("fileInput").click()}
            >
              Upload Image
            </button>
            {fileName ? (
              <button
                className="cursor-pointer px-4 py-2 bg-purple-800 text-white rounded inline-block"
                onClick={handleGenerate}
              >
                {loading ? "Generating..." : "Generate Image"}
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
        {bgRemovedImageUrl ? (
          <div className="w-full mt-10 px-8">
            <div className="flex items-center justify-between mb-3">
              <h3 className="sm:text-2xl text-xl font-extrabold mb-2 ">
                Background Removed Image
              </h3>
              {/* <a
                href={`http://127.0.0.1:5000/${bgRemovedImageUrl}`}
                className="cursor-pointer flex items-center px-4 py-2 bg-purple-800 text-white rounded"
                download
                target="_blank"
              >
                <GoDownload size={20} />
                Download
              </a> */}
            </div>
            <div className="w-full">
              <img
                src={`http://127.0.0.1:5000/${bgRemovedImageUrl}`}
                alt="Background Removed Image"
                width={500}
                height={400}
                className="border border-zinc-400 rounded-lg w-full"
              />
            </div>
          </div>
        ) : (
          <div className="w-full flex items-center mt-10 flex-col">
            <Image src="/person.png" height={300} width={300} />
            <p className="my-3 text-zinc-700">No images generated.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default BackgroundRemover;
