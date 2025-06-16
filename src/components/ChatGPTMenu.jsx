import React, { useState, useEffect } from "react";
import ChatGPTPlusIconImage from "../assest/Icons/p1.png"; // Import the image
import ChatGPTMenuIconImage from "../assest/Icons/p3.png"; // Import the image
import TemporaryChatIconImage from "../assest/Icons/p2.png"; // Import the image

// ChatGPT Plus Icon with Image
const ChatGPTPlusIcon = ({ isMobile }) => (
  <img
    src={ChatGPTPlusIconImage} // Use the imported image
    alt="ChatGPT Plus Icon"
    width={isMobile ? "40" : "60"}
    height={isMobile ? "40" : "60"}
    style={{ borderRadius: "50%" }} // Optional: Add rounded corners if needed
  />
);

// ChatGPT Menu Icon with Image
const ChatGPTMenuIcon = ({ isMobile }) => (
  <img
    src={ChatGPTMenuIconImage} // Use the imported image
    alt="ChatGPT Menu Icon"
    width={isMobile ? "40" : "60"}
    height={isMobile ? "40" : "60"}
    style={{ borderRadius: "50%" }} // Optional: Add rounded corners if needed
  />
);

// Temporary Chat Icon with Image
const TemporaryChatIcon = ({ isMobile }) => (
  <img
    src={TemporaryChatIconImage} // Use the imported image
    alt="Temporary Chat Icon"
    width={isMobile ? "40" : "60"}
    height={isMobile ? "40" : "60"}
    style={{ borderRadius: "50%" }} // Optional: Add rounded corners if needed
  />
);

// MenuItemDetail Component
function MenuItemDetail({ icon, title, description, element, isMobile }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: isMobile ? "6px 8px" : "8px 12px",
        width: "100%",
      }}
    >
      <div style={{ marginRight: isMobile ? "8px" : "12px" }}>{icon}</div>
      <div style={{ flex: "1" }}>
        <div
          style={{
            fontWeight: "bold",
            fontSize: isMobile ? "14px" : "16px",
          }}
        >
          {title}
        </div>
        {description && (
          <div
            style={{
              fontSize: isMobile ? "10px" : "12px",
              color: "gray",
            }}
          >
            {description}
          </div>
        )}
      </div>
      <div>{element}</div>
    </div>
  );
}

// Main ChatGPT Menu Component
export const ChatGPTMenu = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        top: "10px",
        left: isMobile ? "0" : "395px",
        zIndex: "1000",
        borderRadius: "20px",
        width: isMobile ? "100%" : "auto",
        maxWidth: isMobile ? "calc(100vw - 20px)" : "none",
      }}
    >
      <div
        style={{
          width: isMobile ? "100%" : "400px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          backgroundColor: "#fff",
        }}
      >
        {/* ChatGPT Plus */}
        <div>
          <MenuItemDetail
            title="ChatGPT Plus"
            icon={<ChatGPTPlusIcon isMobile={isMobile} />}
            description="Our smartest model & more"
            element={
              <button
                style={{
                  background: "none",
                  border: "1px solid teal",
                  padding: isMobile ? "3px 8px" : "4px 12px",
                  borderRadius: "20px",
                  color: "black",
                  fontSize: isMobile ? "8px" : "12px",
                  cursor: "pointer",
                }}
              >
                Upgrade
              </button>
            }
            isMobile={isMobile}
          />
        </div>

        {/* ChatGPT */}
        <div>
          <MenuItemDetail
            title="ChatGPT (Coming Soon..)"
            icon={<ChatGPTMenuIcon isMobile={isMobile} />}
            description="Great for everyday tasks"
            element={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="green"
                width={isMobile ? "14px" : "16px"}
                height={isMobile ? "14px" : "16px"}
              >
                <path d="M10 16.5l-4-4 1.4-1.4 2.6 2.6 5.6-5.6L17 10z" />
              </svg>
            }
            isMobile={isMobile}
          />
        </div>

        {/* Temporary Chat */}
        <div>
          <MenuItemDetail
            title="Temporary Chat"
            icon={<TemporaryChatIcon isMobile={isMobile} />}
            element={
              <input
                type="checkbox"
                style={{
                  width: isMobile ? "14px" : "16px",
                  height: isMobile ? "14px" : "16px",
                  cursor: "pointer",
                }}
              />
            }
            isMobile={isMobile}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatGPTMenu;