import React from "react";
import {
  Button,
  Navbar,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const path = useLocation().pathname;
  return (
    <Navbar className="border-b-2">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
      >
        <span className="px-2.5 py-0.5 bg-gradient-to-r from-pink-900 via-purple-700 to-purple-950 rounded-xl text-white">
          Chronicles
        </span>
      </Link>

      <div className="flex gap-2 md:order-2">
        <Link to="/login">
          <Button gradientDuoTone="purpleToBlue">Log In</Button>
        </Link>
        <Link to="/signup">
          <Button gradientDuoTone="purpleToPink">Sign Up</Button>
        </Link>
        <NavbarToggle />
      </div>

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
