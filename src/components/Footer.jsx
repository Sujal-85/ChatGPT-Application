import { FaQuestionCircle } from "react-icons/fa";

function Footer() {
  return (
    <footer className="relative py-3 md:py-4 text-center text-gray-600 text-sm md:text-base">
      <div className="container mx-auto px-4">
        <p className="inline-block">
          ChatGPT can make mistakes. Consider checking important information.
          <button 
            aria-label="Learn more about ChatGPT accuracy"
            className="ml-2 text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <FaQuestionCircle className="inline align-middle text-lg" />
          </button>
        </p>
      </div>
    </footer>
  );
}

export default Footer;