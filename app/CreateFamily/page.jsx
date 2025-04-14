"use client";
import React, { useState } from "react";
import { User, Phone, Mail, Heart, Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import AlertExample from "../components/AlertExample";

const CreateFamilyForm = () => {
  const route = useRouter();
  const [alert, setAlert] = useState({
    show: false,
    type: "info",
    title: "",
    message: "",
  });
  
  const [formData, setFormData] = useState({
    familyName: "",
    family_code: "",
    email: "",
    phone: "",
    primaryContact: "",
    description: "",
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "https://dev.netrumusa.com/starkcapital/api-backend/family_create",
        formData
      );
      setSuccess(true);
      setAlert({
        show: true,
        type: "success",
        title: "Success!",
        message: "Family created successfully",
      });
      route.back();

    } catch (error) {
      setError("Failed to submit the form. Please try again later.");
      setAlert({
        show: true,
        type: "error",
        title: "Error",
        message: "Failed to create family. Please try again.",
      });
    } finally {
      setLoading(false);
      route.back();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-fuchsia-950 mb-2">
            Create New Family
          </h1>
          <p className="text-gray-600">
            Fill in the details to register a new family
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-fuchsia-950 to-purple-900 text-white p-6">
            <div className="flex items-center space-x-2">
              <Heart className="w-6 h-6" />
              <h2 className="text-xl font-semibold">Family Information</h2>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="p-6 space-y-6">
              <div className="space-y-4">
                {/* Family Name */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Family Name*
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      required
                      type="text"
                      name="familyName"
                      value={formData.familyName}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-fuchsia-950 focus:border-fuchsia-950 text-sm"
                      placeholder="Enter family name"
                    />
                  </div>
                </div>

                {/* Family Code */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Family Code*
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      required
                      type="text"
                      name="family_code"
                      value={formData.family_code}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-fuchsia-950 focus:border-fuchsia-950 text-sm"
                      placeholder="Enter family code"
                    />
                  </div>
                </div>

                {/* Primary Contact */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Primary Contact Person*
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      required
                      type="text"
                      name="primaryContact"
                      value={formData.primaryContact}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-fuchsia-950 focus:border-fuchsia-950 text-sm"
                      placeholder="Enter primary contact name"
                    />
                  </div>
                </div>

                {/* Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email*
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        required
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-fuchsia-950 focus:border-fuchsia-950 text-sm"
                        placeholder="Enter email address"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone*
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        required
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-fuchsia-950 focus:border-fuchsia-950 text-sm"
                        placeholder="Enter phone number"
                      />
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-fuchsia-950 focus:border-fuchsia-950 text-sm"
                    placeholder="Any additional information about the family"
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-4 border-t border-gray-200">
              <button
                onClick={() => route.back()}
                type="button"
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fuchsia-950"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="relative px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-fuchsia-950 hover:bg-fuchsia-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fuchsia-950 disabled:opacity-70 disabled:cursor-not-allowed min-w-[120px]"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <Loader className="animate-spin" size={20} />
                  </div>
                ) : (
                  "Create Family"
                )}
              </button>
            </div>
          </form>
        </div>
        
        <div
          onClick={() => route.back()}
          className="inline-block text-fuchsia-900 hover:text-fuchsia-700 font-semibold mt-6 transition-colors cursor-pointer"
        >
          ← Back to Home
        </div>
      </div>

      {/* <AlertExample
        show={alert.show}
        type={alert.type}
        title={alert.title}
        message={alert.message}
        onClose={() => setAlert({ ...alert, show: false })}
      /> */}
    </div>
  );
};

export default CreateFamilyForm;