"use client";
import Link from "next/link";
import { useState } from "react";
import { IoEye } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import axios from "axios"

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/login`, {
        email: email,
        password: password,
      });
      const data = res.data;
      const token = data.token;
      localStorage.setItem("token", token);
      router.replace("/dashboard");
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        if (status === 400) {
          setError("Incorrect email or password");
        } else if (status === 404) {
          setError("User not found");
        }else if(status == 401){
          setError("Incorrect Password")
        } else {
          setError("An error occurred");
        }
      } else if (error.request) {
        setError("No response received from server");
      } else {
        setError("Error setting up request");
      }
      setLoading(false);
    }
  };
  return (
    <>
      <div className="w-full h-[100vh] flex items-center justify-center">
        <form className="flex flex-col md:w-[400px] w-[320px] rounded-xl shadow-2xl md:p-10 p-5 relative">
          <h3 className="font-bold text-xl">sign in</h3>
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
                className="absolute top-11 text-zinc-400 right-3"
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
            onClick={handleSubmit}
            className="bg-[#103fef] text-white py-2 rounded-lg cursor-pointer"
          >
            {loading ? "Loading..." : "Continue"}
          </button>
          {error && <div className="text-red-500 mt-2">{error}</div>}
          <p className="my-3 flex items-center">
            <a className="mr-2">No account?</a>
            <Link href="/register" className="text-blue-600">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
