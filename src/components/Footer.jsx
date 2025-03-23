import { FaQuestionCircle } from "react-icons/fa";
function Footer() {
    return (
      <div className="relative py-4 text-center text-gray-600" style={{ fontSize: "16px" }}>
        ChatGPT can make mistakes. Check important info.
        <FaQuestionCircle className="absolute bottom-0 right-0 text-gray-500 text-lg cursor-pointer m-4" />
      </div>
    );
  }
  export default Footer;