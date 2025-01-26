import React, { useContext } from "react";
import {
  Button,
  Navbar,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Header = () => {
  const path = useLocation().pathname;
  const { isLoggedIn, logout } = useContext(AuthContext);

  return (
    <Navbar className="border-b-2">
      {/* Brand Logo */}
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
      >
        <span className="px-2.5 py-0.5 bg-gradient-to-r from-pink-900 via-purple-700 to-purple-950 rounded-xl text-white">
          Chronicles
        </span>
      </Link>

      {/* Right Section */}
      <div className="flex gap-2 md:order-2">
        {isLoggedIn ? (
          <>
            {/* Dashboard Link */}
            <Link to="/dashboard">
              <Button gradientDuoTone="purpleToBlue">Dashboard</Button>
            </Link>

            {/* Logout Button */}
            <Button
              gradientDuoTone="redToYellow"
              onClick={logout}
              className="text-white"
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            {/* Login and Sign Up Buttons */}
            <Link to="/login">
              <Button gradientDuoTone="purpleToBlue">Log In</Button>
            </Link>
            <Link to="/signup">
              <Button gradientDuoTone="purpleToPink">Sign Up</Button>
            </Link>
          </>
        )}
        <NavbarToggle />
      </div>

      {/* Navbar Collapse */}
      <NavbarCollapse>
        <NavbarLink active={path === "/"} as={"div"}>
          <Link to="/">Home</Link>
        </NavbarLink>
        <NavbarLink active={path === "/about"} as={"div"}>
          <Link to="/about">About</Link>
        </NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
};

export default Header;
