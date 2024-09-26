"use client";
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Image from "next/image";
import Modal from "../components/common/Modal";

const SignUp = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null); // Track selected radio button
  const [formData, setFormData] = useState({
    phoneNumber: "",

    password: "", // Add the password field
  });
  const handleRadioChange = (event) => {
    setSelectedOption(event?.target?.value); // Update selected option
  };
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
  console.log(showModal, formData, "Hero not in view");

  return (
    <>
      <div className="bg-primary w-full overflow-hidden bg-white min-h-screen">
        {/* Navbar */}
        <div className="sm:px-16 px-6 flex justify-center items-center relative">
          <div className="xl:max-w-[1280px] w-full">
            <Navbar onpress={handleOpenModal} />
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <Modal
            showModal={showModal}
            setShowModal={setShowModal}
            handleSubmit={handleChange}
            handleChange={handleChange}
            formData={formData}
          />
        )}

        {/* Content container */}
        <div className="inset-0 flex flex-col md:flex-row  z-50 bg-opacity-50">
          {/* Left side image with text overlay */}
          <div className="w-full md:w-2/4 h-32 sm:h-40 md:h-60 lg:h-full relative">
            <Image
              src={require("../../app/assets/logo/Rectangle_6.png")}
              alt="Left side image"
              objectFit="cover"
              className="rounded-t-lg md:rounded-l-lg md:rounded-tr-none w-full h-full"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>

            {/* Text over the image */}
            <div className="absolute bottom-4 left-4 bg-opacity-60 text-white p-2 rounded">
              <p className="font-semibold text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl p-1">
                Manage your family
              </p>
              <p className="font-semibold text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl p-1">
                investments with
              </p>
              <p className="font-semibold text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl p-1">
                STARK CAPITAL
              </p>
            </div>
          </div>

          {/* Right side content */}
          <div className="w-full md:w-2/3 bg-white px-6 rounded-b-lg md:rounded-r-lg relative">
            {/* Header */}
            <h2 className="text-4xl font-bold mb-4 text-gray-800 text-center md:text-left">
              Sign Up
            </h2>

            {/* Form */}
            <form
              onSubmit={() => {
                if (
                  formData?.phoneNumber?.length >= 10 &&
                  formData?.password.length >= 8
                ) {
                  setotpSectionVisible(true);
                } else null;
              }}
            >
              <div className="">
                {/* Mobile input */}

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    className="mt-2 p-2 block w-full border border-gray-300 focus:border-fuchsia-950 rounded-md shadow-sm focus:ring-offset-fuchsia-950 focus:ring-2 focus:ring-fuchsia-950 sm:text-sm text-black"
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    PAN number
                  </label>
                  <input
                    className="mt-2 p-2 block w-full border border-gray-300 focus:border-fuchsia-950 rounded-md shadow-sm focus:ring-offset-fuchsia-950 focus:ring-2 focus:ring-fuchsia-950 sm:text-sm text-black"
                    type="text"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength={8}
                  />
                </div>

                <div className="mt-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Mobile Number
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                      type="tel"
                      name="Mobile number"
                      id="tel"
                      className="mt-2 p-2 block w-full border focus:border-fuchsia-950 rounded-md shadow-sm focus:ring-offset-fuchsia-950 focus:ring-2 focus:ring-fuchsia-950 sm:text-sm text-black"
                      placeholder="Enter your Mobile number"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center">
                      <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-black "
                        onClick={handleChange}
                      >
                        OTP Verify
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                      type="email"
                      name="Email"
                      id="Email"
                      className="mt-2 p-2 block w-full border focus:border-fuchsia-950 rounded-md shadow-sm focus:ring-offset-fuchsia-950 focus:ring-2 focus:ring-fuchsia-950 sm:text-sm text-black"
                      placeholder="Enter your Email"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center">
                      <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-black "
                        onClick={handleChange}
                      >
                        OTP Verify
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Select Family
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                      type="text"
                      name="text"
                      id="text"
                      className="mt-2 p-2 block w-full border focus:border-fuchsia-950 rounded-md shadow-sm focus:ring-offset-fuchsia-950 focus:ring-2 focus:ring-fuchsia-950 sm:text-sm text-black"
                      placeholder="Enter your family"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center">
                      <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-black "
                        onClick={handleChange}
                      >
                        ▼
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mt-4">
                    Password
                  </label>
                  <input
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength={8}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mt-4">
                    Confirm Password
                  </label>
                  <input
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength={8}
                  />
                </div>
              </div>

              <div className="flex items-center mt-3">
                {/* Radio Button Group */}
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="customRadio"
                    value="option1"
                    className={`w-5 h-5 appearance-none border border-gray-400 rounded-md focus:ring-0 ${
                      selectedOption === "option1"
                        ? "bg-[#5E2751]"
                        : "bg-gray-200"
                    }`}
                    onChange={handleRadioChange}
                  />
                  <span className="text-gray-700 text-sm font-normal font-sans ml-2">
                    I Accept
                  </span>
                </label>

                <label className="flex items-center space-x-1">
                  <span className="text-gray-700 text-sm font-semibold font-sans ml-1 uppercase">
                    Stark Capital
                  </span>
                </label>

                <label className="flex items-center space-x-1">
                  <span className="text-gray-700 text-sm font-normal font-sans underline ml-1">
                    {" "}
                    Terms of Use and Privacy Policy
                  </span>
                </label>
              </div>

              {/* Submit Button and Forgot Password Link */}
              <div className="mt-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                {/* Submit button */}
                <button
                  className="py-3 px-6 font-poppins font-semibold text-[15px] text-primary outline-none bg-fuchsia-900 rounded-full flex hover:bg-fuchsia-700 transition-colors text-white"
                  type="submit"
                >
                  Get Start
                </button>

                {/* Forgot password text */}
                <div className="flex items-center mt-3">
                  {/* Radio Button Group */}
                  <label className="flex items-center space-x-2">
                    <p className="text-gray-500 font-semibold text-sm cursor-pointer">
                      Already have account?
                    </p>
                  </label>

                  <label className="flex items-center space-x-1">
                    <p className="text-fuchsia-950 font-semibold text-sm cursor-pointer mx-1">
                      Login
                    </p>
                  </label>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
