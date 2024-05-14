"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";

const NavBar = () => {
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
      <nav className="flex items-center justify-between text-white md:px-20 py-6 px-5">
        <div className="flex items-center">
          <Image src="/aigen-logo.png" height={60} width={60} alt="logo" />
          <h2 className="font-extrabold md:text-4xl text-2xl">AiGen</h2>
        </div>
        <button className="bg-white text-black md:px-5 px-3 py-2 rounded-3xl">
          <p onClick={handleRoute}>Get Started</p>
        </button>
      </nav>
    </>
  );
};

export default NavBar;
