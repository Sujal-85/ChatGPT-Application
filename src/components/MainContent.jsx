import { useState, useRef, useEffect } from 'react';

function MainContent() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeFeature, setActiveFeature] = useState(null);
  const [attachments, setAttachments] = useState([]);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const messagesContainerRef = useRef(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if ((inputValue.trim() === '' && attachments.length === 0) || isLoading) return;
    
    // Add user message
    const userMessage = { 
      text: inputValue, 
      isUser: true,
      attachments: [...attachments]
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setAttachments([]);
    setIsLoading(true);
    
    try {
      // Prepare form data for API call
      const formData = new FormData();
      formData.append('message', inputValue);
      formData.append('mode', activeFeature || 'chat');
      attachments.forEach(file => {
        formData.append('attachments', file);
      });

      // Call backend API
      const response = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      setMessages(prev => [...prev, { 
        text: data.reply, 
        isUser: false 
      }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        text: "Sorry, I encountered an error. Please try again.", 
        isUser: false 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFeatureClick = (feature) => {
    setActiveFeature(activeFeature === feature ? null : feature);
  };

  const handleAttachmentClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setAttachments(prev => [...prev, ...files]);
  };

  const removeAttachment = (index) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const parseBoldText = (text) => {
    if (!text) return '';
    return text.split('**').map((part, i) => 
      i % 2 === 1 ? <strong key={i}>{part}</strong> : part
    );
  };

  return (
    <div className="flex-1 flex flex-col p-4" style={{ minHeight: 0 }}>
      {/* Messages Container */}
      <div 
  ref={messagesContainerRef}
  className="flex-1 w-full max-w-4xl mx-auto overflow-y-auto"
  style={{
    maxHeight: 'calc(100vh - 200px)',
    marginBottom: messages.length > 0 ? '1rem' : '0'
  }}
>
        {messages.length > 0 ? (
          <div className="space-y-6 pb-4" style={{ fontSize:"20px"}}>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-3xl rounded-2xl px-4 py-3 ${message.isUser 
                    ? 'text-black'  // Text color for user messages
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white'}`}
                  style={message.isUser ? { backgroundColor: '#f4f4f4', fontSize: "20px" } : {}}
                >
                  <p className="whitespace-pre-wrap">
        {parseBoldText(message.text)}
      </p>
                  {message.attachments?.length > 0 && (
                    <div className="mt-2 space-y-2">
                      {message.attachments.map((file, i) => (
                        <div key={i} className="text-sm text-blue-500 dark:text-blue-300">
                          {file.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl px-4 py-3">
                  <div className="flex space-x-2">
                    {[...Array(3)].map((_, i) => (
                      <div 
                        key={i}
                        className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"
                        style={{ animationDelay: `${i * 0.2}s` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-4 md:mb-6">
              What can I help with?
            </h2>
            
            {/* Centered Input Container when no messages */}
            <div className="w-full max-w-4xl mt-8">
              <div className="relative w-full">
                <div
                  className="relative w-full h-32 md:h-40 rounded-2xl md:rounded-3xl shadow-md"
                  style={{
                    fontFamily: "Arial, sans-serif",
                    backgroundColor: "white",
                  }}
                >
                  <input
                    type="text"
                    placeholder="Ask anything"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="w-full md:w-3/4 h-12 px-4 md:px-16 text-lg md:text-xl outline-none absolute top-4 md:top-8 left-0 md:left-4"
                    style={{
                      border: "none",
                      background: "transparent",
                    }}
                  />

                  {/* Send Button */}
                  <div className="absolute right-2 md:right-4 top-4 md:top-8">
                    <button
                      aria-label="Send prompt"
                      onClick={handleSendMessage}
                      disabled={isLoading || (inputValue.trim() === '' && attachments.length === 0)}
                      className={`flex items-center justify-center rounded-full transition-colors hover:opacity-70 h-10 w-10 md:h-12 md:w-12 ${
                        isLoading 
                          ? 'bg-gray-400 cursor-not-allowed' 
                          : 'bg-black text-white dark:bg-white dark:text-black'
                      }`}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon-xl"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M15.1918 8.90615C15.6381 8.45983 16.3618 8.45983 16.8081 8.90615L21.9509 14.049C22.3972 14.4953 22.3972 15.2189 21.9509 15.6652C21.5046 16.1116 20.781 16.1116 20.3347 15.6652L17.1428 12.4734V22.2857C17.1428 22.9169 16.6311 23.4286 15.9999 23.4286C15.3688 23.4286 14.8571 22.9169 14.8571 22.2857V12.4734L11.6652 15.6652C11.2189 16.1116 10.4953 16.1116 10.049 15.6652C9.60265 15.2189 9.60265 14.4953 10.049 14.049L15.1918 8.90615Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </button>
                  </div>

                  {/* Attachment Button */}
                  <div
                    className="absolute left-4 bottom-4 md:bottom-8 flex items-center justify-center rounded-full border border-gray-300 shadow-sm cursor-pointer hover:bg-gray-100 transition-colors"
                    style={{
                      width: "40px",
                      height: "40px",
                      fontSize: "20px",
                      color: "#666",
                    }}
                    onClick={handleAttachmentClick}
                  >
                    +
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      className="hidden"
                      multiple
                    />
                  </div>

                  {/* Feature Buttons */}
                  <div className="absolute left-4 md:left-16 bottom-16 md:bottom-7 flex gap-2 md:gap-4">
                    <button
                      onClick={() => handleFeatureClick('reason')}
                      className={`flex items-center justify-center p-2 rounded-full border transition-colors ${
                        activeFeature === 'reason'
                          ? 'bg-blue-100 border-blue-300 dark:bg-blue-900 dark:border-blue-700'
                          : 'border-gray-300 bg-white hover:bg-gray-100'
                      }`}
                      aria-pressed={activeFeature === 'reason'}
                      aria-label="Reason"
                    >
                      <svg
                        fill="none"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 md:h-6 md:w-6"
                      >
                        <path
                          d="m12 3c-3.585 0-6.5 2.9225-6.5 6.5385 0 2.2826 1.162 4.2913 2.9248 5.4615h7.1504c1.7628-1.1702 2.9248-3.1789 2.9248-5.4615 0-3.6159-2.915-6.5385-6.5-6.5385zm2.8653 14h-5.7306v1h5.7306v-1zm-1.1329 3h-3.4648c0.3458 0.5978 0.9921 1 1.7324 1s1.3866-0.4022 1.7324-1zm-5.6064 0c0.44403 1.7252 2.0101 3 3.874 3s3.43-1.2748 3.874-3c0.5483-0.0047 0.9913-0.4506 0.9913-1v-2.4593c2.1969-1.5431 3.6347-4.1045 3.6347-7.0022 0-4.7108-3.8008-8.5385-8.5-8.5385-4.6992 0-8.5 3.8276-8.5 8.5385 0 2.8977 1.4378 5.4591 3.6347 7.0022v2.4593c0 0.5494 0.44301 0.9953 0.99128 1z"
                          clipRule="evenodd"
                          fill="currentColor"
                          fillRule="evenodd"
                        ></path>
                      </svg>
                      <span className="hidden md:inline whitespace-nowrap pl-1">
                        Reason
                      </span>
                    </button>

                    <button
                      onClick={() => handleFeatureClick('search')}
                      className={`flex items-center justify-center p-2 rounded-full border transition-colors ${
                        activeFeature === 'search'
                          ? 'bg-blue-100 border-blue-300 dark:bg-blue-900 dark:border-blue-700'
                          : 'border-gray-300 bg-white hover:bg-gray-100'
                      }`}
                      aria-pressed={activeFeature === 'search'}
                      aria-label="Search"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 md:h-6 md:w-6"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM11.9851 4.00291C11.9933 4.00046 11.9982 4.00006 11.9996 4C12.001 4.00006 12.0067 4.00046 12.0149 4.00291C12.0256 4.00615 12.047 4.01416 12.079 4.03356C12.2092 4.11248 12.4258 4.32444 12.675 4.77696C12.9161 5.21453 13.1479 5.8046 13.3486 6.53263C13.6852 7.75315 13.9156 9.29169 13.981 11H10.019C10.0844 9.29169 10.3148 7.75315 10.6514 6.53263C10.8521 5.8046 11.0839 5.21453 11.325 4.77696C11.5742 4.32444 11.7908 4.11248 11.921 4.03356C11.953 4.01416 11.9744 4.00615 11.9851 4.00291ZM8.01766 11C8.08396 9.13314 8.33431 7.41167 8.72334 6.00094C8.87366 5.45584 9.04762 4.94639 9.24523 4.48694C6.48462 5.49946 4.43722 7.9901 4.06189 11H8.01766ZM4.06189 13H8.01766C8.09487 15.1737 8.42177 17.1555 8.93 18.6802C9.02641 18.9694 9.13134 19.2483 9.24522 19.5131C6.48461 18.5005 4.43722 16.0099 4.06189 13ZM10.019 13H13.981C13.9045 14.9972 13.6027 16.7574 13.1726 18.0477C12.9206 18.8038 12.6425 19.3436 12.3823 19.6737C12.2545 19.8359 12.1506 19.9225 12.0814 19.9649C12.0485 19.9852 12.0264 19.9935 12.0153 19.9969C12.0049 20.0001 11.9999 20 11.9999 20C11.9999 20 11.9948 20 11.9847 19.9969C11.9736 19.9935 11.9515 19.9852 11.9186 19.9649C11.8494 19.9225 11.7455 19.8359 11.6177 19.6737C11.3575 19.3436 11.0794 18.8038 10.8274 18.0477C10.3973 16.7574 10.0955 14.9972 10.019 13ZM15.9823 13C15.9051 15.1737 15.5782 17.1555 15.07 18.6802C14.9736 18.9694 14.8687 19.2483 14.7548 19.5131C17.5154 18.5005 19.5628 16.0099 19.9381 13H15.9823ZM19.9381 11C19.5628 7.99009 17.5154 5.49946 14.7548 4.48694C14.9524 4.94639 15.1263 5.45584 15.2767 6.00094C15.6657 7.41167 15.916 9.13314 15.9823 11H19.9381Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                      <span className="hidden md:inline whitespace-nowrap pl-1">
                        Search
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Input Container - Only shown when there are messages */}
      {messages.length > 0 && (
        <div className="w-full max-w-4xl mx-auto mt-4">
          {/* Attachments preview */}
          {attachments.length > 0 && (
            <div className="flex gap-2 mb-2 overflow-x-auto pb-2">
              {attachments.map((file, index) => (
                <div key={index} className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-2 text-sm">
                  <span className="truncate max-w-xs">{file.name}</span>
                  <button 
                    onClick={() => removeAttachment(index)}
                    className="ml-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
          
          <div className="relative w-full">
            <div
              className="relative w-full h-32 md:h-40 rounded-2xl md:rounded-3xl shadow-md"
              style={{
                fontFamily: "Arial, sans-serif",
                backgroundColor: "white",
              }}
            >
              <input
                type="text"
                placeholder="Ask anything"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full md:w-3/4 h-12 px-4 md:px-16 text-lg md:text-xl outline-none absolute top-4 md:top-6 left-0 md:left-4"
                style={{
                  border: "none",
                  background: "transparent",
                }}
              />

              <div className="absolute right-2 md:right-4 top-4 md:top-">
                <button
                  aria-label="Send prompt"
                  onClick={handleSendMessage}
                  disabled={isLoading || (inputValue.trim() === '' && attachments.length === 0)}
                  className={`flex items-center justify-center rounded-full transition-colors hover:opacity-70 h-10 w-10 md:h-12 md:w-12 ${
                    isLoading 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-black text-white dark:bg-white dark:text-black'
                  }`}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon-xl"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M15.1918 8.90615C15.6381 8.45983 16.3618 8.45983 16.8081 8.90615L21.9509 14.049C22.3972 14.4953 22.3972 15.2189 21.9509 15.6652C21.5046 16.1116 20.781 16.1116 20.3347 15.6652L17.1428 12.4734V22.2857C17.1428 22.9169 16.6311 23.4286 15.9999 23.4286C15.3688 23.4286 14.8571 22.9169 14.8571 22.2857V12.4734L11.6652 15.6652C11.2189 16.1116 10.4953 16.1116 10.049 15.6652C9.60265 15.2189 9.60265 14.4953 10.049 14.049L15.1918 8.90615Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </button>
              </div>

              <div
                className="absolute left-4 bottom-4 md:bottom-8 flex items-center justify-center rounded-full border border-gray-300 shadow-sm cursor-pointer hover:bg-gray-100 transition-colors"
                style={{
                  width: "40px",
                  height: "40px",
                  fontSize: "20px",
                  color: "#666",
                }}
                onClick={handleAttachmentClick}
              >
                +
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  multiple
                />
              </div>

              <div className="absolute left-4 md:left-16 bottom-16 md:bottom-7 flex gap-2 md:gap-4">
                <button
                  onClick={() => handleFeatureClick('reason')}
                  className={`flex items-center justify-center p-2 rounded-full border transition-colors ${
                    activeFeature === 'reason'
                      ? 'bg-blue-100 border-blue-300 dark:bg-blue-900 dark:border-blue-700'
                      : 'border-gray-300 bg-white hover:bg-gray-100'
                  }`}
                  aria-pressed={activeFeature === 'reason'}
                  aria-label="Reason"
                >
                  <svg
                    fill="none"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 md:h-6 md:w-6"
                  >
                    <path
                      d="m12 3c-3.585 0-6.5 2.9225-6.5 6.5385 0 2.2826 1.162 4.2913 2.9248 5.4615h7.1504c1.7628-1.1702 2.9248-3.1789 2.9248-5.4615 0-3.6159-2.915-6.5385-6.5-6.5385zm2.8653 14h-5.7306v1h5.7306v-1zm-1.1329 3h-3.4648c0.3458 0.5978 0.9921 1 1.7324 1s1.3866-0.4022 1.7324-1zm-5.6064 0c0.44403 1.7252 2.0101 3 3.874 3s3.43-1.2748 3.874-3c0.5483-0.0047 0.9913-0.4506 0.9913-1v-2.4593c2.1969-1.5431 3.6347-4.1045 3.6347-7.0022 0-4.7108-3.8008-8.5385-8.5-8.5385-4.6992 0-8.5 3.8276-8.5 8.5385 0 2.8977 1.4378 5.4591 3.6347 7.0022v2.4593c0 0.5494 0.44301 0.9953 0.99128 1z"
                      clipRule="evenodd"
                      fill="currentColor"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                  <span className="hidden md:inline whitespace-nowrap pl-1">
                    Reason
                  </span>
                </button>

                <button
                  onClick={() => handleFeatureClick('search')}
                  className={`flex items-center justify-center p-2 rounded-full border transition-colors ${
                    activeFeature === 'search'
                      ? 'bg-blue-100 border-blue-300 dark:bg-blue-900 dark:border-blue-700'
                      : 'border-gray-300 bg-white hover:bg-gray-100'
                  }`}
                  aria-pressed={activeFeature === 'search'}
                  aria-label="Search"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 md:h-6 md:w-6"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM11.9851 4.00291C11.9933 4.00046 11.9982 4.00006 11.9996 4C12.001 4.00006 12.0067 4.00046 12.0149 4.00291C12.0256 4.00615 12.047 4.01416 12.079 4.03356C12.2092 4.11248 12.4258 4.32444 12.675 4.77696C12.9161 5.21453 13.1479 5.8046 13.3486 6.53263C13.6852 7.75315 13.9156 9.29169 13.981 11H10.019C10.0844 9.29169 10.3148 7.75315 10.6514 6.53263C10.8521 5.8046 11.0839 5.21453 11.325 4.77696C11.5742 4.32444 11.7908 4.11248 11.921 4.03356C11.953 4.01416 11.9744 4.00615 11.9851 4.00291ZM8.01766 11C8.08396 9.13314 8.33431 7.41167 8.72334 6.00094C8.87366 5.45584 9.04762 4.94639 9.24523 4.48694C6.48462 5.49946 4.43722 7.9901 4.06189 11H8.01766ZM4.06189 13H8.01766C8.09487 15.1737 8.42177 17.1555 8.93 18.6802C9.02641 18.9694 9.13134 19.2483 9.24522 19.5131C6.48461 18.5005 4.43722 16.0099 4.06189 13ZM10.019 13H13.981C13.9045 14.9972 13.6027 16.7574 13.1726 18.0477C12.9206 18.8038 12.6425 19.3436 12.3823 19.6737C12.2545 19.8359 12.1506 19.9225 12.0814 19.9649C12.0485 19.9852 12.0264 19.9935 12.0153 19.9969C12.0049 20.0001 11.9999 20 11.9999 20C11.9999 20 11.9948 20 11.9847 19.9969C11.9736 19.9935 11.9515 19.9852 11.9186 19.9649C11.8494 19.9225 11.7455 19.8359 11.6177 19.6737C11.3575 19.3436 11.0794 18.8038 10.8274 18.0477C10.3973 16.7574 10.0955 14.9972 10.019 13ZM15.9823 13C15.9051 15.1737 15.5782 17.1555 15.07 18.6802C14.9736 18.9694 14.8687 19.2483 14.7548 19.5131C17.5154 18.5005 19.5628 16.0099 19.9381 13H15.9823ZM19.9381 11C19.5628 7.99009 17.5154 5.49946 14.7548 4.48694C14.9524 4.94639 15.1263 5.45584 15.2767 6.00094C15.6657 7.41167 15.916 9.13314 15.9823 11H19.9381Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                  <span className="hidden md:inline whitespace-nowrap pl-1">
                    Search
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MainContent;