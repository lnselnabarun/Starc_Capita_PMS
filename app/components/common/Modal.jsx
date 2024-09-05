// Modal.jsx
import React, { useState, useRef, useEffect } from "react";
import { close } from "../../assets";

const Modal = ({
  showModal,
  setShowModal,
  children,
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
      <div
        ref={modalRef}
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 shadow-md rounded-lg p-8 w-96 bg-gray-800"
      >
        <div
          onClick={() => setShowModal(false)}
          className=" flex flex-1 justify-end items-center"
        >
          <img
            alt="menu"
            src={close}
            className="w-[25px] h-[25px] object-contain"
            onClick={() => setToggle((prev) => !prev)}
          />
        </div>

        <div className="modal-content">
          <h2 className="text-2xl font-bold mb-4 text-indigo-500 text-center">
            Fill For Join Us
          </h2>
          <form onSubmit={handleSubmit}>
            <label className="block mb-4">
              <span className="text-indigo-300">Name:</span>
              <input
                className="border border-gray-300 px-3 py-2 w-full mt-1"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </label>
            <label className="block mb-4">
              <span className="text-indigo-300">Phone Number:</span>
              <input
                className="border border-gray-300 px-3 py-2 w-full mt-1"
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </label>
            <label className="block mb-4">
              <span className="text-indigo-300">Email:</span>
              <input
                className="border border-gray-300 px-3 py-2 w-full mt-1"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </label>
            <div className=" justify-center items-center flex">
              <button
                className="bg-indigo-500 text-white px-4 py-2 rounded hover:indigo-500 focus:outline-none focus:shadow-outline-green"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
        {children}
      </div>
    </>
  );
};

export default Modal;
