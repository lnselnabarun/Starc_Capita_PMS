"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from "next/navigation";

export default function NewsDetails() {
    const router = useRouter();
  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="relative w-full h-64 lg:h-96">
          <Image
            src={require('../../assets/logo/Rectangle_5.png')} // replace with dynamic image
            alt="News Image"
            layout="fill"
            objectFit="cover"
            className="w-full h-full object-cover hover:opacity-90 transition-opacity"
          />
        </div>

        <div className="p-6 md:p-8 lg:p-10">
          <h1 className="text-2xl lg:text-4xl font-bold text-gray-800 hover:text-blue-600 transition-colors mb-4">
            News Title
          </h1>
          <p className="text-sm text-gray-500 mb-6">Published on October 9, 2024 by <span className="font-semibold">Author Name</span></p>

          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id venenatis metus. Nulla facilisi. Duis nec
            diam a elit faucibus elementum in vel purus. Cras non odio ut arcu commodo facilisis. Maecenas ut ipsum vel
            elit dignissim tincidunt. 
          </p>

          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Suspendisse potenti. Vivamus id velit non velit dictum tristique. Donec sit amet turpis ut elit accumsan
            vehicula. Etiam id facilisis risus, id fermentum tortor. Fusce nec ligula ac nunc vulputate accumsan.
          </p>

          
            <div onClick={() =>router.back()} className="inline-block text-blue-600 hover:text-blue-800 font-semibold mt-6 transition-colors">
              ← Back to News
            </div>
          
        </div>
      </div>
    </div>
  );
}