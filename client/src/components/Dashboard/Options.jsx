"use client";
import React from "react";
import { FaArrowRight } from "react-icons/fa6";
import { IoMdImages } from "react-icons/io";
import { BsImageAlt } from "react-icons/bs";
import { FaCode } from "react-icons/fa6";
import { MdKeyboardVoice } from "react-icons/md";
import { useState, useEffect } from "react";

import Link from "next/link";
import { RiMenu2Fill } from "react-icons/ri";

const Options = ({ openSidenav, username}) => {

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

        <h2 className="sm:text-3xl text-2xl font-extrabold text-center sm:mt-[100px] mt-[40px]">
          Explore the power of AI
        </h2>
        <p className="text-zinc-400 text-center my-3">
          Chat with the smartest AI - Experience the power of AI
        </p>
        <div className="w-full flex justify-center my-8">
          <div className="sm:w-[70%] w-[95%]">
            {/* <Link href="/imageGeneration"><div className="flex items-center justify-between cursor-pointer h-[50px] rounded-lg px-5 shadow-lg my-7">
              <div className="flex items-center">
                <IoMdImages className="text-purple-500 mr-3" size={28} />
                <p className="text-xl font-semibold">Image Generation</p>
              </div>
              <FaArrowRight />
            </div></Link> */}

            <Link href="/backgroundRemover">
              <div className="flex items-center justify-between cursor-pointer h-[50px] rounded-lg px-5 shadow-lg my-7">
                <div className="flex items-center">
                  <BsImageAlt className="text-red-600 mr-3" size={20} />
                  <p className="sm:text-xl text-lg font-semibold">Background Remover</p>
                </div>
                <FaArrowRight />
              </div>
            </Link>

            <Link href="/codeGenerator"></Link>
            <div className="flex items-center justify-between cursor-pointer h-[50px] rounded-lg px-5 shadow-lg my-7">
              <div className="flex items-center">
                <FaCode className="text-green-500 mr-3" size={25} />
                <p className="sm:text-xl text-lg font-semibold">Code Generator</p>
              </div>
              <FaArrowRight />
            </div>

            <Link href="/voiceGenerator"></Link>
            <div className="flex items-center justify-between cursor-pointer h-[50px] rounded-lg px-5 shadow-lg my-7">
              <div className="flex items-center">
                <MdKeyboardVoice className="text-orange-400 mr-3" size={25} />
                <p className="sm:text-xl text-lg font-semibold">Voice Generator</p>
              </div>
              <FaArrowRight />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Options;
