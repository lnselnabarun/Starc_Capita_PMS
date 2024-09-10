// Modal.jsx
"use client";
import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";

const Modal = ({
  showModal,
  setShowModal,
  handleChange,
  formData,
  router
}) => {
  const modalRef = useRef();
  const [otpSectionVisible, setotpSectionVisible] = useState(false);
  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setShowModal(false);
    }
  };
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  useEffect(() => {
    inputRefs[0].current?.focus();
  }, []);
  console.log(formData, "formDataformDataformData");
  const handleChangeOTP = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp?.map((d, idx) => (idx === index ? element?.value : d))]);

    // Focus next input
    if (element?.value !== "") {
      if (index < 3) {
        inputRefs[index + 1].current?.focus();
      }
    }
  };
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
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

  const handleClick = () => {
    // Navigate to the desired page
    setShowModal(false)
    router.push('/Dashboard');
  };

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
                src={require("../../assets/logo/Rectangle_6.png")}
                alt="Left side image"
                layout="fill" // Makes the image fill the container
                objectFit="cover" // Ensures the image covers the entire container
                className="rounded-t-lg md:rounded-l-lg md:rounded-tr-none"
              />
               <div className="absolute inset-0 bg-black bg-opacity-40"></div>
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
              <h2 className="text-2xl font-bold mb-3 text-gray-800 text-left">
                Login
              </h2>
              {otpSectionVisible === false ? (
                <form
                // onClick={() => {
                //   if (
                //     formData?.phoneNumber?.length >= 10 &&
                //     formData?.password >= 8
                //   ) {
                //     setotpSectionVisible(true);
                //   } else {
                //     setShowModal(true);
                //   };
                // }}
                  onSubmit={() => { setotpSectionVisible(true) }}
                >
                  <div className="space-y-4">
                    {/* Email input */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Mobile
                      </label>
                      <input
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
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
              ) : (
                <>
                  <label className="block text-sm font-semibold text-gray-700">
                    Enter Verification code
                  </label>
                  <label className="block text-sm font-medium text-[#484848] mt-2">
                    {`We are automatically detecting a SMS`}
                  </label>
                  <label className="block text-sm font-medium text-[#484848] mb-2">
                    {`send to your mobile Number ${formData?.phoneNumber}`}
                  </label>

                  <div className="flex space-x-2 sm:space-x-4">
                    {otp?.map((data, index) => (
                      <input
                        key={index}
                        type="text"
                        ref={inputRefs[index]}
                        value={data}
                        onChange={(e) => handleChangeOTP(e.target, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        className="w-12 h-12 sm:w-16 sm:h-16 text-2xl text-center border-2 border-gray-300 rounded-lg focus:border-x-fuchsia-950 focus:outline-none transition-colors text-black"
                        maxLength={1}
                      />
                    ))}
                  </div>
                  <div className="flex w-full max-w-md mx-auto my-2">
                    <span className="text-[#484848] font-medium text-sm font-serif ">
                      Dont receive the OTP?{" "}
                    </span>
                    <span className="text-[#5E2751] font-semibold text-sm font-serif ml-1 ">
                      RESEND OTP
                    </span>
                  </div>
                  {/* Submit Button and Forgot Password Link */}
                  <div className="mt-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    {/* Submit button */}
                    <button
                      onClick={handleClick}
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
                </>
              )}
              {/* Form */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
