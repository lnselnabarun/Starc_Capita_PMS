// Modal.jsx
"use client";
import React, {  useRef, useEffect } from "react";
import Image from "next/image";

const Modal = ({
  showModal,
  setShowModal,
  handleSubmit,
  handleChange,
  formData,
}) => {
  const modalRef = useRef();

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setShowModal(false);
    }
  };

  useEffect(() => {
    if (showModal) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showModal]);

  return (
    <>
      {showModal && (
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
    <div
      ref={modalRef}
      className="relative flex flex-col md:flex-row w-full max-w-lg md:max-w-2xl h-96 bg-white rounded-lg shadow-lg" // Adjusted for responsiveness
    >
      {/* Left side image */}
      <div className="w-full md:w-1/4 h-40 md:h-auto relative">
        <Image
          src={require("../../assets/logo/Rectangle_5.png")}
          alt="Left side image"
          layout="fill" // Makes the image fill the container
          objectFit="cover" // Ensures the image covers the entire container
          className="rounded-t-lg md:rounded-l-lg md:rounded-tr-none"
        />
      </div>

      {/* Right side content */}
      <div className="w-full md:w-3/4 bg-white p-6 rounded-b-lg md:rounded-r-lg relative">
        {/* <div
          onClick={() => setShowModal(false)}
          className="absolute top-4 right-4 cursor-pointer"
        >
          <img
            alt="close"
            src={close}
            className="w-[20px] h-[20px] object-contain"
          />
        </div> */}

        {/* Header */}
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-left">
          Join Us
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Email input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Mobile / Email
              </label>
              <input
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password input (Secure Entry) */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={8} // Optional: Enforce minimum password length
              />
            </div>
          </div>

          {/* Submit Button and Forgot Password Link */}
          <div className="mt-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Submit button */}
            <button
              className={`py-2 px-6 font-poppins font-semibold text-[15px] text-primary outline-none bg-fuchsia-900 rounded-full flex hover:bg-fuchsia-700 transition-colors`}
              type="submit"
            >
              Submit
            </button>

            {/* Forgot password text */}
            <p className="text-fuchsia-950 font-semibold text-sm cursor-pointer">
              Forgot your password?
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
)}
    </>
  );
};

export default Modal;
