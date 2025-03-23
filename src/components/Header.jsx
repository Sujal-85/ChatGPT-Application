import { FiUser } from "react-icons/fi";
import Profile_pic from "../assest/images/profile.png"
import { ChatGPTMenu } from "./ChatGPTMenu";


function Header({ toggleMenu, isMenuOpen }) {
    return (
      <div className="flex items-center justify-between bg-white px-6 py-4" >
        <button className="flex items-center" onClick={toggleMenu}>
          <div className="text-xl font-semibold" style={{ fontSize: "27px", color: "#10A37F" }}>ChatGPT</div>
          <svg
            className="ml-1 w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {isMenuOpen && <ChatGPTMenu />}
        <div className="flex items-center space-x-4">
        <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
    {Profile_pic ? (
      <img
        src={Profile_pic}
        alt="Profile"
        className="w-full h-full rounded-full object-cover"
      />
    ) : (
      <FiUser className="text-gray-600" style={{ fontSize: "16px" }} />
    )}
  </div>
        </div>
      </div>
    );
  }
  export default Header;