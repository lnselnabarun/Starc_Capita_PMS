"use client";
import React, { useState } from "react";
import styles from "../app/constant/style";
import { Navbar } from "./components";
import Head from "next/head";
import Image from "next/image";
import Logo from "./components/common/logo";
// import ScrollIndicator from "./components/scrollIndicator/ScrollIndicator";
// import "../src/components/scrollIndicator/styles.css"

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
  });

  const handleOpenModal = () => {
    setShowModal(!showModal);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const action = () => {
    setOpen(false);
  };

  return (
    <>
      {/* <div className="header">
        <h2>Scroll Indicator</h2>
        <ScrollIndicator color="orange" />
      </div> */}

      <div className="bg-primary w-full overflow-hidden bg-slate-50 min-h-screen ">
        <div className={`${styles.paddingX} ${styles.flexCenter}`}>
          <div className={`${styles.boxWidth}`}>
            <Navbar />
          </div>
        </div>
        <div style={{ width: '100%', height: '375px', position: 'relative' }}>
      <Image
          src={require("../app/assets/logo/Rectangle_5.png")}
        alt="Description of the image"
        layout="fill" // Ensures the image fills the container
        objectFit="cover" // Makes the image cover the full container
        priority={true} // If you want the image to be loaded with high priority
      />
    </div>
        {/* <Image
          // className="w-full h-80 self-center"
          src={require("../app/assets/logo/Rectangle_5.png")}
          alt="Logo"
          width={1400}
          height={100}
        /> */}

        <div className="flex flex-col justify-center items-center ml-20 mr-20 mt-5 ">
          <main className="text-center">
            <h1 className="font-semibold font-poppins text-neutral-800 text-3xl mb-2">
              An automated, multi-asset portfolio tracker
            </h1>
            <h6 className="font-light font-poppins text-lg text-neutral-500 ml-20 mr-20 ">
              The investment management platform is a standalone web application
              designed to provide users with comprehensive tools to manage and
              analyze their investments. It will integrate with financial data
              providers to fetch real-time data for stocks and mutual funds.
            </h6>
          </main>
        </div>

        <div className="flex flex-col md:flex-row mx-4 md:mx-20 mt-5">
          <div className="w-full md:w-1/2 flex flex-col space-y-4 p-4">
            {/* First item */}
            <div className="flex items-center border border-gray-150 group hover:border-fuchsia-950 p-5 h-24 rounded-lg">
              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mr-4">
                <Image
                  src={require("./assets/logo/Vector.png")}
                  alt="Example"
                  width={40}
                  height={40}
                />
              </div>
              <span className="font-poppins font-semibold text-left text-black group-hover:text-fuchsia-950 text-sm">
                Manage and track multiple asset classes
              </span>
            </div>

            {/* Second item */}
            <div className="flex items-center border border-gray-150 group hover:border-fuchsia-950 p-5 h-24 rounded-lg">
              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mr-4">
                <Image
                  src={require("./assets/logo/Import_export.png")}
                  alt="Example"
                  width={40}
                  height={40}
                />
              </div>
              <span className="font-poppins font-semibold text-left text-black group-hover:text-fuchsia-950 text-sm">
                Auto-import data from 5,000+ formats across 700+ brokers
              </span>
            </div>

            {/* Third item */}
            <div className="flex items-center border border-gray-150 group hover:border-fuchsia-950 p-5 h-24 rounded-lg">
              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mr-4">
                <Image
                  src={require("./assets/logo/Addchart.png")}
                  alt="Example"
                  width={40}
                  height={40}
                />
              </div>
              <span className="font-poppins font-semibold text-left text-black group-hover:text-fuchsia-950 text-sm">
                Gain portfolio insights with analytical and performance reports
              </span>
            </div>
            {/* Fourth item */}
            <div className="flex items-center border border-gray-150 group hover:border-fuchsia-950 p-5 h-24 rounded-lg">
              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mr-4">
                <Image
                  src={require("./assets/logo/Trending_up.png")}
                  alt="Example"
                  width={40}
                  height={40}
                />
              </div>
              <span className="font-poppins font-semibold text-left text-black group-hover:text-fuchsia-950 text-sm">
                Get Capital Gains in fetch real-time data for stocks and mutual
                funds
              </span>
            </div>
          </div>

          {/* Second column */}
          <div className="w-full md:w-1/2  md:ml-20 m-4 md:m-5 align-middle">
            <Image
              src={require("./assets/logo/DemoImg.png")} // Path to your image file
              alt="Full Width Example"
              layout="responsive" // Ensures the image takes the full width of the div
              width={400} // Set a base width (responsive will handle scaling)
              height={200} // Set a base height
              className="rounded-lg" // Optional rounded corners
            />
            <p className="font-poppins text-left text-gray-700 text-sm mt-1 font-normal">
              Track all your assets from one place efficiently. Our platform
              allows you to manage multiple asset classes with ease and provides
              insights on your portfolio performance.
            </p>
            
          </div>
        </div>
        <div className="w-full bg-[#5E2751] h-64 mb-5 p-2 ">
        <div className="flex flex-col justify-center items-center ml-20 mr-20 mt-5 ">
          <main className="text-center">
            <h1 className="font-semibold font-poppins text-white text-3xl mb-2">
            Built for Investors and Wealth Professionals
            </h1>
            <h6 className="font-light font-poppins text-lg text-white ml-20 mr-20 ">
            Wide range of products for your financial planning
            </h6>
          </main>
        </div>
        </div>
        <Logo/>
      </div>
    </>
  );
};

export default App;
