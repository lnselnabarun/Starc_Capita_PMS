"use client";
import React, { useState, useEffect } from "react";
import { Search, Clock, User } from "lucide-react";
import Image from 'next/image';
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import axios from "axios";

const NewsListPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const [NewsData, SetNewsData] = useState([]);
  const [imageErrors, setImageErrors] = useState({});

  async function GetNewsData() {
    try {
      const response = await axios({
        method: "get",
        url: "https://gnews.io/api/v4/search?q=finance&lang=en&country=in&max=10&apikey=17c29ee48fb5efc174029fd665646b59",
        headers: {
          "Content-Type": "application/json",
        },
      });
      SetNewsData(response?.data?.articles)
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    GetNewsData()
  }, []);

  const handleImageError = (index) => {
    setImageErrors(prev => ({
      ...prev,
      [index]: true
    }));
  };

  const routePage = (data) => {
    // router.push("/NewsDetails/12345")
  }

  const filteredNews = NewsData.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50">
      <div className="px-4 sm:px-8 md:px-16 lg:px-28">
        <div className="flex items-center font-medium text-lg sm:text-xl md:text-2xl text-[#25282C] font-sans py-5">
          <button
            onClick={() => router.back()}
            className=" m-2 bg-white text-gray-800 p-2 rounded-full shadow-md flex items-center z-10 hover:bg-white transition duration-300"
            aria-label="Go back"
          >
            <ArrowLeft size={24} />
          </button>
          {/* <div>All News</div> */}
        </div>
        <main className="container mx-auto px-4 py-4">
          {/* <div className="mb-8 relative">
            <input
              type="text"
              placeholder="Explore the latest news..."
              className="w-full p-4 pl-12 rounded-full border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-md text-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={24}
            />
          </div> */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {NewsData.map((data, index) => (
              <div
                key={index}
                onClick={() => routePage(data)}
                className="group bg-white rounded-xl shadow-lg overflow-hidden mb-6 transition-all duration-300 hover:shadow-2xl hover:scale-105 cursor-pointer"
              >
                <div className="relative w-full h-64 overflow-hidden flex items-center justify-center group self-center">
                  {imageErrors[index] || !data?.image ? (
                    // Fallback placeholder when image fails to load
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <div className="text-gray-400 text-center">
                        <div className="text-4xl mb-2">📰</div>
                        <div className="text-sm">No Image Available</div>
                      </div>
                    </div>
                  ) : (
                    // Using regular img tag to avoid Next.js domain restrictions
                    <img
                      src={data?.image}
                      alt="News Image"
                      className="w-full h-full object-cover transition-opacity hover:opacity-90"
                      onError={() => handleImageError(index)}
                      loading="lazy"
                    />
                  )}
                </div>
                <div className="p-6 bg-gradient-to-b from-white to-gray-50">
                  <h2 className="text-2xl font-bold mb-3 text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                    {data?.title}
                  </h2>
                  <p className="text-gray-600 mb-4">{data?.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <User size={16} className="mr-2" />
                      <span>{data?.source?.name}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock size={16} className="mr-2" />
                      <span>{new Date(data?.publishedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default NewsListPage;