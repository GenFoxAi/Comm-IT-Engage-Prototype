import { useState } from 'react';
import { FaRegPenToSquare } from 'react-icons/fa6';
import { FiChevronDown, FiCheck } from 'react-icons/fi';
import { LuTimerReset } from 'react-icons/lu';
import { Link, useNavigate } from 'react-router-dom';
import HistorySidebar from './LeftSidebar';

const Navbar = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handlePenClick = () => {
    navigate('/');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Navbar */}
      <nav
        className={`w-full h-16 px-6 flex items-center justify-between fixed top-0 left-0 bg-black/30 backdrop-blur-md z-40`}
      >
        {/* Right Section: History Button */}
        <div
          onClick={toggleSidebar}
          className='flex gap-1 items-center font-semibold cursor-pointer 
            hover:bg-[#151515] bg-black px-4 py-1 rounded-full'
        >
          <LuTimerReset />
          <span>History</span>
        </div>

        {/* Center Section: Dropdown */}
        <Dropdown />

        {/* Left Section: New Chat */}
        <div className='flex gap-6 text-lg mr-3'>
          {/* Pen Icon */}
          <Link to='/'>
            <div
              className='relative group cursor-pointer'
              onClick={handlePenClick}
            >
              <FaRegPenToSquare />
              <span
                className='absolute top-8 left-1/2 -translate-x-1/2 scale-0
                  group-hover:scale-100 transition-transform bg-[#151515] text-white text-sm py-1 px-3 rounded-md whitespace-nowrap'
              >
                New Chat
              </span>
            </div>
          </Link>
        </div>
      </nav>

      {/* Sidebar (Separate Component) */}
      <HistorySidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
    </>
  );
};

const Dropdown = () => {
  const options = ['Commit-Ai'];
  const [selected, setSelected] = useState(options[0]);
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen((prev) => !prev);
  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
  };

  return (
    <div className='absolute left-1/2 transform -translate-x-1/2'>
      <button
        onClick={handleToggle}
        className='flex items-center gap-2 px-4 py-2 rounded-full bg-black hover:bg-[#151515] text-white text-sm font-semibold'
      >
        <span>{selected}</span>
        <FiChevronDown
          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {isOpen && (
        <div
          className='absolute left-1/2 top-full mt-2 transform -translate-x-1/2 w-56 
            bg-black border border-neutral-600 rounded-lg shadow-md z-50 font-medium'
        >
          {options.map((option) => (
            <div key={option} className='hover:bg-[#151515] rounded-lg'>
              <button
                onClick={() => handleSelect(option)}
                className='w-full flex items-center justify-between font-medium text-left px-4 py-2 text-sm text-white rounded-md'
              >
                {option}
                {selected === option && (
                  <FiCheck className='text-blue-500 text-base' />
                )}
              </button>
              <p className='text-sm cursor-pointer font-normal text-gray-400 pb-2 px-1 ml-3 w-full'>
                Optimized for performance. Powered by intelligence.
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Navbar;
