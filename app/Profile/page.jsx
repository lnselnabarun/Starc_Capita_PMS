"use client"
import React, { useState } from "react";
import Image from "next/image";
import {
  Mail,
  MapPin,
  Users,
  Camera,
  Edit2,
  Save,
  ArrowLeft,
  LogOut
} from "lucide-react";
import { useRouter } from "next/navigation";

const UserProfile = () => {
  // Mock initial user data
  const initialUser = {
    name: "Nabarun Adhikary",
    email: "nabarun.lnsel@.com",
    address: "123 Main St, Anytown, USA",
    family: ["Jane Doe", "Jimmy Doe", "Jenny Doe"],
    coverImage: require('../assets/logo/Rectangle_5.png'),
    profileImage: require('../assets/logo/User_Icon.png'),
  };
  const router = useRouter();

  const [user, setUser] = useState(initialUser);
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    // Here you would typically send the updated user data to your backend
    console.log("Saving user data:", user);
    setIsEditing(false);
  };

  const handleBack = () => {
    router.back();
  };

  const handleLogout = () => {
    // Implement logout logic here
    // For example, clear local storage, reset auth state, etc.
    localStorage.clear();
    console.log("Logging out...");
    // Redirect to login page or home page
    router.push("/"); // Adjust this to your app's login route
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          {/* Cover Image */}
          <div className="h-60 sm:h-80 w-full relative">
            <Image
              src={user.coverImage}
              alt="Cover"
              layout="fill"
              objectFit="cover"
              priority
              className="transition-opacity duration-300 hover:opacity-90 rounded-lg"
            />
            <button
              onClick={handleBack}
              className="absolute top-8 left-8 bg-white text-gray-800 p-2 rounded-full shadow-md flex items-center z-10 hover:bg-white transition duration-300"
              aria-label="Go back"
            >
              <ArrowLeft size={24} />
            </button>
            {isEditing && (
              <button className="absolute bottom-4 right-4 bg-white text-gray-800 px-3 py-2 rounded-full shadow-md flex items-center z-10 hover:bg-gray-100 transition duration-300">
                <Camera size={18} className="mr-2" /> Change Cover
              </button>
            )}
          </div>

          {/* Profile Picture */}
          <div className="relative px-4 sm:px-6 lg:px-8">
            <div className="absolute -top-20 w-36 h-36 sm:w-40 sm:h-40">
              <Image
                src={user.profileImage}
                alt="Profile"
                width={160}
                height={160}
                className="rounded-full border-4 border-white shadow-lg"
              />
              {isEditing && (
                <button className="absolute bottom-0 right-0 bg-white text-gray-800 p-2 rounded-full shadow-md flex items-center z-10 hover:bg-gray-100 transition duration-300">
                  <Camera size={18} />
                </button>
              )}
            </div>
          </div>

          {/* User Info */}
          <div className="mt-24 sm:mt-28 p-4 sm:p-6 lg:p-8">
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleInputChange}
                className="text-3xl font-bold mb-4 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
              />
            ) : (
              <h1 className="text-3xl font-bold mb-4 text-gray-700">
                {user.name}
              </h1>
            )}
            <div className="space-y-4">
              <div className="flex items-center text-gray-600">
                <Mail className="mr-3" size={20} />
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <span className="text-lg">{user.email}</span>
                )}
              </div>
              <div className="flex items-start text-gray-600">
                <MapPin className="mr-3 mt-1" size={20} />
                {isEditing ? (
                  <textarea
                    name="address"
                    value={user.address}
                    onChange={handleInputChange}
                    rows={2}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <span className="text-lg">{user.address}</span>
                )}
              </div>
            </div>
          </div>

          {/* Family List */}
          <div className="p-4 sm:p-6 lg:p-8 border-t border-gray-200">
            <h2 className="text-2xl font-semibold mb-4 flex items-center text-gray-700">
              <Users className="mr-3" size={24} />
              Family Members
            </h2>
            <ul className="space-y-3">
              {user.family.map((member, index) => (
                <li key={index} className="text-gray-700">
                  <span className="text-lg">{member}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Edit/Save Button */}
          <div className="p-4 sm:p-6 lg:p-8 border-t border-gray-200 space-y-4">
            <button
              onClick={isEditing ? handleSave : toggleEdit}
              className="w-full bg-gradient-to-r from-fuchsia-950 to-[#5E2751] text-white py-3 px-6 rounded-lg hover:from-blue-600 hover:to-blue-700 transition duration-300 flex items-center justify-center text-lg font-semibold shadow-md"
            >
              {isEditing ? (
                <>
                  <Save size={20} className="mr-2" /> Save Changes
                </>
              ) : (
                <>
                  <Edit2 size={20} className="mr-2" /> Edit Profile
                </>
              )}
            </button>
            
            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 text-white py-3 px-6 rounded-lg hover:bg-red-600 transition duration-300 flex items-center justify-center text-lg font-semibold shadow-md"
            >
              <LogOut size={20} className="mr-2" /> Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;