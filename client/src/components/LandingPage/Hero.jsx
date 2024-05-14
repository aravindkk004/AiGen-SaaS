"use client";
import { TypeAnimation } from "react-type-animation";
import "./Hero.css";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter()
  const handleRoute = () =>{
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login'); 
    }else{
      router.push("/dashboard")
    }
  }
  return (
    <>
      <div className="py-36">
        <h1 className="text-white md:font-extrabold md:text-6xl text-3xl font-bold text-center">
          The Best AI tool for
        </h1>
        <h1 className="text-center">
          <TypeAnimation
            sequence={[
              "Image Generation",
              1000,
              "Background Remover",
              1000,
              "Voice Generator",
              1000,
              "Code Generator",
              1000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
          />
        </h1>
        <p className="text-zinc-400 text-center md:text-lg text-md m-5">
          Create content using AI 10x faster than before.
        </p>
        <div className="flex w-full justify-center">
          <button className="my-3 bg-gradient-to-r from-blue-900 to-pink-600 text-white py-3 px-8 rounded-3xl md:text-xl text-md cursor-pointer">
            <p onClick={handleRoute}>Start generating for free</p>
          </button>
        </div>
        <p className="text-zinc-400 md:text-lg text-md text-center">
          No credit card required.
        </p>
      </div>
    </>
  );
};

export default Hero;
