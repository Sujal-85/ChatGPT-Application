import { FiUser } from "react-icons/fi";
import Profile_pic from "../assest/images/profile.png";
import { ChatGPTMenu } from "./ChatGPTMenu";

function Header({ toggleMenu, isMenuOpen }) {
  return (
    <header className="flex items-center justify-between bg-white px-4 py-3 md:px-6 md:py-4 shadow-sm">
      {/* Left side - Logo and Menu Button */}
      <div className="flex items-center">
        <button 
          className="flex items-center focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <div 
            className="text-xl md:text-2xl font-semibold" 
            style={{ color: "#10A37F" }}
          >
            ChatGPT
          </div>
          <svg
            className="ml-1 w-4 h-4 md:w-5 md:h-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M19 9l-7 7-7-7" 
            />
          </svg>
        </button>
      </div>

      {/* Menu Dropdown */}
      {isMenuOpen && (
        <div className="absolute left-0 top-16 w-full z-50 md:w-auto md:left-4 md:top-16">
          <ChatGPTMenu />
        </div>
      )}

      {/* Right side - Profile */}
      <div className="flex items-center">
        <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
          {Profile_pic ? (
            <img
              src={Profile_pic}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <FiUser className="text-gray-600 text-sm md:text-base" />
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;