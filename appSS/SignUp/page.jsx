"use client";
import React, { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Modal from "../components/common/Modal";
import OtpVerifyModalSignUp from "../Dashboard_Components/OtpVerifyModalSignUp";
import axios from "axios";
import { Loader } from "lucide-react";

const SignUp = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [otpType, setOtpType] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [FamilyData, setFamilyData] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    pan_no: "",
    mobile_no: "",
    email: "",
    family: "",
    password: "",
    confirm_password: "",
    familId: "", // Using consistent naming
  });

  const validateForm = useCallback(() => {
    const newErrors = {};

    // Required field validation
    if (!formData.name.trim()) newErrors.name = "Full Name is required";
    if (!formData.pan_no.trim()) newErrors.pan_no = "PAN Number is required";
    if (!formData.mobile_no.trim())
      newErrors.mobile_no = "Mobile Number is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.family.trim()) newErrors.family = "Family is required";
    if (!formData.password.trim()) newErrors.password = "Password is required";
    if (!formData.confirm_password.trim())
      newErrors.confirm_password = "Confirm Password is required";

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData?.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    // Mobile number validation
    const mobileRegex = /^[0-9]{10}$/;
    if (formData.mobile_no && !mobileRegex.test(formData.mobile_no)) {
      newErrors.mobile_no = "Invalid mobile number format";
    }

    // PAN validation
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (formData.pan_no && !panRegex.test(formData.pan_no)) {
      newErrors.pan_no = "Invalid PAN number format";
    }

    // Password validation
    if (formData.password && formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }

    // Confirm password validation
    if (formData.password !== formData.confirm_password) {
      newErrors.confirm_password = "Passwords do not match";
    }

    setErrors(newErrors);

    // Return true if there are no errors
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleOTPVerifyClick = (type) => {
    setOtpType(type);
    setShowOTPModal(true);
  };
  const handleOTPVerify = (otp) => {
    setOtp("");
    // Here you would typically send the OTP to your backend for verification
    // For now, we'll just close the modal
    setShowOTPModal(false);
  };

  const handleFamilySelect = useCallback((selectedFamily, familId) => {
    setFormData((prevData) => ({
      ...prevData,
      family: selectedFamily,
      familId: familId,
    }));
  }, []);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "pan_no" ? value.toUpperCase() : value,
    }));
  }, []);

  async function GetFamilyListAPI() {
    try {
      const response = await axios({
        method: "post",
        url: "https://dev.netrumusa.com/starkcapital/api-backend/family_list",
        headers: {
          "Content-Type": "application/json",
        },
        data: {}, // empty object as body
      });
      if (response.data?.status === "success") {
        setFamilyData(response.data?.data);
      }
    } catch (error) {
    }
  }

  useEffect(() => {
    GetFamilyListAPI();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setError("Please fill in all required fields correctly.");
      return;
    }

    setLoading(true);
    setError(null);

    const requestBody = {
      name: formData.name,
      email: formData.email,
      mobile_no: formData.mobile_no,
      pan_no: formData.pan_no,
      password: formData.password,
      confirm_password: formData.confirm_password,
      family: formData.family,
      family_id: formData?.familId,
    };
    try {
      const response = await axios.post(
        "https://dev.netrumusa.com/starkcapital/api-backend/registration",
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data?.status === "success") {
        setSuccess(true);
        localStorage.setItem("myData", JSON.stringify(formData.mobile_no));
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

  const handleOpenModal = useCallback(() => {
    setShowModal((prev) => !prev);
  }, []);

  const FamilyDropdown = ({ onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const families = ["Family A", "Family B", "Family C", "Family D"]; // Example family names

    return (
      <div className="">
        <button
          type="button"
          className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-600"
          onClick={() => setIsOpen(!isOpen)}
        >
          ▼
        </button>
        {isOpen && (
          <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
            {FamilyData?.map((item, index) => {
              return (
                <div
                  key={index}
                  className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-fuchsia-100 text-gray-600"
                  onClick={() => {
                    onSelect(item?.family_name, item?.family_id);
                    setIsOpen(false);
                  }}
                >
                  {item?.family_name}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };


  return (
    <div className="bg-white min-h-screen w-full overflow-hidden">
      <div className="px-4 sm:px-6 lg:px-8">
        <Navbar onpress={handleOpenModal} />
      </div>

      {showModal && (
        <Modal
          showModal={showModal}
          setShowModal={setShowModal}
          handleSubmit={handleChange}
          handleChange={handleChange}
          formData={formData}
        />
      )}

      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 relative h-48 sm:h-64 md:h-96 lg:h-screen">
          <Image
            src={require("../../app/assets/logo/Rectangle_6.png")}
            alt="Left side image"
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg lg:rounded-l-lg lg:rounded-tr-none"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          <div className="absolute inset-0 flex flex-col justify-center items-start bg-opacity-60 text-white p-2 rounded">
            <p className="font-semibold text-xl sm:text-2xl md:text-3xl lg:text-4xl p-1">
              Manage your family
            </p>
            <p className="font-semibold text-xl sm:text-2xl md:text-3xl lg:text-4xl p-1">
              investments with
            </p>
            <p className="font-semibold text-xl sm:text-2xl md:text-3xl lg:text-4xl p-1">
              STARK CAPITAL
            </p>
          </div>
        </div>

        <div className="w-full lg:w-1/2 bg-white px-4 sm:px-6 lg:px-8 py-8 rounded-b-lg lg:rounded-r-lg">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-800 text-center lg:text-left">
            Sign Up
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <InputField
              label="Full Name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
            />

            <InputField
              label="PAN Number"
              name="pan_no"
              type="text"
              value={formData.pan_no}
              onChange={handleChange}
              error={errors.pan_no}
              autoCapitalize="characters"
            />

            <InputField
              label="Mobile Number"
              name="mobile_no"
              type="tel"
              value={formData.mobile_no}
              onChange={handleChange}
              error={errors.mobile_no}
              rightElement={
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 px-3 flex items-center bg-fuchsia-100 text-fuchsia-900 rounded-r-md text-sm"
                  onClick={() => handleOTPVerifyClick("mobile")}
                >
                  OTP Verify
                </button>
              }
            />

            <InputField
              label="Email"
              name="email"
              type="email"
              value={formData?.email}
              onChange={handleChange}
              error={errors.email}
              rightElement={
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 px-3 flex items-center bg-fuchsia-100 text-fuchsia-900 rounded-r-md text-sm"
                  onClick={() => handleOTPVerifyClick("email")}
                >
                  OTP Verify
                </button>
              }
            />

            <div>
              <label
                htmlFor="family"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Select Family
              </label>
              <div className="flex space-x-2">
                {/* Added flex container with spacing */}
                <div className="relative rounded-md shadow-sm flex-grow">
                  {/* Added flex-grow to make input take available space */}
                  <input
                    id="family"
                    type="text"
                    name="family"
                    value={formData.family}
                    onChange={handleChange}
                    className={`block w-full px-3 py-2 border rounded-md shadow-sm text-sm text-black ${
                      errors.family
                        ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                        : "border-gray-300 focus:ring-fuchsia-950 focus:border-fuchsia-950"
                    }`}
                    readOnly
                  />
                  <FamilyDropdown onSelect={handleFamilySelect} />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    router.push("/CreateFamily");
                  }}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-fuchsia-950 hover:bg-fuchsia-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fuchsia-950 transition-colors duration-200"
                >
                  Create Family
                </button>
              </div>
              {errors.family && (
                <p className="mt-1 text-sm text-red-500">{errors.family}</p>
              )}
            </div>

            <InputField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
            />

            <InputField
              label="Confirm Password"
              name="confirm_password" // Ensure this matches the state key
              type="password"
              value={formData.confirm_password} // Use the correct state field
              onChange={handleChange} // Use the existing change handler
              error={errors.confirm_password} // Match the validation errors object
            />

            <div className="flex items-center mt-4">
              <input
                type="checkbox"
                id="terms"
                className="w-4 h-4 text-fuchsia-950 border-gray-300 rounded focus:ring-fuchsia-950"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
              />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
                I Accept
                <span className="font-semibold uppercase">Stark Capital</span>
                <span className="underline">
                  Terms of Use and Privacy Policy
                </span>
              </label>
            </div>
            {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

            <button
              disabled={loading}
              className="w-full sm:w-auto py-3 px-6 font-semibold text-base text-white bg-fuchsia-900 rounded-full hover:bg-fuchsia-700 transition-colors"
              type="submit"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <Loader size={20} color="#fff" />
                </div>
              ) : (
                "Get Started"
              )}
            </button>
          </form>
          <OtpVerifyModalSignUp
            isOpen={showOTPModal}
            onClose={() => setShowOTPModal(false)}
            onVerify={handleOTPVerify}
            otp={otp}
            setOtp={setOtp}
          />
        </div>
      </div>
    </div>
  );
};

const InputField = React.memo(
  ({
    label,
    name,
    type,
    value,
    onChange,
    error,
    rightElement,
    autoCapitalize,
  }) => (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <div className="relative rounded-md shadow-sm">
        <input
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className={`block w-full px-3 py-2 border rounded-md shadow-sm text-sm ${
            error
              ? "border-red-500 focus:ring-red-500 focus:border-red-500"
              : "border-gray-300 focus:ring-fuchsia-950 focus:border-fuchsia-950"
          }`}
          style={{ textTransform: name === "panNumber" ? "uppercase" : "none" }}
          autoCapitalize={autoCapitalize}
        />
        {rightElement}
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  )
);

InputField.displayName = "InputField";

export default SignUp;
