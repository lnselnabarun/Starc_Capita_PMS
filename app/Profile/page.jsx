"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Mail,
  MapPin,
  Phone,
  User,
  Edit2,
  Save,
  ArrowLeft,
  LogOut,
  Loader,
  CreditCard,
} from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";

const UserProfile = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  // useEffect(() => {
  //   fetchUserData();
  // }, []);

  // const fetchUserData = async () => {
  //   try {
  //     const response = await axios.get(
  //       "https://dev.netrumusa.com/starkcapital/api-backend/users/4"
  //     )
  //     setUserData(response.data.data);
  //     setFetchLoading(false);
  //   } catch (error) {
  //     console.error("Error fetching user data:", error);
  //     setError("Failed to load user data");
  //     setFetchLoading(false);
  //   }
  // };


  useEffect(() => {
    const initializeData = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem("myData");

        if (!token) {
          setError("No authentication token found");
          return;
        }

        await GetUserDetails(JSON.parse(token));
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    initializeData();
  }, []);

  async function GetUserDetails(token) {
    console.log(token,"TokenGetUserDetails")
    try {
      const response = await axios({
        method: "GET",
        url: "https://dev.netrumusa.com/starkcapital/api-backend/profile",
        headers: {
          'Cache-Control': 'no-cache',
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response?.data,"GetUserDetailsGetUserDetails")
      if (response.data?.status === "success") {
        setUserData(response.data.data);
        // const uniqueData = (response?.data?.data || []).filter(
        //   (item, index, self) =>
        //     index === self.findIndex((t) => t.id === item.id)
        // );
        
        // // Save the filtered data
        // setFamilyData(uniqueData);
      } else {
        throw new Error(response.data?.message || "Failed to fetch mutual fund data");
      }
    } catch (error) {
      console.error("Error fetching mutual fund data:", error);
      throw error;
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // const handleSave = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setError(null);
  //   try {
  //     // Update API endpoint and method as needed
  //     await axios.put(
  //       `https://dev.netrumusa.com/starkcapital/api-backend/users/${userData.user_reg_id}`,
  //       userData
  //     );
  //     setIsEditing(false);
  //     localStorage.setItem("userData", JSON.stringify(userData));
  //   } catch (error) {
  //     console.error("Error updating user:", error);
  //     setError("Failed to update profile");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleBack = () => router.back();

  const handleLogout = () => {
    setLogoutLoading(true);
    localStorage.clear();
    router.push("/");
  };

  if (fetchLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="w-8 h-8 animate-spin text-gray-700" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          {/* Header with Back Button */}
          <div className="h-32 bg-gradient-to-r from-fuchsia-950 to-[#5E2751] relative">
            <button
              onClick={handleBack}
              className="absolute top-8 left-8 bg-white text-gray-800 p-2 rounded-full shadow-md flex items-center z-10 hover:bg-gray-100"
              aria-label="Go back"
            >
              <ArrowLeft size={24} />
            </button>
          </div>

          {/* Profile Information */}
          <div className="px-8 py-6 -mt-16">
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full border-4 border-white shadow-lg flex items-center justify-center mt-20">
                <User size={64} className="text-gray-400" />
              </div>

              <div className="mt-4 w-full space-y-6">
                <div className="space-y-4">
                  {/* Name */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-500">
                      Name
                    </label>
                    <div className="flex items-center border rounded-lg p-3 bg-gray-50">
                      <User className="text-gray-400 mr-3" size={20} />
                      {isEditing ? (
                        <input
                          type="text"
                          name="user_reg_name"
                          value={userData?.user_reg_name || ""}
                          onChange={handleInputChange}
                          className="w-full bg-transparent focus:outline-none"
                        />
                      ) : (
                        <span className="text-gray-700">
                          {userData?.user_reg_name}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-500">
                      Email
                    </label>
                    <div className="flex items-center border rounded-lg p-3 bg-gray-50">
                      <Mail className="text-gray-400 mr-3" size={20} />
                      {isEditing ? (
                        <input
                          type="email"
                          name="user_reg_email"
                          value={userData?.user_reg_email || ""}
                          onChange={handleInputChange}
                          className="w-full bg-transparent focus:outline-none"
                        />
                      ) : (
                        <span className="text-gray-700">
                          {userData?.user_reg_email}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-500">
                      Phone
                    </label>
                    <div className="flex items-center border rounded-lg p-3 bg-gray-50">
                      <Phone className="text-gray-400 mr-3" size={20} />
                      {isEditing ? (
                        <input
                          type="tel"
                          name="user_reg_phone"
                          value={userData?.user_reg_phone || ""}
                          onChange={handleInputChange}
                          className="w-full bg-transparent focus:outline-none"
                        />
                      ) : (
                        <span className="text-gray-700">
                          {userData?.user_reg_phone}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* PAN Number */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-500">
                      PAN Number
                    </label>
                    <div className="flex items-center border rounded-lg p-3 bg-gray-50">
                      <CreditCard className="text-gray-400 mr-3" size={20} />
                      {isEditing ? (
                        <input
                          type="text"
                          name="user_reg_pan_no"
                          value={userData?.user_reg_pan_no || ""}
                          onChange={handleInputChange}
                          className="w-full bg-transparent focus:outline-none"
                        />
                      ) : (
                        <span className="text-gray-700">
                          {userData?.user_reg_pan_no}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Family Information */}
                  {/* <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-500">
                      Family Code
                    </label>
                    <div className="flex items-center border rounded-lg p-3 bg-gray-50">
                      <User className="text-gray-400 mr-3" size={20} />
                      <span className="text-gray-700">
                        {userData?.family_code}
                      </span>
                    </div>
                  </div> */}
                </div>

                {/* Action Buttons */}
                <div className="space-y-4 pt-6">
                  {/* <button
                    onClick={isEditing ? handleSave : () => setIsEditing(true)}
                    className="w-full bg-gradient-to-r from-fuchsia-950 to-[#5E2751] text-white py-3 px-6 rounded-lg hover:opacity-90 transition duration-300 flex items-center justify-center text-lg font-semibold shadow-md"
                    disabled={loading}
                  >
                    {loading ? (
                      <Loader className="w-5 h-5 animate-spin" />
                    ) : isEditing ? (
                      <>
                        <Save size={20} className="mr-2" /> Save Changes
                      </>
                    ) : (
                      <>
                        <Edit2 size={20} className="mr-2" /> Edit Profile
                      </>
                    )}
                  </button> */}

                  <button
                    onClick={handleLogout}
                    className="w-full bg-red-500 text-white py-3 px-6 rounded-lg hover:bg-red-600 transition duration-300 flex items-center justify-center text-lg font-semibold shadow-md"
                    disabled={logoutLoading}
                  >
                    {logoutLoading ? (
                      <Loader className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <LogOut size={20} className="mr-2" /> Logout
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
