"use client";
import Link from "next/link";
import { useState } from "react";
import { IoEye } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import axios from "axios";
import { useRouter } from "next/navigation";

const Register = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/register`,
        {
          username: username,
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json", // Specify content type
            "Access-Control-Allow-Origin": "*", // Allow access from all origins
          },
        }
      );

      if (res.status !== 201) {
        setError(res.data.message);
      }
      setLoading(false);
      router.replace("/login");
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };
  return (
    <>
      <div className="w-full h-[100vh] flex items-center justify-center">
        <form className="flex flex-col md:w-[400px] w-[320px] rounded-xl shadow-2xl md:p-10 p-5 relative">
          <h3 className="font-bold text-xl">Create Your Account</h3>
          <p className="text-zinc-400 my-2">to continue to AiGen</p>
          <div className="h-11 border border-zinc-400 flex items-center rounded-md px-3 mt-2">
            <button className="flex ">
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg"
                height="20px"
                width="20px"
              />
              <p className="ml-4">Continue with Google</p>
            </button>
          </div>
          <p className="text-center text-zinc-400 my-5">or</p>
          <label>Username</label>
          <input
            type="text"
            required={true}
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            className="border border-zinc-400 rounded-md my-2 h-10 mb-4 px-3"
          />
          <label>Email Address</label>
          <input
            type="email"
            required={true}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="border border-zinc-400 rounded-md my-2 h-10 mb-4 px-3"
          />
          <div className="flex flex-col w-full relative">
            <label>Password</label>
            <input
              type={visible ? "text" : "password"}
              required={true}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="border border-zinc-400 rounded-md my-2 h-10 mb-4 px-3"
            />
            {visible ? (
              <IoEyeOffOutline
                className="absolute top-11 text-zinc-400 right-3 cursor-pointer"
                onClick={() => setVisible(!visible)}
              />
            ) : (
              <IoEye
                className="absolute top-11 text-zinc-400 right-3 cursor-pointer"
                onClick={() => setVisible(!visible)}
              />
            )}
          </div>
          <button
            type="submit"
            className="bg-[#103fef] text-white py-2 rounded-lg cursor-pointer"
            onClick={handleSubmit}
          >
            {loading ? "Loading..." : "Continue"}
          </button>
          {error && <div className="text-red-500 mt-2">{error}</div>}
          <p className="my-3 flex items-center">
            <p className="mr-2">Already have an account?</p>
            <Link href="/login" className="text-blue-600">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;
