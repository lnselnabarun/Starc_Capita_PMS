"use client";
import React, { useState } from "react";
import styles from "./constant/style";
import { Navbar } from "./components";
import Image from "next/image";
import Logo from "./components/common/logo";
import Modal from "./components/common/Modal";
import Link from "next/link";
import { useRouter } from "next/navigation";

const App = () => {
  const [showModal, setShowModal] = useState(false);

  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    password: "", // Add the password field
  });
  const links = [
    {
      id: "/",
      title: "Home",
    },
    {
      id: "/",
      title: "About",
    },
    {
      id: "/",
      title: "Contact US",
    },
    {
      id: "/",
      title: "Terms of Use",
    },
    {
      id: "/",
      title: "Features",
    },
    {
      id: "SignUp",
      title: "Sign Up",
    },
    {
      id: "/",
      title: "Reviews",
    },
    {
      id: "/",
      title: "Privacy Policy",
    },
  ];
  const firstColumn = links.slice(0, 4);
  const secondColumn = links.slice(4);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e?.target?.name]: e?.target?.value,
    });
  };

  // const handleOpenModal = () => {
  //   setShowModal(!showModal);
  // };

  const handleOpenModal = () => {
    setShowModal(!showModal);
  };
  console.log(showModal, "Hero not in view");

  const Card = ({ src, alt, header, description }) => (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 bg-white rounded-lg shadow-lg overflow-hidden flex flex-col items-center p-2">
      <div className="relative w-full h-40 lg:h-48 xl:h-56">
        <Image
          src={src}
          alt={alt}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
        />
      </div>
      <div className="p-3 text-center flex flex-col justify-center">
        <h3 className="font-semibold text-sm lg:text-base mb-2 text-black">
          {header}
        </h3>
        <p className="text-gray-700 text-xs lg:text-sm">{description}</p>
        <p className="text-fuchsia-950 text-xs lg:text-sm">Learn more</p>
      </div>
    </div>
  );

  return (
    <>
      <div className="bg-primary w-full overflow-hidden bg-slate-50 min-h-screen ">
        <div className={`${styles.paddingX} ${styles.flexCenter}`}>
          <div className={`${styles.boxWidth}`}>
            <Navbar onpress={handleOpenModal} />
          </div>
        </div>
        <div className="relative w-full h-[380px]">
          <Image
            src={require("../app/assets/logo/Rectangle_5.png")}
            alt="Description of the image"
            layout="fill"
            objectFit="cover"
            priority={true}
            className="filter " // Add blur effect
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          <div className="absolute top-0 left-24 w-1/2 h-full flex flex-col justify-center items-start">
            <div className="">
              <div className="flex items-center mb-2">
                <p className="mr-2 text-xl font-bold text-white">Model</p>
                <p className="mr-2 text-xl font-bold text-[#EFA1DD]">
                  Portfolios
                </p>
              </div>
              <h1 className="text-2xl md:text-4xl font-bold mb-1 text-white">
                Ready-made portfolios
              </h1>
              <h1 className="text-2xl md:text-4xl font-bold mb-3 text-white">
                to fit your investment goals
              </h1>

              <p className="font-poppins text-left text-white text-lg font-normal">
                You can now invest directly in Model Portfolio stocks
              </p>
              <p className="font-poppins text-left text-[#EFA1DD] text-lg font-bold mb-3">
                How it works?
              </p>

              <button
                onClick={() => {}}
                type="button"
                className={`py-2 px-6 font-poppins font-semibold text-[15px] text-primary outline-none bg-fuchsia-900 rounded-full flex hover:bg-fuchsia-700 transition-colors text-white`}
              >
                Know More
              </button>
            </div>
          </div>
        </div>
        {showModal && (
          <Modal
            showModal={showModal}
            setShowModal={setShowModal}
            handleSubmit={handleChange}
            handleChange={handleChange}
            formData={formData}
            router={router}
          />
        )}

        <div className="flex flex-col justify-center items-center px-4 md:px-20 mt-10">
          <main className="text-center">
            <h1 className="font-semibold font-poppins text-neutral-800 text-2xl sm:text-3xl mb-4">
              An automated, multi-asset portfolio tracker
            </h1>
            <h6 className="font-light font-poppins text-base sm:text-lg text-neutral-500 mx-4 sm:mx-20">
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
        <div className="w-full bg-[#5E2751] h-auto mb-5 p-2">
          <div className="flex flex-col justify-center items-center ml-5 mr-5 mt-5">
            <main className="text-center mb-5">
              <h1 className="font-semibold font-poppins text-white text-3xl mb-2">
                Built for Investors and Wealth Professionals
              </h1>
              <h6 className="font-light font-poppins text-lg text-white mx-5">
                Wide range of products for your financial planning
              </h6>
            </main>

            {/* Card Container */}
            <div className="flex flex-wrap justify-center gap-10 p-6">
              {/* Card 1 */}
              <Card
                src={require("./assets/logo/Trader.png")}
                alt="Model Portfolios"
                header="Model Portfolios"
                description="Description for the first card goes here. It provides an overview of the card's content."
              />

              {/* Card 2 */}
              <Card
                src={require("./assets/logo/Trader1.png")}
                alt="Investors"
                header="Investors"
                description="Ready-made Stocks & Mutual Funds Portfolios"
              />

              {/* Card 3 */}
              <Card
                src={require("./assets/logo/Trader2.png")}
                alt="Family Offices"
                header="Family Offices"
                description="Ready-made Stocks & Mutual Funds Portfolios"
              />

              {/* Card 4 */}
              <Card
                src={require("./assets/logo/Trader3.png")}
                alt="Fund Meter"
                header="Fund Meter"
                description="Ready-made Stocks & Mutual Funds Portfolios"
              />
            </div>
          </div>
        </div>
        <div className=" justify-center items-center flex flex-col ">
          <Logo />
        </div>
        <footer className="py-4 px-4 md:px-8 ">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 border-t-[1px] border-b-[1px] border-dashed border-gray-500 py-3 ">
            <div>
              <h3 className="font-bold text-lg mb-4 text-black">Quick Links</h3>
              <div className="flex flex-col md:flex-row gap-4">
                {/* First Column */}
                <div className="flex-1">
                  {firstColumn.map((item, index) => (
                    <Link key={index} href={item?.id} passHref>
                      <p className="mb-2 font-medium text-[#484848] font-sans text-sm">
                        {item?.title}
                      </p>
                    </Link>
                  ))}
                </div>

                {/* Second Column */}

                <div className="flex-1">
                  {secondColumn.map((item, index) => (
                    <Link key={index} href={item?.id} passHref>
                      <p className="mb-2 font-medium text-[#484848] font-sans text-sm">
                        {item?.title}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4 text-black">
                Our Services
              </h3>
              <ul className="space-y-2">
                {[
                  "Portfolio Management System",
                  "Research on Stock Market",
                ].map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="mb-2 font-medium text-[#484848] font-sans text-sm"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4 text-black">Contact Us</h3>
              <a
                href="mailto:support@starkridgepaper.com"
                className="text-gray-600 mb-2 flex items-center"
              >
                <Image
                  src={require("../app/assets/logo/Vector_email.png")}
                  alt="Email icon"
                  width={16} // Set your preferred width
                  height={16} // Set your preferred height
                  className="mr-2" // Add margin to the right for spacing
                />
                <span className="font-bold text-[#484848] font-sans text-sm">
                  support@starkridgepaper.com
                </span>
              </a>
              <a
                href="tel:+919051460600"
                className="text-gray-600 mb-2 flex items-center"
              >
                <Image
                  src={require("../app/assets/logo/Phone.png")}
                  alt="Phone icon"
                  width={16} // Set your preferred width
                  height={16} // Set your preferred height
                  className="mr-2" // Add margin to the right for spacing
                />
                <span className="font-bold text-[#484848] font-sans text-sm">
                  +91 9051460600 / 9007399454
                </span>
              </a>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-500 text-sm ">
            Copyright © {new Date().getFullYear()} - All Rights Reserved - LNSEL
          </div>
        </footer>
      </div>
    </>
  );
};

export default App;
