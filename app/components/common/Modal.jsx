"use client";
import React, { useRef, useEffect, useState } from "react";
import { Loader } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";

const INITIAL_OTP_STATE = ["", "", "", ""];

const Modal = ({ showModal, setShowModal, handleChange, formData }) => {
  const modalRef = useRef();
  const inputRef0 = useRef(null);
  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);
  const inputRef3 = useRef(null);
  const inputRefs = [inputRef0, inputRef1, inputRef2, inputRef3];
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [Latestotp, setLatestotp] = useState("");
  const [newPassword, SetnewPassword] = useState("");
  const [confirmPassword, SetconfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [modalState, setModalState] = useState({
    showOtpSection: false,
    showForgotPassword: false,
    showForgotPasswordOtp: false,
    showResetPassword: false,
  });
  const [otp, setOtp] = useState(INITIAL_OTP_STATE);
  // const inputRefs = Array(4)
  //   .fill(null)
  //   .map(() => useRef(null));

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setShowModal(false);
      }
    };

    if (showModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showModal, setShowModal]);

  useEffect(() => {
    if (modalState.showForgotPasswordOtp) {
      inputRefs[0].current?.focus();
    }
  }, [modalState.showForgotPasswordOtp]);

  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    if (element.value !== "" && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const requestBody = {
      phoneno: formData?.phoneNumber,
      password: formData?.password,
    };
    try {
      const response = await axios.post(
        "https://dev.netrumusa.com/starkcapital/api-backend/login",
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response?.data?.message === "Login successful") {
        localStorage.setItem(
          "myData",
          JSON.stringify(response.data?.data?.token)
        );
        localStorage.setItem(
          "email",
          JSON.stringify(response.data?.data?.email)
        );
        router.push("/Dashboard");
      } else {
        setError(
          response.data?.message || "Registration failed. Please try again."
        );
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Registration failed. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };
  const validatePasswords = () => {
    // Reset errors
    setPasswordError("");
    setError("");

    // Check if passwords are empty
    if (!newPassword || !confirmPassword) {
      setPasswordError("Both password fields are required");
      return false;
    }

    // Check minimum length
    if (newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      return false;
    }

    // Check if passwords match
    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return false;
    }

    return true;
  };
  const ChangePassword = async (e) => {
    e.preventDefault();

    // Validate passwords before submission
    if (!validatePasswords()) {
      return;
    }

    setLoading(true);
    setError(null);

    const requestBody = {
      mobile_no: formData?.phoneNumber,
      new_password: newPassword,
    };

    try {
      const response = await axios.post(
        "https://dev.netrumusa.com/starkcapital/api-backend/changePassword",
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response?.data?.status === "success") {
        // Password changed successfully
        resetModalState();
        // You might want to show a success message
        setShowModal(false);
      } else {
        setError(
          response.data?.message || "Password change failed. Please try again."
        );
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Password change failed. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  const resetModalState = () => {
    setModalState({
      showOtpSection: false,
      showForgotPassword: false,
      showForgotPasswordOtp: false,
      showResetPassword: false,
    });
  };

  const handleSendNewPassword = async (e) => {
    e.preventDefault();
    const requestBody = {
      mobile_no: formData?.phoneNumber,
    };
    try {
      const response = await axios.post(
        "https://dev.netrumusa.com/starkcapital/api-backend/forgot-password",
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response?.data?.status === "success") {
        setLatestotp(response?.data?.otp);
        setModalState((prev) => ({
          ...prev,
          showForgotPassword: false,
          showForgotPasswordOtp: true,
        }));
      } else {
        setError(
          response.data?.message || "Registration failed. Please try again."
        );
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Registration failed. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };
  const handleVerifyOtp = async () => {
    const requestBody = {
      mobile_no: formData?.phoneNumber,
      otp: otp.join(""),
    };
    try {
      const response = await axios.post(
        "https://dev.netrumusa.com/starkcapital/api-backend/verifyOtp",
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response?.data?.status === "success") {
        // setLatestotp(response?.data?.otp);
        setModalState((prev) => ({
          ...prev,
          showForgotPasswordOtp: false,
          showResetPassword: true,
        }));
      } else {
        setError(
          response.data?.message || "Registration failed. Please try again."
        );
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Registration failed. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  const renderLoginForm = () => (
    <form onSubmit={handleLogin}>
      <h2 className="text-2xl font-bold mb-3 text-gray-800">Login</h2>
      <div className="space-y-4">
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
            pattern="[0-9]{10}"
          />
        </div>

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
            minLength={8}
          />
        </div>
      </div>

      <div className="mt-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <button
          disabled={loading}
          className="py-2 px-6 font-poppins font-semibold text-[15px] text-white outline-none bg-fuchsia-900 rounded-full flex hover:bg-fuchsia-700 transition-colors disabled:bg-fuchsia-300"
          type="submit"
        >
          {loading ? <Loader size={20} className="animate-spin" /> : "Submit"}
        </button>

        <button
          type="button"
          onClick={() =>
            setModalState((prev) => ({ ...prev, showForgotPassword: true }))
          }
          className="text-fuchsia-950 font-semibold text-sm cursor-pointer"
        >
          Forgot your password?
        </button>
      </div>
    </form>
  );

  const renderForgotPasswordForm = () => (
    <form onSubmit={handleSendNewPassword}>
      <h2 className="text-2xl font-bold mb-3 text-gray-800">
        Forgot Password?
      </h2>
      <div className="space-y-2">
        <p className="text-sm text-gray-700">Enter your Phone number, and</p>
        <p className="text-sm text-gray-700 mb-4">
          we'll give you reset instructions.
        </p>

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
            pattern="[0-9]{10}"
          />
        </div>
      </div>

      <div className="mt-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <button
          type="submit"
          className="py-2 px-6 font-poppins font-semibold text-[15px] text-white outline-none bg-fuchsia-900 rounded-full hover:bg-fuchsia-700 transition-colors"
        >
          Send New Password
        </button>

        <button
          type="button"
          onClick={resetModalState}
          className="text-gray-600 hover:text-fuchsia-950"
        >
          <span className="font-medium">Back to </span>
          <span className="font-semibold text-fuchsia-950">Login</span>
        </button>
      </div>
    </form>
  );

  const renderOtpSection = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">
        Enter Verification Code
      </h2>
      <p className="text-sm text-gray-600">
        A SMS sent to {formData?.phoneNumber}
      </p>

      <div className="flex space-x-4 justify-center">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={inputRefs[index]}
            type="text"
            value={digit}
            onChange={(e) => handleOtpChange(e.target, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="w-16 h-16 text-2xl text-center border-2 border-gray-300 rounded-lg focus:border-fuchsia-950 focus:outline-none text-black font-semibold"
            maxLength={1}
          />
        ))}
      </div>

      <div className="flex justify-center gap-2 text-sm">
        <span className="text-gray-600">Didn't receive the OTP?</span>
        <button
          onClick={handleSendNewPassword}
          type="button"
          className="text-fuchsia-950 font-semibold"
        >
          RESEND OTP
        </button>
      </div>

      {Latestotp !== "" ? (
        <h2 className="text-l font-bold mb-3 text-green-800 items-center justify-center">
          {`Your OTP - ${Latestotp}`}
        </h2>
      ) : null}

      <div className="mt-6 flex justify-center">
        <button
          onClick={handleVerifyOtp}
          className="py-2 px-6 font-poppins font-semibold text-[15px] text-white outline-none bg-fuchsia-900 rounded-full hover:bg-fuchsia-700 transition-colors"
        >
          Verify OTP
        </button>
      </div>
    </div>
  );

  const renderResetPasswordForm = () => (
    <form onSubmit={ChangePassword}>
      <h2 className="text-2xl font-bold mb-3 text-gray-800">Reset Password</h2>

      {passwordError && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {passwordError}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            New Password
          </label>
          <input
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
            type="password"
            name="newPassword"
            required
            value={newPassword}
            onChange={(e) => {
              SetnewPassword(e.target.value);
              setPasswordError(""); // Clear error on change
            }}
            minLength={8}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
            type="password"
            name="confirmPassword"
            required
            value={confirmPassword}
            onChange={(e) => {
              SetconfirmPassword(e.target.value);
              setPasswordError(""); // Clear error on change
            }}
            minLength={8}
          />
        </div>
      </div>

      <div className="mt-6 flex justify-between items-center">
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className="py-2 px-6 font-poppins font-semibold text-[15px] text-white outline-none bg-fuchsia-900 rounded-full hover:bg-fuchsia-700 transition-colors disabled:bg-fuchsia-300"
          >
            {loading ? (
              <Loader size={20} className="animate-spin" />
            ) : (
              "Continue"
            )}
          </button>
          <button
            type="button"
            onClick={resetModalState}
            className="py-2 px-6 font-poppins font-semibold text-[15px] text-fuchsia-950 outline-none bg-white rounded-full border border-fuchsia-950 hover:bg-fuchsia-50 transition-colors"
          >
            Cancel
          </button>
        </div>

        <button
          type="button"
          onClick={resetModalState}
          className="text-gray-600 hover:text-fuchsia-950"
        >
          <span className="font-medium">Back to </span>
          <span className="font-semibold text-fuchsia-950">Login</span>
        </button>
      </div>
    </form>
  );

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div
        ref={modalRef}
        className="relative flex flex-col md:flex-row w-full max-w-2xl bg-white rounded-lg shadow-lg h-96"
      >
        <div className="w-full md:w-1/4 h-40 md:h-auto relative">
          <Image
            src={require("../../assets/logo/Rectangle_6.png")}
            alt="Login background"
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg md:rounded-l-lg md:rounded-tr-none"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40" />
        </div>

        <div className="w-full md:w-3/4 bg-white p-6 rounded-b-lg md:rounded-r-lg">
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}

          {modalState.showForgotPasswordOtp
            ? renderOtpSection()
            : modalState.showForgotPassword
            ? renderForgotPasswordForm()
            : modalState.showResetPassword
            ? renderResetPasswordForm()
            : renderLoginForm()}
        </div>
      </div>
    </div>
  );
};

export default Modal;
