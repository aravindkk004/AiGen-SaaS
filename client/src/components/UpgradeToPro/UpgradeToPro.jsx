import Link from "next/link";
import { TiTick } from "react-icons/ti";
import { FaXmark } from "react-icons/fa6";
import { RiMenu2Fill } from "react-icons/ri";

const UpgradeToPro = ({ openSidenav }) => {
  const handleButtonClick = () => {
    openSidenav();
  };
  return (
    <>
      <div className="md:h-[100vh] w-full md:flex flex-col justify-center items-center p-5">
        <button type="button" className="sm:hidden">
          <RiMenu2Fill
            className="text-black m-3"
            size={30}
            onClick={handleButtonClick}
          />
        </button>
        <h2 className="text-3xl font-extrabold my-4 text-center mt-[20px]">
          Pricing
        </h2>
        <p className="text-center">
          Get started on our free plan and upgrade when you are ready.
        </p>
        <div className="md:flex gap-[60px] items-center mt-5">
          <div className="shadow-2xl rounded-lg p-5">
            <h3 className="text-3xl font-bold text-center mb-3">Free</h3>
            <p className="text-zinc-400 mb-3">No credit card required</p>
            <h4 className="text-3xl font-extrabold text-center my-4">
              $0 /month
            </h4>
            <p className="flex items-center gap-3">
              <TiTick
                className="p-1 text-white bg-green-600 rounded-full"
                size={20}
              />
              All services
            </p>
            <p className="flex items-center gap-3">
              <FaXmark
                className="p-1 text-white bg-red-600 rounded-full"
                size={20}
              />
              Unlimited usage
            </p>
            <button className="bg-blue-700 text-white py-2 px-8 rounded-xl md:text-lg w-full text-md cursor-pointer my-3">
              <Link href="/dashboard">Get started</Link>
            </button>
          </div>

          <div className="shadow-2xl rounded-lg p-5 md:mt-0 mt-10">
            <h3 className="text-3xl font-bold text-center mb-3">Pro</h3>
            <p className="text-zinc-400 mb-3">For Professionals</p>
            <h4 className="text-3xl font-extrabold my-4">$10 /month</h4>
            <p className="flex items-center gap-3">
              <TiTick className="text-white bg-green-600 rounded-full" />
              All services
            </p>
            <p className="flex items-center gap-3">
              <TiTick className="text-white bg-green-600 rounded-full" />
              Unlimited usage
            </p>
            <button className="bg-gradient-to-r from-blue-900 to-pink-600 w-full text-white py-2 px-8 rounded-xl md:text-lg text-md cursor-pointer my-2">
              <Link href="/dashboard">Buy Now</Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpgradeToPro;
