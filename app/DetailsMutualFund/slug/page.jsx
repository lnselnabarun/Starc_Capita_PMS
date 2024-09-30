"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  User,
  Mail,
  Briefcase,
  ToggleLeft,
  Camera,
  Edit3,
  ChevronLeft,
  Phone
} from "lucide-react";
import { useRouter } from "next/navigation";

const UserDetailsPage = ({ params }) => {
  const route = useRouter();
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Developer",
    phone:"8016010553",
    Family:"Lnsel family",
    status: "Active",
    profilePicture: require("../../assets/logo/User_Icon.png"),
  });
  console.log(params?.slug, "bbbbbb");
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    console.log("Updated user:", user);
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUser((prevUser) => ({
        ...prevUser,
        profilePicture: URL.createObjectURL(file),
      }));
    }
  };
  // const handleBack = () => {
  //   route.back();
  // };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="bg-gradient-to-r from-fuchsia-950 to-[#5E2751] p-6 sm:p-10">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => route.back()}
                className="text-white hover:text-gray-200 transition-colors duration-300"
                aria-label="Go back"
              >
                <ChevronLeft size={24} />
              </button>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">
                User Details
              </h1>
            </div>
          </div>

          <div className="">
          <div className="bg-gradient-to-r from-fuchsia-950 to-[#5E2751] h-32"></div>
          <div className="px-6 py-8 relative">
            <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
              <div className="relative">
                <Image
                  src={user.profilePicture}
                  alt="Profile"
                  width={128}
                  height={128}
                  className="rounded-full border-4 border-white shadow-lg object-cover"
                />
                {isEditing && (
                  <label
                    htmlFor="profile-picture"
                    className="absolute bottom-0 right-0 bg-white rounded-full p-2 cursor-pointer shadow-lg hover:bg-gray-100 transition duration-300"
                  >
                    <Camera size={24} className="text-gray-600" />
                    <input
                      type="file"
                      id="profile-picture"
                      className="hidden"
                      onChange={handleProfilePictureChange}
                      accept="image/*"
                    />
                  </label>
                )}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-16 space-y-6">
              <div className="space-y-4">
                <div className="relative">
                  <User className="absolute top-3 left-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={user.name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 text-black"
                    placeholder="Name"
                  />
                </div>

                <div className="relative">
                  <Mail className="absolute top-3 left-3 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 text-black"
                    placeholder="Email"
                  />
                </div>

                <div className="relative">
                  <Phone className="absolute top-3 left-3 w-5 h-5 text-gray-400" />
                  <input
                    type="phone"
                    name="phone"
                    value={user.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 text-black"
                    placeholder="Phone"
                  />
                </div>

                <div className="relative">
                <Briefcase className="absolute top-3 left-3 w-5 h-5 text-gray-400" />
                  <input
                    type="Family"
                    name="Family"
                    value={user.Family}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 text-black"
                    placeholder="Family"
                  />
                </div>

                {/* <div className="relative">
                 
                  <select
                    name="role"
                    value={user.role}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 appearance-none text-black"
                  >
                    <option value="Developer">Developer</option>
                    <option value="Designer">Designer</option>
                    <option value="Manager">Manager</option>
                  </select>
                </div> */}

                <div className="relative">
                  <ToggleLeft className="absolute top-3 left-3 w-5 h-5 text-gray-400" />
                  <select
                    name="status"
                    value={user.status}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 appearance-none text-black"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                {isEditing ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 text-gray-700"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                    >
                      Save Changes
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 flex items-center"
                  >
                    <Edit3 size={18} className="mr-2" />
                    Edit Profile
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
        </div>
      </div>
    </div>


   
  );
};

export default UserDetailsPage;
