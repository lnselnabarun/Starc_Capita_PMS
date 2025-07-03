"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import LogoImage from "../../../app/assets/logo/Logo.png";
// import { useNavigate } from "react-router-dom";

const Logo = () => {
  // const navigate = useNavigate();
  return (
    <Link href="/" className="p-2 block">
      <Image src={LogoImage} alt="Logo" width={90} height={45} priority />
    </Link>
  );
};

export default Logo;
