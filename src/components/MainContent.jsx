import React from 'react';
import { ThumbsUp, ThumbsDown, Volume2, CirclePause } from 'lucide-react';

function InputContainer({
  inputValue,
  setInputValue,
  handleKeyPress,
  handleSendMessage,
  isLoading,
  attachments,
  activeFeature,
  handleFeatureClick,
  handleAttachmentClick,
  handleFileChange,
  fileInputRef,
  isRecording,
  handleVoiceRecording,
  scrollToBottom,
  isChatSelected,
}) {
  return (
    <div className="relative w-full">
      <div
        className="relative w-full h-24 sm:h-24 md:h-36 rounded-xl sm:rounded-2xl md:rounded-3xl border dark:border-none shadow-md bg-white dark:bg-[#2A2A2A]"
        style={{ fontFamily: "Arial, sans-serif" }}
      >
        {isChatSelected && (
          <button
            className="cursor-pointer absolute z-10 rounded-full bg-clip-padding text-token-text-secondary end-1/2 translate-x-1/2 bg-[#eeeeee] dark:bg-[#2A2A2A] dark:text-white w-10 h-10 flex items-center justify-center -top-12"
            onClick={scrollToBottom}
            aria-label="Scroll to bottom"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              className="icon text-token-text-primary"
            >
              <path
                d="M9.33468 3.33333C9.33468 2.96617 9.6326 2.66847 9.99972 2.66829C10.367 2.66829 10.6648 2.96606 10.6648 3.33333V15.0609L15.363 10.3626L15.4675 10.2777C15.7255 10.1074 16.0762 10.1357 16.3034 10.3626C16.5631 10.6223 16.5631 11.0443 16.3034 11.304L10.4704 17.137C10.2108 17.3967 9.7897 17.3966 9.52999 17.137L3.69601 11.304L3.61105 11.1995C3.44054 10.9414 3.46874 10.5899 3.69601 10.3626C3.92328 10.1354 4.27479 10.1072 4.53292 10.2777L4.63741 10.3626L9.33468 15.0599V3.33333Z"
              />
            </svg>
          </button>
        )}

        <input
          type="text"
          placeholder="Ask anything"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          className="w-full sm:w-11/12 md:w-3/4 h-10 sm:h-12 px-3 sm:px-4 md:px-16 text-base sm:text-lg md:text-xl outline-none absolute top-3 sm:top-4 md:top-6 left-0 sm:left-2 md:left-4 bg-transparent text-gray-900 dark:text-white dark:placeholder-text-[12px] placeholder-gray-500 dark:placeholder-gray-400"
          style={{ border: "none" }}
        />

        <div className="absolute right-8 top-4 sm:top-4 md:top-6 flex flex-col gap-2 sm:gap-4">
          <button
            aria-label="Send prompt"
            onClick={handleSendMessage}
            disabled={isLoading || (inputValue.trim() === '' && attachments.length === 0)}
            className={`flex items-center justify-center rounded-full transition-colors hover:opacity-70 h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 ${
              isLoading 
                ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed' 
                : 'bg-black text-white dark:bg-white dark:text-black'
            }`}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="icon-lg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.1918 8.90615C15.6381 8.45983 16.3618 8.45983 16.8081 8.90615L21.9509 14.049C22.3972 14.4953 22.3972 15.2189 21.9509 15.6652C21.5046 16.1116 20.781 16.1116 20.3347 15.6652L17.1428 12.4734V22.2857C17.1428 22.9169 16.6311 23.4286 15.9999 23.4286C15.3688 23.4286 14.8571 22.9169 14.8571 22.2857V12.4734L11.6652 15.6652C11.2189 16.1116 10.4953 16.1116 10.049 15.6652C9.60265 15.2189 9.60265 14.4953 10.049 14.049L15.1918 8.90615Z"
                fill="currentColor"
              />
            </svg>
          </button>
          
          <button
            type="button"
            aria-label={isRecording ? "Stop recording" : "Start voice recording"}
            onClick={handleVoiceRecording}
            className={`flex items-center justify-center rounded-full transition-all duration-200 h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 ${
              isRecording 
                ? 'bg-red-500 text-white animate-pulse shadow-lg shadow-red-500/30' 
                : 'bg-gray-100 dark:bg-[#1A1A1A] text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-[#2A2A2A]'
            }`}
            aria-describedby="record-tooltip"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 20 20"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              className="icon"
            >
              <path
                d="M15.7806 10.1963C16.1326 10.3011 16.3336 10.6714 16.2288 11.0234L16.1487 11.2725C15.3429 13.6262 13.2236 15.3697 10.6644 15.6299L10.6653 16.835H12.0833L12.2171 16.8486C12.5202 16.9106 12.7484 17.1786 12.7484 17.5C12.7484 17.8214 12.5202 18.0894 12.2171 18.1514L12.0833 18.165H7.91632C7.5492 18.1649 7.25128 17.8672 7.25128 17.5C7.25128 17.1328 7.5492 16.8351 7.91632 16.835H9.33527L9.33429 15.6299C6.775 15.3697 4.6558 13.6262 3.84992 11.2725L3.76984 11.0234L3.74445 10.8906C3.71751 10.5825 3.91011 10.2879 4.21808 10.1963C4.52615 10.1047 4.84769 10.2466 4.99347 10.5195L5.04523 10.6436L5.10871 10.8418C5.8047 12.8745 7.73211 14.335 9.99933 14.335C12.3396 14.3349 14.3179 12.7789 14.9534 10.6436L15.0052 10.5195C15.151 10.2466 15.4725 10.1046 15.7806 10.1963ZM12.2513 5.41699C12.2513 4.17354 11.2437 3.16521 10.0003 3.16504C8.75675 3.16504 7.74835 4.17343 7.74835 5.41699V9.16699C7.74853 10.4104 8.75685 11.418 10.0003 11.418C11.2436 11.4178 12.2511 10.4103 12.2513 9.16699V5.41699ZM13.5814 9.16699C13.5812 11.1448 11.9781 12.7479 10.0003 12.748C8.02232 12.748 6.41845 11.1449 6.41828 9.16699V5.41699C6.41828 3.43889 8.02221 1.83496 10.0003 1.83496C11.9783 1.83514 13.5814 3.439 13.5814 5.41699V9.16699Z"
              />
            </svg>
          </button>
          <span id="record-tooltip" className="tooltip">Coming soon</span>
        </div>

        <div
          className="absolute sm:w-[40px] sm:h-[40px] left-2 sm:left-3 md:left-4 bottom-3 sm:bottom-4 md:bottom-8 flex items-center justify-center rounded-full shadow-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-[#1A1A1A] transition-colors"
          style={{ width: "35px", height: "35px", fontSize: "24px", color: "#666" }}
          onClick={handleAttachmentClick}
          aria-label="Attach file"
          aria-describedby="files-tooltip"
        >
          +
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            multiple
          />
          <span id="files-tooltip" className="tooltip">Coming soon</span>
        </div>

        <div className="absolute left-12 sm:left-14 md:left-16 bottom-3 sm:bottom-4 md:bottom-7 flex gap-1 sm:gap-2 md:gap-6">
          <div className="relative group">
            <button
              onClick={() => handleFeatureClick('reason')}
              className={`flex items-center justify-center p-1 sm:p-2 rounded-full dark:hover:bg-[#262626] transition-colors`}
              aria-pressed={activeFeature === 'reason'}
              aria-label="Reason"
              aria-describedby="reason-tooltip"
            >
              <svg
                fill="none"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 dark:text-white"
              >
                <path
                  d="m12 3c-3.585 0-6.5 2.9225-6.5 6.5385 0 2.2826 1.162 4.2913 2.9248 5.4615h7.1504c1.7628-1.1702 2.9248-3.1789 2.9248-5.4615 0-3.616-2.915-6.5385-6.5-6.5385zm2.8653 14h-5.7306v1h5.7306v-1zm-1.1329 3h-3.4648c0.3458 0.5978 0.9921 1 1.7324 1s1.3866-0.4022 1.7324-1zm-5.6064 0c0.44403 1.7252 2.0101 3 3.874 3s3.43-1.2748 3.874-3c0.5483-0.0047 0.9913-0.4506 0.9913-1v-2.4593c2.1969-1.5431 3.6347-4.1045 3.6347-7.0022 0-4.7108-3.8008-8.5385-8.5-8.5385-4.6992 0-8.5 3.8276-8.5 8.5385 0 2.8977 1.4378 5.4591 3.6347 7.0022v2.4593c0 0.5494 0.44301 0.9953 0.99128 1z"
                  clipRule="evenodd"
                  fill="currentColor"
                  fillRule="evenodd"
                />
              </svg>
              <span className="hidden sm:inline whitespace-nowrap pl-1 text-gray-900 dark:text-white text-sm">
                Reason
              </span>
            </button>
            <span id="reason-tooltip" className="tooltip">Coming soon</span>
          </div>

          <div className="relative group">
            <button
              onClick={() => handleFeatureClick('search')}
              className={`flex items-center justify-center p-1 sm:p-2 rounded-full dark:hover:bg-[#262626] transition-colors`}
              aria-pressed={activeFeature === 'search'}
              aria-label="Search"
              aria-describedby="search-tooltip"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 dark:text-white"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM11.9851 4.00291C11.9933 4.00046 11.9982 4.00006 11.9996 4C12.001 4.00006 12.0067 4.00046 12.0149 4.00291C12.0256 4.00615 12.047 4.01416 12.079 4.03356C12.2092 4.11248 12.4258 4.32444 12.675 4.77696C12.9161 5.21453 13.1479 5.8046 13.3486 6.53263C13.6852 7.75315 13.9156 9.29169 13.981 11H10.019C10.0844 9.29169 10.3148 7.75315 10.6514 6.53263C10.8521 5.8046 11.0839 5.21453 11.325 4.77696C11.5742 4.32444 11.7908 4.11248 11.921 4.03356C11.953 4.01416 11.9744 4.00615 11.9851 4.00291ZM8.01766 11C8.08396 9.13314 8.33431 7.41167 8.72334 6.00094C8.87366 5.45584 9.04762 4.94639 9.24523 4.48694C6.48462 5.49946 4.43722 7.9901 4.06189 11H8.01766ZM4.06189 13H8.01766C8.09487 15.1737 8.42177 17.1555 8.93 18.6802C9.02641 18.9694 9.13134 19.2483 9.24522 19.5131C6.48461 18.5005 4.43722 16.0099 4.06189 13ZM10.019 13H13.981C13.9045 14.9972 13.6027 16.7574 13.1726 18.0477C12.9206 18.8038 12.6425 19.3436 12.3823 19.6737C12.2545 19.8359 12.1506 19.9225 12.0814 19.9649C12.0485 19.9852 12.0264 19.9935 12.0153 19.9969C12.0049 20.0001 11.9999 20 11.9999 20C11.9999 20 11.9948 20 11.9847 19.9969C11.9736 19.9935 11.9515 19.9852 11.9186 19.9649C11.8494 19.9225 11.7455 19.8359 11.6177 19.6737C11.3575 19.3436 11.0794 18.8038 10.8274 18.0477C10.3973 16.7574 10.0955 14.9972 10.019 13ZM15.9823 13C15.9051 15.1737 15.5782 17.1555 15.07 18.6802C14.9736 18.9694 14.8687 19.2483 14.7548 19.5131C17.5154 18.5005 19.5628 16.0099 19.9381 13H15.9823ZM19.9381 11C19.5628 7.99009 17.5154 5.49946 14.7548 4.48694C14.9524 4.94639 15.1263 5.45584 15.2767 6.00094C15.6657 7.41167 15.916 9.13314 15.9823 11H19.9381Z"
                  fill="currentColor"
                />
              </svg>
              <span className="hidden sm:inline whitespace-nowrap pl-1 text-gray-900 dark:text-white text-sm">
                Search
              </span>
            </button>
            <span id="search-tooltip" className="tooltip">Coming soon</span>
          </div>
        </div>
        
        {isRecording && (
          <div className="absolute top-1 sm:top-2 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium flex items-center gap-1 sm:gap-2">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full animate-pulse"></div>
            Recording...
          </div>
        )}

        <style jsx>{`
          .tooltip {
            visibility: hidden;
            position: absolute;
            bottom: -30px;
            left: 50%;
            transform: translateX(-50%);
            background-color: black;
            color: white;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            white-space: nowrap;
            z-index: 10;
            opacity: 0;
            transition: opacity 0.3s ease, visibility 0.3s ease;
          }
          .dark .tooltip {
            background-color: #2A2A2A;
            color: #fff;
            border: 1px solid #444;
          }
          .group > button:hover + .tooltip,
          .group:hover > .tooltip {
            visibility: visible;
            opacity: 1;
          }
          .tooltip::after {
            content: '';
            position: absolute;
            top: -10px;
            left: 50%;
            transform: translateX(-50%);
            border-width: 5px;
            border-style: solid;
            border-color: transparent transparent black transparent;
          }
          .dark .tooltip::after {
            border-color: transparent transparent #2A2A2A transparent;
          }
        `}</style>
      </div>
    </div>
  );
}

