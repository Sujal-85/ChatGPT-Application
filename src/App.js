import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import MainContent from "./components/MainContent";
import Footer from "./components/Footer";
import Auth from "./components/Auth";
import "./App.css";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing user data:', error);
        setUser(null);
      }
    }
    // Ensure loader is visible for at least 2 seconds
    setTimeout(() => {
      setLoading(false);
    }, 2000); // 2-second delay
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex h-screen">
      {loading ? (
        <div className="flex items-center justify-center w-full h-full bg-gray-50 dark:bg-[#161616]">
          <div
            className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
            aria-label="Loading"
          ></div>
        </div>
      ) : user ? (
        <>
          <Sidebar />
          <div className="flex-1 flex flex-col bg-gray-50 dark:bg-[#161616]">
            <Header
              toggleMenu={toggleMenu}
              isMenuOpen={isMenuOpen}
              user={user}
              setUser={setUser}
            />
            <MainContent />
            <Footer />
          </div>
        </>
      ) : (
        <Auth setUser={setUser} />
      )}
    </div>
  );
}