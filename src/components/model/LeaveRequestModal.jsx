
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import logo from '../../assets/logo-5.png';
import { CgClose } from 'react-icons/cg';

const LeaveRequestModal = ({ isOpen, setIsOpen }) => {
  const [leaveType, setLeaveType] = useState('');
  const [reason, setReason] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
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

  const handleSubmit = () => {
    const leaveData = { leaveType, reason, startDate, endDate };
    console.log('Submitted Leave Request:', leaveData);
    console.log('Additional Feedback:', additionalFeedback);

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
            className='bg-[#0d0e11] rounded-lg w-full max-w-xl shadow-2xl cursor-default relative overflow-hidden'
          >
            {/* Header */}
            <div className='bg-black p-2 flex justify-between w-full items-center px-4'>
              <img src={logo} className='h-12' alt='logo' />
              <div
                onClick={() => setIsOpen(false)}
                className='flex justify-center cursor-pointer items-center hover:bg-gray-800 w-12 h-12 rounded-full'
              >
                <CgClose className='text-blue-500 text-xl' />
              </div>
            </div>

            {/* Form Content */}
            <div className='p-4'>
              <h2 className='text-lg font-semibold text-gray-300 mb-3'>Submit Leave Request</h2>
              
              {/* Leave Type */}
              <div className='mb-3'>
                <label className='block text-gray-400 text-sm mb-1'>Leave Type</label>
                <select
                  value={leaveType}
                  onChange={(e) => setLeaveType(e.target.value)}
                  className='w-full bg-[#10141c] p-2.5 rounded-md border border-gray-800 text-gray-300 focus:outline-none focus:ring focus:ring-indigo-200'
                >
                  <option value='' disabled>Select Leave Type</option>
                  <option value='Annual'>Annual Leave</option>
                  <option value='Sick'>Sick Leave</option>
                  <option value='Maternity'>Maternity Leave</option>
                  <option value='Paternity'>Paternity Leave</option>
                  <option value='Unpaid'>Unpaid Leave</option>
                </select>
              </div>

              {/* Reason for Leave */}
              <div className='mb-3'>
                <label className='block text-gray-400 text-sm mb-1'>Reason for Leave</label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder='Enter the reason for your leave...'
                  className='w-full h-16 bg-[#10141c] p-2.5 rounded-md border border-gray-800 text-gray-300 resize-none focus:outline-none focus:ring focus:ring-indigo-200'
                />
              </div>

              {/* Start Date */}
              <div className='mb-3'>
                <label className='block text-gray-400 text-sm mb-1'>Start Date</label>
                <input
                  type='date'
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className='w-full bg-[#10141c] p-2.5 rounded-md border border-gray-800 text-gray-300 focus:outline-none focus:ring focus:ring-indigo-200'
                />
              </div>

              {/* End Date */}
              <div className='mb-3'>
                <label className='block text-gray-400 text-sm mb-1'>End Date</label>
                <input
                  type='date'
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className='w-full bg-[#10141c] p-2.5 rounded-md border border-gray-800 text-gray-300 focus:outline-none focus:ring focus:ring-indigo-200'
                />
              </div>
            </div>

         
            {/* Buttons */}
            <div className='flex gap-3 p-6'>
              <button
                onClick={() => setIsOpen(false)}
                className='flex-1 bg-gray-900 text-white font-semibold py-1.5 rounded-md hover:bg-gray-800 transition'
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className='flex-1 bg-blue-600 text-white font-semibold py-1.5 rounded-md hover:bg-blue-500 transition'
              >
                Submit Request
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LeaveRequestModal;