function MainContent() {
  const [messages, setMessages] = React.useState([]);
  const [inputValue, setInputValue] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [activeFeature, setActiveFeature] = React.useState(null);
  const [attachments, setAttachments] = React.useState([]);
  const [isRecording, setIsRecording] = React.useState(false);
  const [greeting, setGreeting] = React.useState('What can I help with?');
  const [user, setUser] = React.useState(null);
  const [editingIndex, setEditingIndex] = React.useState(null);
  const [editText, setEditText] = React.useState('');
  const [feedback, setFeedback] = React.useState({}); // Track likes/dislikes
  const [speakingIndex, setSpeakingIndex] = React.useState(null); // Track which message is being read
  const [speechInstance, setSpeechInstance] = React.useState(null); // Track SpeechSynthesisUtterance
  const messagesEndRef = React.useRef(null);
  const fileInputRef = React.useRef(null);
  const messagesContainerRef = React.useRef(null);
  const recognitionRef = React.useRef(null);

  const greetings = React.useMemo(() => user
    ? [
        "What can I help with?",
        "What's on the agenda today?",
        "Are you ready?",
        "What's on your mind?",
        "How can I assist you today?",
        "What's up next for you?",
        "What are you working on?",
        `Hey, ${user.name.split(' ')[0]} Ready to dive in?`
      ]
    : [
        "What can I help with?",
        "What's on the agenda today?",
        "Are you ready?",
        "What's on your mind?",
        "How can I assist you today?",
        "Got any big plans?",
        "What's up next for you?",
        "What are you working on?"
      ], [user]);

  React.useEffect(() => {
    const randomIndex = Math.floor(Math.random() * greetings.length);
    setGreeting(greetings[randomIndex]);
  }, [greetings]);

  if (!window.chatHistory) {
    window.chatHistory = [];
  }

  React.useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser && typeof parsedUser === 'object' && parsedUser.name) {
          setUser(parsedUser);
        }
      } catch (error) {
        console.error('Error parsing user from localStorage:', error);
      }
    }
  }, []);

  React.useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            transcript += event.results[i][0].transcript;
          }
        }
        if (transcript) {
          setInputValue(prev => prev + transcript + ' ');
        }
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsRecording(false);
      };

      recognitionRef.current.onend = () => {
        setIsRecording(false);
      };
    }
  }, []);

  React.useEffect(() => {
    const savedHistory = window.chatHistory || [];
    if (savedHistory.length > 0) {
      const formattedMessages = savedHistory.flatMap(chat => [
        { text: chat.query, isUser: true },
        { text: chat.response, isUser: false }
      ]);
      setMessages(formattedMessages);
    }
  }, []);

  React.useEffect(() => {
    const handleLoadChat = (event) => {
      if (event.detail && event.detail.message && event.detail.response) {
        setMessages([
          { text: event.detail.message, isUser: true },
          { text: event.detail.response, isUser: false }
        ]);
      }
    };
    window.addEventListener('loadChat', handleLoadChat);
    return () => window.removeEventListener('loadChat', handleLoadChat);
  }, []);

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleVoiceRecording = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in your browser. Please use Chrome, Safari, or Edge.');
      return;
    }
    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      recognitionRef.current.start();
      setIsRecording(true);
    }
  };

  const handleSendMessage = async () => {
    if ((inputValue.trim() === '' && attachments.length === 0) || isLoading) return;
    const userMessage = { text: inputValue, isUser: true, attachments: [...attachments] };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setAttachments([]);
    setIsLoading(true);
    
    try {
      const formData = new FormData();
      formData.append('message', inputValue);
      formData.append('mode', activeFeature || 'chat');
      attachments.forEach(file => formData.append('attachments', file));

      const response = await fetch('https://chatgpt-application.onrender.com/chat', {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      const aiResponse = { text: data.reply, isUser: false };
      setMessages(prev => [...prev, aiResponse]);

      if (!window.chatHistory) window.chatHistory = [];
      window.chatHistory.push({ message: inputValue, response: data.reply });

      window.dispatchEvent(new CustomEvent('newChatMessage', {
        detail: { message: inputValue, response: data.reply }
      }));
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = { text: "Sorry, I encountered an error. Please try again.", isUser: false };
      setMessages(prev => [...prev, errorMessage]);

      window.dispatchEvent(new CustomEvent('newChatMessage', {
        detail: { message: inputValue, response: "Error: Failed to get response" }
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegenerate = async (index) => {
    if (index % 2 !== 1 || index === 0) return;
    const userMessage = messages[index - 1];
    if (!userMessage || !userMessage.isUser) return;

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('message', userMessage.text);
      formData.append('mode', activeFeature || 'chat');
      userMessage.attachments?.forEach(file => formData.append('attachments', file));

      const response = await fetch('https://chatgpt-application.onrender.com/chat', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      const newAiResponse = { text: data.reply, isUser: false };
      const updatedMessages = [...messages];
      updatedMessages[index] = newAiResponse;
      setMessages(updatedMessages);

      if (window.chatHistory) {
        window.chatHistory[Math.floor(index / 2)] = {
          message: userMessage.text,
          response: data.reply
        };
      }
    } catch (error) {
      console.error('Error regenerating response:', error);
      const errorMessage = { text: "Sorry, I encountered an error while regenerating. Please try again.", isUser: false };
      const updatedMessages = [...messages];
      updatedMessages[index] = errorMessage;
      setMessages(updatedMessages);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => alert('Message copied to clipboard!'))
      .catch(err => {
        console.error('Failed to copy:', err);
        alert('Failed to copy message.');
      });
  };

  const handleEdit = (index, text) => {
    setEditingIndex(index);
    setEditText(text);
  };

  const handleSaveEdit = (index) => {
    const updatedMessages = [...messages];
    updatedMessages[index] = { ...updatedMessages[index], text: editText };
    setMessages(updatedMessages);
    setEditingIndex(null);
    setEditText('');
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditText('');
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

  const handleLike = (index) => {
    setFeedback(prev => ({
      ...prev,
      [index]: prev[index] === 'like' ? null : 'like'
    }));
    // Optionally, send feedback to the server
    // Example: await fetch('http://localhost:3001/api/feedback', { method: 'POST', body: JSON.stringify({ messageId: index, feedback: 'like' }) });
  };

  const handleDislike = (index) => {
    setFeedback(prev => ({
      ...prev,
      [index]: prev[index] === 'dislike' ? null : 'dislike'
    }));
    // Optionally, send feedback to the server
    // Example: await fetch('http://localhost:3001/api/feedback', { method: 'POST', body: JSON.stringify({ messageId: index, feedback: 'dislike' }) });
  };

  const handleReadAloud = (index, text) => {
    if ('speechSynthesis' in window) {
      if (speakingIndex === index) {
        return;
      }
      if (speechInstance) {
        window.speechSynthesis.cancel();
      }
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.onend = () => {
        setSpeakingIndex(null);
        setSpeechInstance(null);
      };
      setSpeechInstance(utterance);
      setSpeakingIndex(index);
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Text-to-speech is not supported in your browser.');
    }
  };

  const handlePauseSpeech = () => {
    if (speechInstance && speakingIndex !== null) {
      window.speechSynthesis.cancel();
      setSpeakingIndex(null);
      setSpeechInstance(null);
    }
  };

  const parseBoldText = (text) => {
    if (!text) return '';
    return text.split('**').map((part, i) => 
      i % 2 === 1 ? <strong key={i}>{part}</strong> : part
    );
  };

  return (
    <div className="flex-1 flex flex-col p-2 sm:p-4 bg-white dark:bg-[#1A1A1A]" style={{ minHeight: 0 }}>
      <div 
        ref={messagesContainerRef}
        className="flex-1 w-full max-w-4xl mx-auto overflow-y-auto"
        style={{
          maxHeight: 'calc(100vh - 180px)',
          marginBottom: messages.length > 0 ? '0.5rem' : '0',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        {messages.length > 0 ? (
          <div className="space-y-4 sm:space-y-6 pb-4" style={{ fontSize: "16px sm:18px md:20px" }}>
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                <div className="flex flex-col">
                  <div
                    className={`max-w-[90%] sm:max-w-3xl rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2 sm:py-3 ${
                      message.isUser 
                        ? 'text-black dark:text-white bg-[#eeeeee] dark:bg-[#1f1f1f]' 
                        : 'bg-gray-100 dark:bg-[#1f1f1f] text-gray-800 dark:text-white'
                    }`}
                  >
                    {editingIndex === index ? (
                      <div className="flex flex-col gap-2">
                        <textarea
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          className="w-full p-2 rounded-md bg-[#eeeeee] focus:outline-none dark:bg-[#1f1f1f] text-gray-900 dark:text-white resize-none"
                          rows="3"
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleSaveEdit(index)}
                            className="px-3 py-1 bg-black text-white dark:bg-white dark:text-black rounded-2xl hover:bg-[#1A1A1A]"
                          >
                            Save
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="px-3 py-1 bg-white text-black dark:bg-[#2A2A2A] text-gray-900 dark:text-white rounded-2xl dark:hover:bg-[#2A2A2A]"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p className="whitespace-pre-wrap">{parseBoldText(message.text)}</p>
                    )}
                    {message.attachments?.length > 0 && (
                      <div className="mt-1 sm:mt-2 space-y-1 sm:space-y-2">
                        {message.attachments.map((file, i) => (
                          <div key={i} className="text-xs sm:text-sm text-blue-500 dark:text-blue-300">
                            {file.name}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className={`flex gap-2 mt-1 ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                    <button
                      className="text-token-text-secondary dark:text-white hover:bg-token-bg-secondary rounded-lg"
                      aria-label="Copy"
                      onClick={() => handleCopy(message.text)}
                    >
                      <span className="touch:w-10 flex h-8 w-8 items-center justify-center">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon"
                        >
                          <path
                            d="M12.668 10.667C12.668 9.95614 12.668 9.46258 12.6367 9.0791C12.6137 8.79732 12.5758 8.60761 12.5244 8.46387L12.4688 8.33399C12.3148 8.03193 12.0803 7.77885 11.793 7.60254L11.666 7.53125C11.508 7.45087 11.2963 7.39395 10.9209 7.36328C10.5374 7.33197 10.0439 7.33203 9.33301 7.33203H6.5C5.78896 7.33203 5.29563 7.33195 4.91211 7.36328C4.63016 7.38632 4.44065 7.42413 4.29688 7.47559L4.16699 7.53125C3.86488 7.68518 3.61186 7.9196 3.43555 8.20703L3.36524 8.33399C3.28478 8.49198 3.22795 8.70352 3.19727 9.0791C3.16595 9.46259 3.16504 9.95611 3.16504 10.667V13.5C3.16504 14.211 3.16593 14.7044 3.19727 15.0879C3.22797 15.4636 3.28473 15.675 3.36524 15.833L3.43555 15.959C3.61186 16.2466 3.86474 16.4807 4.16699 16.6348L4.29688 16.6914C4.44063 16.7428 4.63025 16.7797 4.91211 16.8027C5.29563 16.8341 5.78896 16.835 6.5 16.835H9.33301C10.0439 16.835 10.5374 16.8341 10.9209 16.8027C11.2965 16.772 11.508 16.7152 11.666 16.6348L11.793 16.5645C12.0804 16.3881 12.3148 16.1351 12.4688 15.833L12.5244 15.7031C12.5759 15.5594 12.6137 15.3698 12.6367 15.0879C12.6681 14.7044 12.668 14.211 12.668 13.5V10.667ZM13.998 12.665C14.4528 12.6634 14.8011 12.6602 15.0879 12.6367C15.4635 12.606 15.675 12.5492 15.833 12.4688L15.959 12.3975C16.2466 12.2211 16.4808 11.9682 16.6348 11.666L16.6914 11.5361C16.7428 11.3924 16.7797 11.2026 16.8027 10.9209C16.8341 10.5374 16.835 10.0439 16.835 9.33301V6.5C16.835 5.78896 16.8341 5.29563 16.8027 4.91211C16.7797 4.63025 16.7428 4.44063 16.6914 4.29688L16.6348 4.16699C16.4807 3.86474 16.2466 3.61186 15.959 3.43555L15.833 3.36524C15.675 3.28473 15.4636 3.22797 15.0879 3.19727C14.7044 3.16593 14.211 3.16504 13.5 3.16504H10.667C9.9561 3.16504 9.46259 3.16595 9.0791 3.19727C8.79739 3.22028 8.6076 3.2572 8.46387 3.30859L8.33399 3.36524C8.03176 3.51923 7.77886 3.75343 7.60254 4.04102L7.53125 4.16699C7.4508 4.32498 7.39397 4.53655 7.36328 4.91211C7.33985 5.19893 7.33562 5.54719 7.33399 6.00195H9.33301C10.022 6.00195 10.5791 6.00131 11.0293 6.03809C11.4873 6.07551 11.8937 6.15471 12.2705 6.34668L12.4883 6.46875C12.984 6.7728 13.3878 7.20854 13.6533 7.72949L13.7197 7.87207C13.8642 8.20859 13.9292 8.56974 13.9619 8.9707C13.9987 9.42092 13.998 9.97799 13.998 10.667V12.665ZM18.165 9.33301C18.165 10.022 18.1657 10.5791 18.1289 11.0293C18.0961 11.4302 18.0311 11.7914 17.8867 12.1279L17.8203 12.2705C17.5549 12.7914 17.1509 13.2272 16.6553 13.5313L16.4365 13.6533C16.0599 13.8452 15.6541 13.9245 15.1963 13.9619C14.8593 13.9895 14.4624 13.9935 13.9951 13.9951C13.9935 14.4624 13.9895 14.8593 13.9619 15.1963C13.9292 15.597 13.864 15.9576 13.7197 16.2939L13.6533 16.4365C13.3878 16.9576 12.9841 17.3941 12.4883 17.6982L12.2705 17.8203C11.8937 18.0123 11.4873 18.0915 11.0293 18.1289C10.5791 18.1657 10.022 18.165 9.33301 18.165H6.5C5.81091 18.165 5.25395 18.1657 4.80371 18.1289C4.40306 18.0962 4.04235 18.031 3.70606 17.8867L3.56348 17.8203C3.04244 17.5548 2.60585 17.151 2.30176 16.6553L2.17969 16.4365C1.98788 16.0599 1.90851 15.6541 1.87109 15.1963C1.83431 14.746 1.83496 14.1891 1.83496 13.5V10.667C1.83496 9.978 1.83432 9.42091 1.87109 8.9707C1.90851 8.5127 1.98772 8.10625 2.17969 7.72949L2.30176 7.51172C2.60586 7.0159 3.04236 6.6122 3.56348 6.34668L3.70606 6.28027C4.04237 6.136 4.40303 6.07083 4.80371 6.03809C5.14051 6.01057 5.53708 6.00551 6.00391 6.00391C6.00551 5.53708 6.01057 5.14051 6.03809 4.80371C6.0755 4.34588 6.15483 3.94012 6.34668 3.56348L6.46875 3.34473C6.77282 2.84912 7.20856 2.44514 7.72949 2.17969L7.87207 2.11328C8.20855 1.96886 8.56979 1.90385 8.9707 1.87109C9.42091 1.83432 9.978 1.83496 10.667 1.83496H13.5C14.1891 1.83496 14.746 1.83431 15.1963 1.87109C15.6541 1.90851 16.0599 1.98788 16.4365 2.17969L16.6553 2.30176C17.151 2.60585 17.5548 3.04244 17.8203 3.56348L17.8867 3.70606C18.031 4.04235 18.0962 4.40306 18.1289 4.80371C18.1657 5.25395 18.165 5.81091 18.165 6.5V9.33301Z"
                          />
                        </svg>
                      </span>
                    </button>
                    {message.isUser && editingIndex !== index && (
                      <button
                        className="text-token-text-secondary dark:text-white hover:bg-token-bg-secondary rounded-lg"
                        aria-label="Edit message"
                        onClick={() => handleEdit(index, message.text)}
                      >
                        <span className="touch:w-10 flex h-8 w-8 items-center justify-center">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon"
                          >
                            <path
                              d="M11.3312 3.56837C12.7488 2.28756 14.9376 2.33009 16.3038 3.6963L16.4318 3.83106C17.6712 5.20294 17.6712 7.29708 16.4318 8.66895L16.3038 8.80372L10.0118 15.0947C9.68833 15.4182 9.45378 15.6553 9.22179 15.8457L8.98742 16.0225C8.78227 16.1626 8.56423 16.2832 8.33703 16.3828L8.10753 16.4756C7.92576 16.5422 7.73836 16.5902 7.5216 16.6348L6.75695 16.7705L4.36339 17.169C4.22053 17.1928 4.06908 17.2188 3.94054 17.2285C3.84177 17.236 3.70827 17.2386 3.56261 17.2031L3.41417 17.1543C3.19115 17.0586 3.00741 16.8908 2.89171 16.6797L2.84581 16.5859C2.75951 16.3846 2.76168 16.1912 2.7716 16.0596C2.7813 15.931 2.80736 15.7796 2.83117 15.6367L3.2296 13.2432L3.36437 12.4785C3.40893 12.2616 3.45789 12.0745 3.52453 11.8926L3.6173 11.6621C3.71685 11.4352 3.83766 11.2176 3.97765 11.0127L4.15343 10.7783C4.34386 10.5462 4.58164 10.312 4.90538 9.98829L11.1964 3.6963L11.3312 3.56837ZM5.84581 10.9287C5.49664 11.2779 5.31252 11.4634 5.18663 11.6162L5.07531 11.7627C4.98188 11.8995 4.90151 12.0448 4.83507 12.1963L4.77355 12.3506C4.73321 12.4607 4.70242 12.5761 4.66808 12.7451L4.54113 13.4619L4.14269 15.8555L4.14171 15.8574H4.14464L6.5382 15.458L7.25499 15.332C7.424 15.2977 7.5394 15.2669 7.64953 15.2266L7.80285 15.165C7.95455 15.0986 8.09947 15.0174 8.23644 14.9238L8.3839 14.8135C8.53668 14.6876 8.72225 14.5035 9.0714 14.1543L14.0587 9.16602L10.8331 5.94044L5.84581 10.9287ZM15.3634 4.63673C14.5281 3.80141 13.2057 3.74938 12.3097 4.48048L12.1368 4.63673L11.7735 5.00001L15.0001 8.22559L15.3634 7.86329L15.5196 7.68946C16.2015 6.85326 16.2015 5.64676 15.5196 4.81056L15.3634 4.63673Z"
                            />
                          </svg>
                        </span>
                      </button>
                    )}
                    {!message.isUser && editingIndex !== index && (
                      <>
                        <button
                          className="text-token-text-secondary dark:text-white hover:bg-token-bg-secondary rounded-lg"
                          aria-label="Regenerate response"
                          onClick={() => handleRegenerate(index)}
                        >
                          <span className="touch:w-10 flex h-8 w-8 items-center justify-center">
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="icon dark:text-white"
                            >
                              <path
                                d="M21 12C21 16.9706 16.9706 21 12 21C9.69494 21 7.59227 20.1334 6 18.7083L3 16M3 12C3 7.02944 7.02944 3 12 3C14.3051 3 16.4077 3.86656 18 5.29168L21 8M3 21V16M3 16H8M21 3V8M21 8H16"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                        </button>
                        <button
                          className={`text-token-text-secondary dark:text-white hover:bg-token-bg-secondary rounded-lg ${
                            feedback[index] === 'like' ? 'text-blue-500 dark:text-blue-300' : ''
                          }`}
                          aria-label="Like response"
                          onClick={() => handleLike(index)}
                        >
                          <span className="touch:w-10 flex h-8 w-8 items-center justify-center">
                            <ThumbsUp
                              size={20}
                              fill={feedback[index] === 'like' ? 'currentColor' : 'none'}
                              strokeWidth={feedback[index] === 'like' ? 0 : 2}
                            />
                          </span>
                        </button>
                        <button
                          className={`text-token-text-secondary dark:text-white hover:bg-token-bg-secondary rounded-lg ${
                            feedback[index] === 'dislike' ? 'text-red-500 dark:text-red-300' : ''
                          }`}
                          aria-label="Dislike response"
                          onClick={() => handleDislike(index)}
                        >
                          <span className="touch:w-10 flex h-8 w-8 items-center justify-center">
                            <ThumbsDown
                              size={20}
                              fill={feedback[index] === 'dislike' ? 'currentColor' : 'none'}
                              strokeWidth={feedback[index] === 'dislike' ? 0 : 2}
                            />
                          </span>
                        </button>
                        <button
                          className="text-token-text-secondary dark:text-white hover:bg-token-bg-secondary rounded-lg"
                          aria-label={speakingIndex === index ? "Pause reading" : "Read aloud"}
                          onClick={() => speakingIndex === index ? handlePauseSpeech() : handleReadAloud(index, message.text)}
                        >
                          <span className="touch:w-10 flex h-8 w-8 items-center justify-center">
                            {speakingIndex === index ? (
                              <CirclePause size={20} />
                            ) : (
                              <Volume2 size={20} />
                            )}
                          </span>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-[#1f1f1f] rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2 sm:py-3">
                  <div className="flex space-x-1 sm:space-x-2">
                    {[...Array(3)].map((_, i) => (
                      <div 
                        key={i}
                        className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gray-500 dark:bg-gray-400 animate-bounce"
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
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-wide mb-4 sm:mb-6 text-gray-900 dark:text-white">
              {greeting}
            </h2>
            <div className="w-full max-w-6xl mt-4 sm:mt-8">
              <InputContainer
                inputValue={inputValue}
                setInputValue={setInputValue}
                handleKeyPress={handleKeyPress}
                handleSendMessage={handleSendMessage}
                isLoading={isLoading}
                attachments={attachments}
                activeFeature={activeFeature}
                handleFeatureClick={handleFeatureClick}
                handleAttachmentClick={handleAttachmentClick}
                handleFileChange={handleFileChange}
                fileInputRef={fileInputRef}
                isRecording={isRecording}
                handleVoiceRecording={handleVoiceRecording}
                scrollToBottom={scrollToBottom}
                isChatSelected={messages.length > 0}
              />
            </div>
          </div>
        )}
      </div>

      {messages.length > 0 && (
        <div className="w-full max-w-4xl mx-auto mt-2 sm:mt-4">
          {attachments.length > 0 && (
            <div className="flex gap-1 sm:gap-2 mb-1 sm:mb-2 overflow-x-auto pb-1 sm:pb-2">
              {attachments.map((file, index) => (
                <div key={index} className="flex items-center bg-gray-100 dark:bg-[#1f1f1f] rounded-lg px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm text-gray-800 dark:text-white">
                  <span className="truncate max-w-[150px] sm:max-w-xs">{file.name}</span>
                  <button 
                    onClick={() => removeAttachment(index)}
                    className="ml-1 sm:ml-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    aria-label={`Remove ${file.name}`}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
          <InputContainer
            inputValue={inputValue}
            setInputValue={setInputValue}
            handleKeyPress={handleKeyPress}
            handleSendMessage={handleSendMessage}
            isLoading={isLoading}
            attachments={attachments}
            activeFeature={activeFeature}
            handleFeatureClick={handleFeatureClick}
            handleAttachmentClick={handleAttachmentClick}
            handleFileChange={handleFileChange}
            fileInputRef={fileInputRef}
            isRecording={isRecording}
            handleVoiceRecording={handleVoiceRecording}
            scrollToBottom={scrollToBottom}
            isChatSelected={messages.length > 0}
          />
        </div>
      )}
    </div>
  );
}

export default MainContent;
