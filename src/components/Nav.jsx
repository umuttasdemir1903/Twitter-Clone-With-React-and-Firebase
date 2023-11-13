import { BiDoorOpen } from "react-icons/bi";
import { navSections } from "../constants";
import UserLoader from "./UserLoader";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";
const Nav = ({ user }) => {
  const navigate = useNavigate();
  return (
    <nav className="flex flex-col justify-between items-end p-2 py-4">
      <div>
        <img className="w-[45px]  mb-4  cursor-pointer  " src="x-logo.png" alt="x-logo" />
        {navSections.map((i) => (
          <div key={i.title} className="flex justify-center md:justify-normal items-center gap-3 text-[25px] md:text-xl p-3 cursor-pointer transition rounded-full hover:bg-[#38444d]">
            {i.icon}
            <span className="hidden md:block">{i.title}</span>
          </div>
        ))}
      </div>

      {/* Kullanıcı bigileri */}
      <div>
        {!user ? (
          <UserLoader />
        ) : (
          <div className=" flex flex-col gap-5">
            <div className="flex items-center gap-2">
              <img
                className="w-12 h-12 rounded-full "
                src={user.photoURL}
                alt=""
              />
              <p className="hidden md:block">{user?.displayName}</p>
            </div>

            <button
              onClick={() => signOut(auth).then(() => navigate("/"))}
              className="flex justify-center items-center gap-2 bg-gray-700 rounded p-1 text-2xl md:text-[16px]"
            >
              <BiDoorOpen />
              <span className="hidden md:block">Log out</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
