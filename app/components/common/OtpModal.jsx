// Modal.jsx
"use client";
import React, {  useRef, useEffect, useState } from "react";

const OtpModal = ({
  showModal,
  setShowModal,
}) => {
  const modalRef = useRef();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const handleChangeForOtp = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus next input
    if (element.value !== "") {
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
    inputRefs[0].current?.focus();
  }, []);

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
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Enter OTP</h2>
        <div className="flex space-x-2 sm:space-x-4">
          {otp?.map((data, index) => (
            <input
              key={index}
              type="text"
              ref={inputRefs[index]}
              value={data}
              onChange={(e) => handleChangeForOtp(e.target, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-12 sm:w-16 sm:h-16 text-2xl text-center border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
              maxLength={1}
            />
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default OtpModal;
