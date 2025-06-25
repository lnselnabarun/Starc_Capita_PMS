"use client"

import React from "react";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const transactionsData = [
  {
    id: 1,
    currency: "Bitcoin / BTC",
    amount: "0.005 BTC",
    value: "₹20,000",
    type: "Sent",
    date: "2024-10-09",
    status: "Completed",
    icon: require("../assets/logo/Bitcoin.png"),
  },
  {
    id: 2,
    currency: "Ethereum / ETH",
    amount: "0.5 ETH",
    value: "₹2,000",
    type: "Received",
    date: "2024-10-08",
    status: "Pending",
    icon: require("../assets/logo/Bitcoin.png"),
  },
  {
    id: 3,
    currency: "Algorand / ALG",
    amount: "100 ALG",
    value: "₹150",
    type: "Sent",
    date: "2024-10-07",
    status: "Completed",
    icon: require("../assets/logo/Bitcoin.png"),
  },
  {
    id: 1,
    currency: "Bitcoin / BTC",
    amount: "0.005 BTC",
    value: "₹20,000",
    type: "Sent",
    date: "2024-10-09",
    status: "Completed",
    icon: require("../assets/logo/Bitcoin.png"),
  },
  {
    id: 2,
    currency: "Ethereum / ETH",
    amount: "0.5 ETH",
    value: "₹2,000",
    type: "Received",
    date: "2024-10-08",
    status: "Pending",
    icon: require("../assets/logo/Bitcoin.png"),
  },
  {
    id: 3,
    currency: "Algorand / ALG",
    amount: "100 ALG",
    value: "₹150",
    type: "Sent",
    date: "2024-10-07",
    status: "Completed",
    icon: require("../assets/logo/Bitcoin.png"),
  },
  {
    id: 1,
    currency: "Bitcoin / BTC",
    amount: "0.005 BTC",
    value: "₹20,000",
    type: "Sent",
    date: "2024-10-09",
    status: "Completed",
    icon: require("../assets/logo/Bitcoin.png"),
  },
  {
    id: 2,
    currency: "Ethereum / ETH",
    amount: "0.5 ETH",
    value: "₹2,000",
    type: "Received",
    date: "2024-10-08",
    status: "Pending",
    icon: require("../assets/logo/Bitcoin.png"),
  },
  {
    id: 3,
    currency: "Algorand / ALG",
    amount: "100 ALG",
    value: "₹150",
    type: "Sent",
    date: "2024-10-07",
    status: "Completed",
    icon: require("../assets/logo/Bitcoin.png"),
  },
  {
    id: 1,
    currency: "Bitcoin / BTC",
    amount: "0.005 BTC",
    value: "₹20,000",
    type: "Sent",
    date: "2024-10-09",
    status: "Completed",
    icon: require("../assets/logo/Bitcoin.png"),
  },
  {
    id: 2,
    currency: "Ethereum / ETH",
    amount: "0.5 ETH",
    value: "₹2,000",
    type: "Received",
    date: "2024-10-08",
    status: "Pending",
    icon: require("../assets/logo/Bitcoin.png"),
  },
  {
    id: 3,
    currency: "Algorand / ALG",
    amount: "100 ALG",
    value: "₹150",
    type: "Sent",
    date: "2024-10-07",
    status: "Completed",
    icon: require("../assets/logo/Bitcoin.png"),
  },
];

const RecentTransactions = () => {
    const route = useRouter();
  return (
    <div className="container mx-auto px-4 py-8">
       <div className="flex items-center font-medium text-lg sm:text-xl md:text-2xl text-[#25282C] font-sans pb-10">
          <button
            onClick={() =>   route.back()}
            className=" mr-5 bg-white text-gray-800 p-2 rounded-full shadow-md flex items-center z-10 hover:bg-white transition duration-300"
            aria-label="Go back"
          >
            <ArrowLeft size={24} />
          </button>
          <div>Systematic Transactions</div>
        </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="grid grid-cols-6 bg-gray-100 p-4 font-semibold">
          <div className="col-span-2">Currency</div>
          <div>Amount</div>
          <div>Value</div>
          <div>Type</div>
          <div>Status</div>
        </div>
        {transactionsData.map((transaction) => (
          <div
            key={transaction.id}
            className="grid grid-cols-6 p-4 border-b items-center"
          >
            <div className="col-span-2 flex items-center space-x-3">
              <Image
                src={transaction.icon}
                alt={transaction.currency}
                width={32}
                height={32}
                className="rounded-full"
              />
              <span>{transaction.currency}</span>
            </div>
            <div>{transaction.amount}</div>
            <div>{transaction.value}</div>
            <div
              className={`flex items-center ${
                transaction.type === "Sent" ? "text-red-500" : "text-green-500"
              }`}
            >
              {transaction.type === "Sent" ? (
                <ArrowUpRight className="mr-1" size={16} />
              ) : (
                <ArrowUpRight className="mr-1 transform rotate-180" size={16} />
              )}
              {transaction.type}
            </div>
            <div>
              <span
                className={`px-2 py-1 rounded-full text-xs ${
                  transaction.status === "Completed"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {transaction.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTransactions;
