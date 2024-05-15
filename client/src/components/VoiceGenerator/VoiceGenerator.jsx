"use client";
import Image from "next/image";
import { useState } from "react";
import { MdKeyboardVoice } from "react-icons/md";
import { RiMenu2Fill } from "react-icons/ri";
import axios from "axios";

const VoiceGenerator = ({ openSidenav, username }) => {
  const [text, setText] = useState("");
  const [gender, setGender] = useState("male");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [audioLink, setAudioLink] = useState("");

  const genVoice = async () => {
    setLoading(true);
    setError("");
    setAudioLink("");
    setText("");
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/voiceGenerator`,
        {
          text: text,
          gender: gender,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status !== 200) {
        setError(response.data.message || "An error occurred");
      } else {
        setAudioLink(response.data.audio_url);
      }
    } catch (error) {
      setError(error.message || "An error occurred");
    } finally {
      setLoading(false);
      setText("");
    }
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

        <div className="flex items-center gap-4 ml-6 sm:mt-[100px]">
          <MdKeyboardVoice
            className="text-orange-400 bg-orange-200 rounded-lg p-2"
            size={50}
          />
          <div>
            <h2 className="sm:text-2xl text-xl font-bold">Voice Generator</h2>
            <p className="text-zinc-600 sm:text-lg text-sm">
              urn your description to voice
            </p>
          </div>
        </div>

        <div className="border border-zinc-400 my-4 rounded-lg p-2 mx-6 relative sm:flex items-center justify-between">
          <input
            type="text"
            placeholder="Enter your description here"
            className="sm:w-[70%] w-full h-[40px] px-3 border-none outline-none"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="flex items-center justify-center gap-3">
            <select
              className="border border-zinc-400 rounded-lg p-2"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <button
              className="bg-[#103fef] text-white px-7 rounded-lg py-2"
              onClick={genVoice}
              disabled={loading} // Disable button while loading
            >
              {loading ? "Generating..." : "Generate"}
            </button>
          </div>
        </div>
        {audioLink ? (
          <div className="w-full flex justify-center">
            <audio controls className="w-[95%] mt-5">
              <source src={audioLink} type="audio/mp3" />
              Your browser does not support the audio element.
            </audio>
          </div>
        ) : (
          <div className="w-full flex items-center mt-10 flex-col">
            <Image
              src="/person.png"
              height={300}
              width={300}
              priority={false}
              alt="no code generated img"
            />
            <p className="my-3 text-zinc-700">
              {error || "No voice generated."}
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default VoiceGenerator;
