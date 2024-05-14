"use client"
import LeftNav from "@/components/LeftNav/LeftNav";
import PrivateRoute from "@/components/PrivateRoute/PrivateRoute";
import UpgradeToPro from "@/components/UpgradeToPro/UpgradeToPro";
import { useState } from "react";

export default function Home() {
  const [openSidenav, setOpenSidenav] = useState(false);
  const handleOpenSidenav = () => {
    console.log(openSidenav);
    setOpenSidenav(!openSidenav);
  };
  return (
    <>
      <PrivateRoute>
        <div className="flex w-full fixed h-[100vh]">
          <div
            className={`lg:w-[20%] sm:block ${openSidenav ? "" : "hidden"} ${
              openSidenav ? "absolute top-0 left-0 h-full w-[80%] z-10" : ""
            }`}
          >
            <LeftNav
              name="imageGeneration"
              open={openSidenav}
              openSidenav={handleOpenSidenav}
            />
          </div>
          <div className="lg:w-[80%] w-full overflow-scroll">
            <UpgradeToPro openSidenav={handleOpenSidenav} />
          </div>
        </div>
      </PrivateRoute>
    </>
  );
}
