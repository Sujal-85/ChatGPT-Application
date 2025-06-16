import { useState, useEffect, useRef } from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import { ChatGPTMenu } from "./ChatGPTMenu";
import placeholder from "../assest/images/placeholder.png"
function Header({ toggleMenu, isMenuOpen }) {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });
  const [user, setUser] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && isMenuOpen) {
        toggleMenu();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen, toggleMenu]);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing user data:', error);
        setUser(null);
      }
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleSignOut = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Debugging to confirm menu state
  useEffect(() => {
    console.log("Header: isMenuOpen =", isMenuOpen);
  }, [isMenuOpen]);

  return (
    <header className="bg-transparent dark:bg-[#161616] border-b border-gray-200 dark:border-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-16">
          <div className="flex items-center relative" ref={menuRef}>
            <button
              className="flex items-center focus:outline-none p-1 sm:p-2"
              onClick={toggleMenu}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <div className="flex text-lg ml-16 md:ml-0 sm:text-xl md:text-2xl font-semibold text-[#10A37F] dark:text-[#10A37F]">
                ChatGPT
                <svg
                  className={`flex ml-2 sm:ml-2 mt-2 sm:mt-2 w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-gray-600 dark:text-gray-300 transition-transform duration-200 ${isMenuOpen ? 'rotate-180' : ''}`}
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
              </div>
            </button>
            {isMenuOpen && (
              <div className="absolute top-12 sm:top-16 left-14 md:-left-96 w-60 sm:w-48 bg-transparent dark:bg-[#161616] border border-gray-200 dark:border-[#1A1A1A] rounded-lg shadow-lg z-50">
                <ChatGPTMenu />
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-1 sm:p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#1f1f1f] focus:outline-none transition-colors duration-200"
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? (
                <FiSun className="h-4 w-4 sm:h-5 sm:w-5" />
              ) : (
                <FiMoon className="h-4 w-4 sm:h-5 sm:w-5" />
              )}
            </button>

            {user ? (
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 sm:h-12 sm:w-12 rounded-full bg-gray-200 dark:bg-[#1A1A1A] overflow-hidden">
                  <img
                    src={user.picture || placeholder}
                    alt="Profile"
                    className="h-full w-full dark:bg-[#1A1A1A] object-cover"
                  />
                </div>
                <button
                  onClick={handleSignOut}
                  className="p-1 sm:p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#1f1f1f] focus:outline-none transition-colors duration-200 text-sm"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="h-8 w-8 sm:h-12 sm:w-12 rounded-full bg-gray-200 dark:bg-[#1A1A1A] overflow-hidden">
                <img
                  src={placeholder}
                  alt="Profile"
                  className="h-full w-full dark:bg-[#1A1A1A] object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;