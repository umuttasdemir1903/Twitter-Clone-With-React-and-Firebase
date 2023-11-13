import React from "react";

const Trends = () => {
  return (
    <div>
      <div className="bg-[#273340] mt-4 p-4 ml-5 rounded-[15px] w-[350px] ">
        <h1 className="text-[30px] font-bold">Trends for you</h1>
        <div className="mb-4 mt-3 hover:bg-gray-600 p-3 rounded-md transition cursor-pointer">
        <span className="text-gray-400">Trending in Turkey</span>
          <p>#SONDAKİKA</p>
          <span className="text-sm text-gray-400 ">33.9K posts</span>
        </div>
        <div className="mb-4 mt-3 hover:bg-gray-600 p-3 rounded-md transition cursor-pointer">
        <span className="text-gray-400">Trending in Turkey</span>
          <p>#TALISCA</p>
          <span className="text-sm text-gray-400 ">33.9K posts</span>
        </div>
        <div className="mb-4 mt-3 hover:bg-gray-600 p-3 rounded-md transition cursor-pointer">
        <span className="text-gray-400">Trending in Turkey</span>
          <p>#GÜNDEM</p>
          <span className="text-sm text-gray-400 ">33.9K posts</span>
        </div>
      </div>
    </div>
  );
};

export default Trends;
