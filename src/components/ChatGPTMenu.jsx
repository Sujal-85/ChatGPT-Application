import React from "react";
import ChatGPTPlusIconImage from "../assest/Icons/p1.png"; // Import the image
import ChatGPTMenuIconImage from "../assest/Icons/p3.png"; // Import the image
import TemporaryChatIconImage from "../assest/Icons/p2.png"; // Import the image

// ChatGPT Plus Icon with Image
const ChatGPTPlusIcon = () => (
  <img
    src={ChatGPTPlusIconImage} // Use the imported image
    alt="ChatGPT Plus Icon"
    width="60"
    height="60"
    style={{ borderRadius: "50%" }} // Optional: Add rounded corners if needed
  />
);

// ChatGPT Menu Icon with Image
const ChatGPTMenuIcon = () => (
  <img
    src={ChatGPTMenuIconImage} // Use the imported image
    alt="ChatGPT Menu Icon"
    width="60"
    height="60"
    style={{ borderRadius: "50%" }} // Optional: Add rounded corners if needed
  />
);

// Temporary Chat Icon with Image
const TemporaryChatIcon = () => (
  <img
    src={TemporaryChatIconImage} // Use the imported image
    alt="Temporary Chat Icon"
    width="60"
    height="60"
    style={{ borderRadius: "50%" }} // Optional: Add rounded corners if needed
  />
);

// MenuItemDetail Component
function MenuItemDetail({ icon, title, description, element }) {
  return (
    <div style={{ display: "flex", alignItems: "center", padding: "8px 12px", width: "100%" }}>
      <div style={{ marginRight: "12px" }}>{icon}</div>
      <div style={{ flex: "1" }}>
        <div style={{ fontWeight: "bold", fontSize: "16px" }}>{title}</div>
        {description && <div style={{ fontSize: "12px", color: "gray" }}>{description}</div>}
      </div>
      <div>{element}</div>
    </div>
  );
}

// Main ChatGPT Menu Component
export const ChatGPTMenu = () => {
  return (
    <div style={{ position: "absolute", top: "60px", left: "395px", zIndex: "1000", borderRadius:"20px" }}>
      <div
        style={{
          width: "400px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          backgroundColor: "#fff",
        }}
      >
        {/* ChatGPT Plus */}
        <div >
          <MenuItemDetail
            title="ChatGPT Plus"
            icon={<ChatGPTPlusIcon />}
            description="Our smartest model & more"
            element={
              <button
                style={{
                  background: "none",
                  border: "1px solid teal",
                  padding: "4px 12px",
                  borderRadius: "20px",
                  color: "black",
                  fontSize: "12px",
                  cursor: "pointer",
                }}
              >
                Upgrade
              </button>
            }
          />
        </div>

        {/* ChatGPT */}
        <div>
          <MenuItemDetail
            title="ChatGPT"
            icon={<ChatGPTMenuIcon />}
            description="Great for everyday tasks"
            element={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="green"
                width="16px"
                height="16px"
              >
                <path d="M10 16.5l-4-4 1.4-1.4 2.6 2.6 5.6-5.6L17 10z" />
              </svg>
            }
          />
        </div>


        {/* Temporary Chat */}
        <div>
          <MenuItemDetail
            title="Temporary Chat"
            icon={<TemporaryChatIcon />}
            element={
              <input
                type="checkbox"
                style={{ width: "16px", height: "16px", cursor: "pointer" }}
              />
            }
          />
        </div>
      </div>
    </div>
  );
};

export default ChatGPTMenu;