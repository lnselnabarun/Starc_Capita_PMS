"use client";
import React, { useState } from "react";
import { Search, Clock, User } from "lucide-react";
import Image from 'next/image';
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

const NewsItem = ({ title, description, imageUrl, author, date, onclick }) => (
  <div
  onClick={onclick}
  className="group bg-white rounded-xl shadow-lg overflow-hidden mb-6 transition-all duration-300 hover:shadow-2xl hover:scale-105"
>
  <div className="relative w-full h-64 overflow-hidden flex items-center justify-center group self-center">
    <Image
      src={imageUrl} // Dynamic image path
      alt="News Image"
      fill
      className="object-contain transition-opacity hover:opacity-90" // Removed ml-4 to center the image
    />
  </div>
  <div className="p-6 bg-gradient-to-b from-white to-gray-50">
    <h2 className="text-2xl font-bold mb-3 text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
      {title}
    </h2>
    <p className="text-gray-600 mb-4">{description}</p>
    <div className="flex items-center justify-between text-sm text-gray-500">
      <div className="flex items-center">
        <User size={16} className="mr-2" />
        <span>{author}</span>
      </div>
      <div className="flex items-center">
        <Clock size={16} className="mr-2" />
        <span>{date}</span>
      </div>
    </div>
  </div>
</div>
);

const NewsListPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  // Mock news data
  const newsItems = [
    {
      id: 1,
      title: "Revolutionary AI Breakthrough Transforms Healthcare",
      description:
        "A new AI system shows unprecedented accuracy in early disease detection, promising to revolutionize preventive healthcare worldwide.",
     imageUrl: require('../assets/logo/Rectangle_5.png'),
      author: "Dr. Emily Chen",
      date: "May 15, 2024",
    },
    {
      id: 2,
      title: "Global Summit Achieves Historic Climate Agreement",
      description:
        "World leaders unite in groundbreaking accord, setting ambitious targets to achieve net-zero emissions by 2040.",
     imageUrl: require('../assets/logo/Rectangle_5.png'),
      author: "Michael Rodriguez",
      date: "May 14, 2024",
    },
    {
      id: 3,
      title: "Quantum Computing Milestone: 1000-Qubit Processor Unveiled",
      description:
        "Tech giant announces the creation of a 1000-qubit quantum processor, marking a significant leap towards practical quantum computing applications.",
     imageUrl: require('../assets/logo/Rectangle_5.png'),
      author: "Sarah Johnson",
      date: "May 13, 2024",
    },
    {
      id: 1,
      title: "Revolutionary AI Breakthrough Transforms Healthcare",
      description:
        "A new AI system shows unprecedented accuracy in early disease detection, promising to revolutionize preventive healthcare worldwide.",
     imageUrl: require('../assets/logo/Rectangle_5.png'),
      author: "Dr. Emily Chen",
      date: "May 15, 2024",
    },
    {
      id: 2,
      title: "Global Summit Achieves Historic Climate Agreement",
      description:
        "World leaders unite in groundbreaking accord, setting ambitious targets to achieve net-zero emissions by 2040.",
     imageUrl: require('../assets/logo/Rectangle_5.png'),
      author: "Michael Rodriguez",
      date: "May 14, 2024",
    },
    {
      id: 3,
      title: "Quantum Computing Milestone: 1000-Qubit Processor Unveiled",
      description:
        "Tech giant announces the creation of a 1000-qubit quantum processor, marking a significant leap towards practical quantum computing applications.",
     imageUrl: require('../assets/logo/Rectangle_5.png'),
      author: "Sarah Johnson",
      date: "May 13, 2024",
    },
    {
      id: 1,
      title: "Revolutionary AI Breakthrough Transforms Healthcare",
      description:
        "A new AI system shows unprecedented accuracy in early disease detection, promising to revolutionize preventive healthcare worldwide.",
     imageUrl: require('../assets/logo/Rectangle_5.png'),
      author: "Dr. Emily Chen",
      date: "May 15, 2024",
    },
    {
      id: 2,
      title: "Global Summit Achieves Historic Climate Agreement",
      description:
        "World leaders unite in groundbreaking accord, setting ambitious targets to achieve net-zero emissions by 2040.",
     imageUrl: require('../assets/logo/Rectangle_5.png'),
      author: "Michael Rodriguez",
      date: "May 14, 2024",
    },
    {
      id: 3,
      title: "Quantum Computing Milestone: 1000-Qubit Processor Unveiled",
      description:
        "Tech giant announces the creation of a 1000-qubit quantum processor, marking a significant leap towards practical quantum computing applications.",
     imageUrl: require('../assets/logo/Rectangle_5.png'),
      author: "Sarah Johnson",
      date: "May 13, 2024",
    },
    {
      id: 1,
      title: "Revolutionary AI Breakthrough Transforms Healthcare",
      description:
        "A new AI system shows unprecedented accuracy in early disease detection, promising to revolutionize preventive healthcare worldwide.",
     imageUrl: require('../assets/logo/Rectangle_5.png'),
      author: "Dr. Emily Chen",
      date: "May 15, 2024",
    },
    {
      id: 2,
      title: "Global Summit Achieves Historic Climate Agreement",
      description:
        "World leaders unite in groundbreaking accord, setting ambitious targets to achieve net-zero emissions by 2040.",
     imageUrl: require('../assets/logo/Rectangle_5.png'),
      author: "Michael Rodriguez",
      date: "May 14, 2024",
    },
    {
      id: 3,
      title: "Quantum Computing Milestone: 1000-Qubit Processor Unveiled",
      description:
        "Tech giant announces the creation of a 1000-qubit quantum processor, marking a significant leap towards practical quantum computing applications.",
        imageUrl: require('../assets/logo/Rectangle_5.png'),
      author: "Sarah Johnson",
      date: "May 13, 2024",
    },
    // Add more news items as needed
  ];
const routePage = (data) => {
  router.push("/NewsDetails/12345")
}
  const filteredNews = newsItems.filter(
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
          <div>All News</div>
        </div>
      <main className="container mx-auto px-4 py-4">
        <div className="mb-8 relative">
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
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredNews.map((item) => (
            <NewsItem key={item.id} {...item} onclick={routePage} />
          ))}
        </div>
      </main>
      </div>
    </div>
  );
};

export default NewsListPage;
