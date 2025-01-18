import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import logo from '../../assets/logogen.png';
import { CgClose } from 'react-icons/cg';
import profile from '../../assets/6681204.png';
import { BsGlobe } from 'react-icons/bs';
import { IoIosArrowDown } from 'react-icons/io';
import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai';
import { BiCopy } from 'react-icons/bi';
import { FiMoreHorizontal } from 'react-icons/fi';

const SupportModel = ({ isOpen, setIsOpen, userQuestion, botReply }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [additionalFeedback, setAdditionalFeedback] = useState('');

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isOpen]);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleSubmitFeedback = () => {
    console.log('Submitted feedback:', additionalFeedback);
    setIsOpen(false); 
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className='bg-gray-800/50 backdrop-blur-sm fixed inset-0 z-50 flex items-center justify-center cursor-pointer'
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className='bg-[#0d0e11] rounded-lg w-full max-w-2xl shadow-2xl cursor-default relative overflow-hidden'
          >
            {/* Header */}
            <div className='bg-black p-3 flex justify-between w-full items-center px-4'>
              <img src={logo} className='h-14' alt='logo' />
              <div
                onClick={() => setIsOpen(false)}
                className='flex justify-center cursor-pointer items-center hover:bg-gray-800 w-16 h-16 rounded-full '
              >
                <CgClose className='text-blue-500 text-2xl' />
              </div>
            </div>

            <div className='p-5 flex justify-between w-full'>
              <div className='flex flex-col'>
                <div className='flex gap-3'>
                  <img className='h-8' src={profile} alt='profile' />
                  <p>{userQuestion}</p>
                </div>
                <div className='ml-10'>
                  <div
                    onClick={toggleDropdown}
                    className='text-xs bg-black px-2 rounded-md py-1 flex items-center gap-x-2 cursor-pointer'
                  >
                    ✨ Reveal AI Reasoning <IoIosArrowDown size={15} />
                  </div>
                  {isDropdownOpen && (
                    <div className='text-xs text-gray-400 mt-1 space-y-1'>
                      <p>Working on: "{userQuestion}"</p>
                      <p>Searching knowledge base for "{userQuestion}"</p>
                      <p>Reading 8 files</p>
                    </div>
                  )}
                </div>
              </div>
              <div className='flex justify-center items-center'>
                <BsGlobe size={22} className='cursor-pointer' />
              </div>
            </div>

            <div className='p-5 flex justify-between w-full'>
              <div className='flex gap-3'>
                <img
                  className='h-8 rounded-full border'
                  src={logo}
                  alt='logo'
                />
                <div className='flex-col'>
                  <p className='text-[15px]'>
                    I understand you want to find information about "
                    {userQuestion}". However, the Moveworks Copilot Playground
                    does not have information on your query because it is
                    powered by select resources to simulate an enterprise
                    company, BannerTech.
                  </p>
                  <div className='flex justify-between mt-2'>
                    <div className='flex items-center gap-3 mt-2 text-gray-400 text-md'>
                      <AiOutlineLike className='cursor-pointer' />
                      <AiOutlineDislike className='cursor-pointer' />
                      <BiCopy className='cursor-pointer' />
                      <FiMoreHorizontal className='cursor-pointer' />
                    </div>
                    <div className='text-sm text-gray-600 pr-5'>
                      <span>Conversation ID : 7fg6331v</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Feedback Section */}
            <div className='px-8 pt-4'>
              <h4 className='text-md font-semibold text-gray-300'>
                Provide additional feedback (Optional)
              </h4>
              <p className='text-sm text-gray-500 mb-3'>
                Thanks for your rating. Your additional feedback will help us
                improve.
              </p>
              <textarea
                value={additionalFeedback}
                onChange={(e) => setAdditionalFeedback(e.target.value)}
                placeholder='Additional Feedback'
                className='w-full h-20 bg-[#10141c] p-3 rounded-md border border-gray-800 text-gray-300 resize-none focus:outline-none focus:ring focus:ring-indigo-200'
              />
            </div>

            {/* Buttons */}
            <div className='flex gap-4 p-8'>
              <button
                onClick={() => setIsOpen(false)}
                className='flex-1 bg-gray-900  text-white font-semibold py-2 rounded-md hover:bg-gray-900 transition'
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitFeedback}
                className='flex-1 bg-black  text-white font-semibold py-2 rounded-md hover:bg-gray-900 transition'
              >
                Submit Feedback
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SupportModel;
