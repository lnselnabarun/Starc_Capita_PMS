"use client";
import React, { useState } from "react";
import { close, logo, menu } from "../assets";
import { navLinks } from "../constant";
import Logo from "./common/logo";

const Navbar = ({onpress}) => {
  const [toggle, setToggle] = useState(false);

  return (
    <nav className="w-full flex py-0 justify-between items-center">
     <Logo/>
      <ul className="list-none sm:flex hidden justify-end items-center flex-1">
        {navLinks.map((nav, index) => (
          <li
            key={nav.id}
            className={` text-neutral-900 font-poppins font-medium cursor-pointer text[16px] ${
              index === navLinks.length - 1 ? "mr-0" : "mr-10"
            } text-neutral-900 `}
          >
            <a href={`#${nav.id}`}>{nav.title}</a>
          </li>
        ))}
      </ul>

      {/* <div className="sm:hidden flex flex-1 justify-end items-center">
        <img
          alt="menu"
          src={toggle ? close : menu}
          className="w-[28px] h-[28px] object-contain"
          onClick={() => setToggle((prev) => !prev)}
        />
      </div> */}

      <div
        className={`${
          toggle ? "flex" : "hidden"
        } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
      >
        <ul className="list-none flex flex-col justify-end items-center flex-1">
          {navLinks.map((nav, index) => (
            <li onClick={() => setToggle(false)}
              key={nav.id}
              className={` text-neutral-900 font-poppins font-medium  cursor-pointer text[16px] ${
                index === navLinks.length - 1 ? "mb-0" : "mb-4"
              } text-neutral-900 `}
            >
              <a href={`#${nav.id}`}>{nav.title}</a>
            </li>
          ))}
        </ul>
      </div>
      <div className=" justify-end  z-10 items-end flex mr-1 ml-5 ">
          <button
            onClick={onpress}
            type="button"
            className={`py-2 px-6 font-poppins font-semibold text-[15px] text-primary outline-none bg-fuchsia-900 rounded-full flex hover:bg-fuchsia-700 transition-colors`}
          >
            LOGIN
          </button>
        </div>
        <div className=" justify-end  z-10 items-end flex ml-5 mr-5 ">
          <button
            onClick={() => {}}
            type="button"
            className={`py-2 px-6 font-poppins font-semibold text-[15px] text-primary outline-none bg-fuchsia-900 rounded-full flex hover:bg-fuchsia-700 transition-colors`}
          >
            SIGN UP
          </button>
        </div>
    </nav>
  );
};

export default Navbar;
