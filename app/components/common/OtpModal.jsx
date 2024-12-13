"use client";
import React, { useRef, useEffect, useState, useCallback, useMemo } from "react";

const OtpModal = ({ showModal, setShowModal }) => {
  const modalRef = useRef();
  const [otp, setOtp] = useState(["", "", "", ""]);
  
  // Create refs first
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  
  // Then memoize the array of refs
  const inputRefs = useMemo(() => [ref1, ref2, ref3, ref4], []);

  const handleChangeForOtp = useCallback((element, index) => {
    if (isNaN(element.value)) return false;

    setOtp(prevOtp => {
      const newOtp = [...prevOtp];
      newOtp[index] = element.value;
      return newOtp;
    });

    // Focus next input
    if (element.value !== "" && index < 3) {
      const nextInput = inputRefs[index + 1]?.current;
      nextInput?.focus();
    }
  }, [inputRefs]);

  const handleKeyDown = useCallback((e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = inputRefs[index - 1]?.current;
      prevInput?.focus();
    }
  }, [otp, inputRefs]);

  // Initial focus effect
  useEffect(() => {
    if (showModal) {
      const firstInput = inputRefs[0]?.current;
      firstInput?.focus();
    }
  }, [showModal, inputRefs]);

  // Click outside handler
  const handleClickOutside = useCallback((e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setShowModal(false);
    }
  }, [setShowModal]);

  // Event listener effect
  useEffect(() => {
    if (showModal) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [showModal, handleClickOutside]);

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div 
        ref={modalRef}
        className="p-6 bg-white rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Enter OTP</h2>
        <div className="flex space-x-2 sm:space-x-4">
          {otp.map((data, index) => (
            <input
              key={index}
              type="text"
              ref={inputRefs[index]}
              value={data}
              onChange={(e) => handleChangeForOtp(e.target, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-12 sm:w-16 sm:h-16 text-2xl text-center border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
              maxLength={1}
              inputMode="numeric"
              pattern="\d*"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OtpModal;