import React from "react";
import Image from "next/image";
// import { useNavigate } from "react-router-dom";

const Logo = () => {
    // const navigate = useNavigate();
  return (
    <div onClick={() =>{}} className="p-2">
     <Image
      src={require("../../../app/assets/logo/Logo.png")}
      alt="Logo"
      width={100}
      height={80}
    />
  </div>
  );
};

export default Logo;
