"use client";
import React from "react";
import { MdOutlineDashboard } from "react-icons/md";
import { IoMdImages } from "react-icons/io";
import { BsImageAlt } from "react-icons/bs";
import { FaCode } from "react-icons/fa6";
import { MdKeyboardVoice } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import { SlEnergy } from "react-icons/sl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { IoMdClose } from "react-icons/io";


const LeftNav = ({ name, open, openSidenav }) => {
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  const handleButtonClick = () => {
    openSidenav();
  };
  return (
    <>
      <div className="bg-gray-900 h-[100vh] text-white py-5 relative">
      <IoMdClose className="text-white absolute right-4 top-4 sm:hidden" size={20} onClick={handleButtonClick}/>
        <div className="mb-6 flex items-center w-full justify-center">
          <Image src="/aigen-logo.png" alt="logo" height={50} width={50} />
          <h2 className={`font-bold text-3xl lg:block ${open ? "" : "hidden"}`}>AiGen</h2>
        </div>
        <div className="px-5 mt-5">
          <Link href="/dashboard">
            <div
              className={`flex items-center my-3 p-2 rounded-lg cursor-pointer ${
                name === "home" ? "bg-gray-700" : ""
              } ${name == "home" ? "text-white" : "text-zinc-400"}`}
            >
              <MdOutlineDashboard className="text-blue-400" size={28} />
              <p className={`text-lg ml-3 lg:block ${open ? "" : "hidden"} `}>Dashboard</p>
            </div>
          </Link>

          {/* <Link href="/imageGeneration">
            <div
              className={`flex items-center my-3 p-2 rounded-lg cursor-pointer ${
                name === "imageGeneration" ? "bg-gray-700" : ""
              } ${name == "imageGeneration" ? "text-white" : "text-zinc-400"}`}
            >
              <IoMdImages className="text-purple-500" size={28} />
              <p className="text-lg ml-3">Image Generation</p>
            </div>
          </Link> */}

          <Link href="/backgroundRemover">
            <div
              className={`flex items-center my-3 p-2 rounded-lg cursor-pointer ${
                name === "backgroundRemover" ? "bg-gray-700" : ""
              } ${
                name == "backgroundRemover" ? "text-white" : "text-zinc-400"
              }`}
            >
              <BsImageAlt className="text-red-600" size={20} />
              <p className={`text-lg ml-3 lg:block ${open ? "" : "hidden"} `}>Background Remover</p>
            </div>
          </Link>

          <Link href="codeGenerator">
            <div
              className={`flex items-center my-3 p-2 rounded-lg cursor-pointer ${
                name === "codeGenerator" ? "bg-gray-700" : ""
              } ${name == "codeGenerator" ? "text-white" : "text-zinc-400"}`}
            >
              <FaCode className="text-green-500" size={26} />
              <p className={`text-lg ml-3 lg:block ${open ? "" : "hidden"} `}>Code Generator</p>
            </div>
          </Link>

          <Link href="/voiceGenerator">
            <div
              className={`flex items-center my-3 p-2 rounded-lg cursor-pointer ${
                name === "voiceGenerator" ? "bg-gray-700" : ""
              } ${name == "voiceGenerator" ? "text-white" : "text-zinc-400"}`}
            >
              <MdKeyboardVoice className="text-orange-400" size={28} />
              <p className={`text-lg ml-3 lg:block ${open ? "" : "hidden"} `}>Voice Generator</p>
            </div>
          </Link>

          {/* <Link href="/settings">
            <div
              className={`flex items-center my-3 p-2 rounded-lg cursor-pointer ${
                name === "settings" ? "bg-gray-700" : ""
              } ${name == "settings" ? "text-white" : "text-zinc-400"}`}
            >
              <IoMdSettings className="text-gray-400" size={26} />
              <p className="text-lg ml-3">Settings</p>
            </div>
          </Link> */}
        </div>
        <div className="absolute bottom-0 px-5">
          <Link href="/upgrade">
            <div className="flex items-center my-3  p-2 rounded-lg cursor-pointer">
              <SlEnergy size={26} className="text-green-500" />
              <p className={`text-lg ml-3 lg:block ${open ? "" : "hidden"} `}>Upgrade to plus</p>
            </div>
          </Link>
          <div
            className="flex items-center my-3  p-2 rounded-lg cursor-pointer"
            onClick={handleLogout}
          >
            <MdLogout size={26} className="text-red-400" />
            <p className={`text-lg ml-3 lg:block ${open ? "" : "hidden"} `}>
              <Link href="/">Logout</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeftNav;
