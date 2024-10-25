"use client";
import React, { useState } from "react";
import {
  User,
  Users,
  Phone,
  Mail,
  MapPin,
  Heart,
  Loader,
} from "lucide-react";

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
    primaryContact: "",
    email: "",
    phone: "",
    address: "",
    members: [""],
    familyType: "Nuclear",
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

  // const showAlert = () => {
  //   setAlert({
  //     show: true,
  //     type: "success",
  //     title: "Success!",
  //     message: "Operation completed successfully",
  //   });
  // };

  const handleMemberChange = (index, value) => {
    const newMembers = [...formData.members];
    newMembers[index] = value;
    setFormData((prev) => ({
      ...prev,
      members: newMembers,
    }));
  };

  const addMember = () => {
    setFormData((prev) => ({
      ...prev,
      members: [...prev.members, ""],
    }));
  };

  const removeMember = (index) => {
    const newMembers = formData.members.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      members: newMembers,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        formData
      );
      console.log("API response:", response.data);
      setSuccess(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("Failed to submit the form. Please try again later.");
    } finally {
      setLoading(false);
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
          {/* Header */}
          <div className="bg-gradient-to-r from-fuchsia-950 to-purple-900 text-white p-6">
            <div className="flex items-center space-x-2">
              <Heart className="w-6 h-6" />
              <h2 className="text-xl font-semibold">Family Information</h2>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Form Content */}
            <div className="p-6 space-y-6">
              {/* Family Name Section */}
              <div className="space-y-4">
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Family Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Users className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="familyName"
                      value={formData.familyName}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-fuchsia-950 focus:border-fuchsia-950 text-sm"
                      placeholder="Enter family name"
                    />
                  </div>
                </div>

                {/* Primary Contact */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Primary Contact Person
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
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
                      Email
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
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
                      Phone
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
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

                {/* Address */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin className="h-5 w-5 text-gray-400" />
                    </div>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      rows="3"
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-fuchsia-950 focus:border-fuchsia-950 text-sm"
                      placeholder="Enter complete address"
                    />
                  </div>
                </div>

                {/* Family Type */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Family Type
                  </label>
                  <select
                    name="familyType"
                    value={formData.familyType}
                    onChange={handleChange}
                    className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-fuchsia-950 focus:border-fuchsia-950 text-sm"
                  >
                    <option value="Nuclear">Nuclear Family</option>
                    <option value="Joint">Joint Family</option>
                    <option value="Extended">Extended Family</option>
                    <option value="Single">Single Parent Family</option>
                  </select>
                </div>

                {/* Family Members */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Family Members
                  </label>
                  {formData.members.map((member, index) => (
                    <div key={index} className="flex space-x-2">
                      <input
                        type="text"
                        value={member}
                        onChange={(e) =>
                          handleMemberChange(index, e.target.value)
                        }
                        className="flex-grow py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-fuchsia-950 focus:border-fuchsia-950 text-sm"
                        placeholder={`Member ${index + 1}`}
                      />
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => removeMember(index)}
                          className="px-3 py-2 text-red-600 hover:text-red-800 transition-colors duration-200"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addMember}
                    className="mt-2 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fuchsia-950"
                  >
                    Add Member
                  </button>
                </div>

                {/* Description */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Additional Notes
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
                    <Loader size={20} color="#fff" />
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
          className="inline-block text-fuchsia-900 hover:text-fuchsia-700 font-semibold mt-6 transition-colors"
        >
          ← Back to Home
        </div>
      </div>
      <AlertExample
        show={alert.show}
        type={alert.type}
        title={alert.title}
        message={alert.message}
        onClose={() => setAlert({ ...alert, show: false })}
      />
    </div>
  );
};

export default CreateFamilyForm;
