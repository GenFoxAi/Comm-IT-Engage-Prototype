import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { CgAttachment } from 'react-icons/cg';
import userImage from '../assets/profile-test.jpg';
import botImage from '../assets/bot.png';
import Typewriter from '../components/Typewriter';
import SupportModel from '../components/model/SupportModel';
import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai';
import { BiCopyAlt } from 'react-icons/bi';
import { TbReload } from 'react-icons/tb';
import { GrCircleQuestion } from 'react-icons/gr';
import SlideInNotifications from '../components/SlideInNotifications'; 
import { v4 as uuidv4 } from 'uuid'; 
import { MdOutlineSupportAgent } from 'react-icons/md';

const Chat = () => {
  const location = useLocation();
  const initialMessage = location.state?.initialMessage || '';

  const [messages, setMessages] = useState(() => {
    if (initialMessage) {
      return [
        { role: 'user', content: initialMessage },
        {
          role: 'assistant',
          content: `This is a placeholder response for: "${initialMessage}"`,
        },
      ];
    }
    return [];
  });
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState({
    userQuestion: '',
    botReply: '',
  });
  const [notifications, setNotifications] = useState([]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  useEffect(() => {
    focusInput();
  }, []);

  const addNotification = (text) => {
    const newNotification = {
      id: uuidv4(),
      text,
    };
    setNotifications((prev) => [newNotification, ...prev]);
  };

  const removeNotif = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input.trim() };
    const botMessage = {
      role: 'assistant',
      content: `This is a placeholder response for: "${input.trim()}"`,
    };

    setMessages((prev) => [...prev, userMessage, botMessage]);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFeedbackClick = (msg) => {
    if (msg.role !== 'assistant') return;

    const userMsgIndex = messages.findIndex(
      (m, idx) => m.role === 'user' && idx === msg.index * 2
    );
    const userQuestion = messages[userMsgIndex]?.content || 'N/A';
    const botReply = msg.content;

    setSelectedMessage({ userQuestion, botReply });
    setIsModalOpen(true);
  };

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      addNotification('Copied to clipboard!');
    } catch (err) {
      addNotification('Failed to copy!');
    }
  };

  const handleReload = (msgIndex) => {
    const userMessage = messages[msgIndex * 2]?.content || 'N/A';
    const newBotMessage = {
      role: 'assistant',
      content: `This is a reloaded response for: "${userMessage}"`,
    };

    setMessages((prev) => {
      const newMessages = [...prev];
      newMessages[msgIndex * 2 + 1] = newBotMessage;
      return newMessages;
    });

    addNotification('Bot response reloaded!');
  };

  const handleLike = (msgIndex) => {
    addNotification('You liked this response!');
  };

  const handleQuestion = (msgIndex) => {
    addNotification('Need more information?');
  };

  return (
    <div className='flex flex-col flex-grow bg-black text-white relative px-4 md:px-[20%] transition-all duration-300'>
      {/* Modal Component */}
      <SupportModel
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        userQuestion={selectedMessage.userQuestion}
        botReply={selectedMessage.botReply}
      />

      {/* Notifications */}
      <SlideInNotifications
        notifications={notifications}
        removeNotif={removeNotif}
      />

      {/* Chat Messages */}
      <div className='flex-grow overflow-y-auto px-6 py-4 pb-24'>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex my-2 ${
              msg.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {/* User Message */}
            {msg.role === 'user' && (
              <div className='max-w-full sm:max-w-md rounded-xl p-3 bg-[#202327]'>
                <div className='text-[15px]'>{msg.content}</div>
              </div>
            )}

            {/* User or Bot Image */}
            <div
              className={`flex-shrink-0 ${
                msg.role === 'user' ? 'ml-2' : 'mr-2'
              }`}
            >
              <img
                src={msg.role === 'user' ? userImage : botImage}
                alt={msg.role === 'user' ? 'User' : 'Comm-IT AI'}
                className={`rounded-full object-cover ${
                  msg.role === 'user'
                    ? 'ml-2 p-1 w-12 h-12'
                    : ' bg-gray-900 w-12 h-12'
                }`}
              />
            </div>

            {/* Bot Message */}
            {msg.role === 'assistant' && (
              <div className='max-w-full sm:max-w-md rounded-xl p-3 bg-black'>
                <div className='text-[15px]'>
                  <Typewriter text={msg.content} />
                </div>
                <div className='flex items-center gap-3 mt-2 text-gray-400 text-md'>
                  <AiOutlineLike
                    className='cursor-pointer'
                    onClick={() => handleLike(Math.floor(idx / 2))}
                  />
                  <AiOutlineDislike
                    className='cursor-pointer'
                    onClick={() =>
                      handleFeedbackClick({
                        ...msg,
                        index: Math.floor(idx / 2),
                      })
                    }
                  />
                  <BiCopyAlt
                    className='cursor-pointer'
                    onClick={() => handleCopy(msg.content)}
                  />
                  <MdOutlineSupportAgent 
                    className='cursor-pointer'
                    onClick={() =>
                      handleFeedbackClick({
                        ...msg,
                        index: Math.floor(idx / 2),
                      })
                    }
                  />
                  <TbReload
                    className='cursor-pointer'
                    onClick={() => handleReload(Math.floor(idx / 2))}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <div className='fixed bottom-0 left-0 right-0 border-t border-gray-800 p-4 bg-opacity-90 bg-black transition-all duration-300'>
        <div className='flex items-center max-w-full sm:max-w-2xl mx-auto w-full'>
          <button
            className='bg-[#202327] px-4 py-4 rounded-l-full hover:bg-gray-600 flex items-center justify-center'
            aria-label='Attach file'
          >
            <CgAttachment className='text-white' />
          </button>
          <input
            type='text'
            placeholder='Ask anything'
            className='flex-grow p-3 bg-[#202327] text-white outline-none rounded-none focus:ring-0'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            ref={inputRef}
          />
          <button
            className='bg-[#202327] px-4 py-3 rounded-r-full hover:bg-gray-600 flex items-center justify-center'
            onClick={handleSend}
            aria-label='Send message'
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
