import Trends from "./Post/Trends";

const Aside = () => {
  return (
    <div className="min-h-[1000px]  w-[350px] mb-3 flex flex-col flex-wrap">
      <label className="h-[43px] mt-4 ml-5 rounded-full bg-[#273340] w-full group ">
        <svg
          viewBox="0 0 24 24"
          height={18.75}
          className="min-w-[32px] mt-3 ml-2 text-[#71767b] absolute"
        >
          <path
            fill="currentColor"
            d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z"
          />
        </svg>
        <input
          type="text"
          className="w-full h-full bg-transparent rounded-full outline-none pl-[60px] text-[15px]"
        />
      </label>

      <div className="bg-[#273340] mt-4 p-4 ml-5 rounded-[15px] w-[350px]">
        <h2 className="text-[25px] font-bold mb-2 ">Subscribe to Premium</h2>
        <p className="text-[17px] font-bold">
          Subscribe to unlock new features and if eligible, receive a share of
          ads revenue.
        </p>
        <button className="bg-[#61d6a3] hover:bg-[#61d6a3c9] transition text-black  font-bold py-2 px-5 mt-3 rounded-full">Subscribe</button>
      </div>
      <Trends/>
    </div>
  );
};

export default Aside;
