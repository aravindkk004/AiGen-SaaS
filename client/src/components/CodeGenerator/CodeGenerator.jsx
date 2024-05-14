"use client";
import { useState } from "react";
import { FaCode } from "react-icons/fa6";
import Image from "next/image";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { RiMenu2Fill } from "react-icons/ri";

const formatCodeResponse = (response) => {
  const lines = response.split("\n");
  const formattedLines = [];
  lines.forEach((line) => {
    formattedLines.push(line);
  });
  const formattedCode = formattedLines.join("\n");
  return formattedCode;
};

const CodeGenerator = ({ openSidenav, username}) => {
  const [desc, setDesc] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_API_KEY);

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt =
      "Generate code for the given description. also remove unwanted content. " +
      desc;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const texts = response.text();

    const formattedCode = formatCodeResponse(texts);

    setResponse(formattedCode);
    setLoading(false);
    setDesc("");
  };

  const handleButtonClick = () => {
    openSidenav();
  };

  return (
    <>
      <div className="px-2">
        <button type="button" className="sm:hidden">
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
          <FaCode
            className="text-green-500 bg-green-200 rounded-lg p-2"
            size={50}
          />
          <div>
          <h2 className="sm:text-2xl text-xl font-bold">Code Generator</h2>
          <p className="text-zinc-600 sm:text-lg text-sm">
              Generate code using descriptive text.
            </p>
          </div>
        </div>
        {/* input box  */}
        <div className="border border-zinc-400 my-4 rounded-lg p-2 mx-6 relative flex items-center justify-between">
          <input
            type="text"
            placeholder="Enter your prompt here"
            className="w-[70%] h-[40px] px-3 border-none outline-none"
            onChange={(e) => setDesc(e.target.value)}
            value={desc}
          />
          <div className="flex items-center gap-3">
            <button
              className="bg-blue-800 text-white px-7 rounded-lg py-2"
              onClick={handleGenerate}
            >
              {loading ? "Loading..." : "Generate"}
            </button>
          </div>
        </div>
        {response ? (
          <div className="w-full flex justify-center">
            <div className="w-[95%] mt-4 p-4 bg-gray-100 rounded-lg">
              <pre>{response}</pre>
            </div>
          </div>
        ) : (
          <div className="w-full flex items-center mt-10 flex-col">
            <Image src="/person.png" height={300} width={300} />
            <p className="my-3 text-zinc-700">No code generated.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default CodeGenerator;
