"use client";
import React, { useState, useEffect } from "react";
import LeftNav from "../LeftNav/LeftNav";
import Options from "./Options";
import { jwtDecode } from "jwt-decode";

const Dashboard = () => {
  const [openSidenav, setOpenSidenav] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken && decodedToken.username) {
          setUsername(decodedToken.username[0]);
        } else {
          console.error("Invalid token structure: username field not found.");
        }
      } catch (error) {
        console.error("Error decoding token:", error.message);
      }
    } else {
      console.error("Token not found in local storage.");
    }
  }, []);

  const handleOpenSidenav = () => {
    console.log(openSidenav);
    setOpenSidenav(!openSidenav);
  };
  return (
    <>
      <div className="flex w-full fixed h-[100vh]">
        <div
          className={`lg:w-[20%] sm:block ${openSidenav ? "" : "hidden"} ${
            openSidenav ? "absolute top-0 left-0 h-full w-[80%] z-10" : ""
          }`}
        >
          <LeftNav
            name={"home"}
            open={openSidenav}
            openSidenav={handleOpenSidenav}
          />
        </div>
        <div className="lg:w-[80%] w-full">
          <Options openSidenav={handleOpenSidenav} username={username}/>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
