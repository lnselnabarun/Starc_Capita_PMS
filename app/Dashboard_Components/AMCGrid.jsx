import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const ResponsiveLogoComponent = ({ logo, name, bgColor = 'bg-white', route }) => {
  return (
    <div onClick={() =>  route.push('/AMCDetails/12345')} className={`${bgColor} aspect-square w-full max-w-[14rem] md:max-w-[16rem] rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 flex flex-col items-center justify-center p-4 space-y-4 group`}>
      <div className="relative w-3/5 aspect-square transition-transform duration-300 ease-in-out group-hover:rotate-6">
        <Image
          src={logo}
          alt={`${name} logo`}
          fill
          className="transition-all duration-300 ease-in-out group-hover:scale-110 object-contain"
        />
      </div>
      <p className="text-center font-medium text-gray-800 break-words w-full transition-all duration-300 ease-in-out group-hover:text-gray-900">
        <span className="text-sm sm:text-base md:text-lg text-gray-700 font-medium">{name}</span>
      </p>
    </div>
  );
};

const AMCGrid = () => {
  const route = useRouter();
  const amcData = [
    { name: "Bajaj Finserv Mutual Fund", logo: require('../assets/logo/Logo_A.png') },
    { name: "Helios Mutual Fund", logo: require('../assets/logo/Logo_A.png')  },
    { name: "WhiteOak Capital Mutual Fund", logo: require('../assets/logo/Logo_A.png')  },
    { name: "ITI Mutual Fund", logo: require('../assets/logo/Logo_A.png')  },
    { name: "TRUST Mutual Fund", logo: require('../assets/logo/Logo_A.png')  },
    { name: "NJ Mutual Fund", logo: require('../assets/logo/Logo_A.png')  },
    { name: "Samco Mutual Fund", logo: require('../assets/logo/Logo_A.png')  },
    { name: "Mahindra Manulife Mutual Fund", logo: require('../assets/logo/Logo_A.png')  },
    { name: "Canara Robeco Mutual Fund", logo: require('../assets/logo/Logo_A.png')  },
    { name: "Quant Mutual Fund", logo: require('../assets/logo/Logo_A.png')  },
    { name: "ICICI Prudential Mutual Fund", logo: require('../assets/logo/Logo_A.png')  },
    { name: "JM Financial Mutual Fund", logo: require('../assets/logo/Logo_A.png')  },
    { name: "LIC Mutual Fund", logo: require('../assets/logo/Logo_A.png')  },
    { name: "Franklin Templeton Mutual Fund", logo: require('../assets/logo/Logo_A.png')  },
    { name: "Aditya Birla Sun Life Mutual Fund", logo: require('../assets/logo/Logo_A.png')  },
    { name: "Mirae Asset Mutual Fund", logo: require('../assets/logo/Logo_A.png')  },
  ];

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {amcData.map((amc, index) => (
            <ResponsiveLogoComponent key={index} {...amc} route={route} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AMCGrid;