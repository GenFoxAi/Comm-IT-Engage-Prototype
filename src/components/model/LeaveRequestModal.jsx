import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import logo from '../../assets/logo-5.png';
import { CgClose } from 'react-icons/cg';

const LeaveRequestModal = ({ isOpen, setIsOpen, onSubmit }) => {
  const [leaveType, setLeaveType] = useState('');
  const [reason, setReason] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!leaveType || !reason || !startDate || !endDate) {
      setError('All fields are required.');
      return;
    }
    const leaveData = {
      leaveType,
      reason,
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
      status: 'Pending',
    };
    onSubmit(leaveData);
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
          className="bg-gray-800/50 backdrop-blur-sm fixed inset-0 z-50 flex items-center justify-center cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[#0d0e11] rounded-lg w-full max-w-xl shadow-2xl cursor-default relative overflow-hidden"
          >
            <div className="bg-black p-2 flex justify-between w-full items-center px-4">
              <img src={logo} className="h-12" alt="logo" />
              <h2 className="text-lg font-semibold text-gray-300">Submit Leave Request</h2>
              <div
                onClick={() => setIsOpen(false)}
                className="flex justify-center cursor-pointer items-center hover:bg-gray-800 w-12 h-12 rounded-full"
              >
                <CgClose className="text-blue-500 text-xl" />
              </div>
            </div>
            <div className="p-4">
             
              {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
              <div className="mb-3">
                <label className="block text-gray-400 text-sm mb-1">Leave Type</label>
                <select
                  value={leaveType}
                  onChange={(e) => setLeaveType(e.target.value)}
                  className="w-full bg-[#10141c] p-2.5 rounded-md text-sm border border-gray-800 text-gray-300"
                >
                  <option value="" disabled>Select Leave Type</option>
                  <option value="Annual">Annual Leave</option>
                  <option value="Sick">Sick Leave</option>
                  <option value="Maternity">Maternity Leave</option>
                  <option value="Paternity">Paternity Leave</option>
                  <option value="Unpaid">Unpaid Leave</option>
                  <option value="Casual">Casual Leave</option>
                  <option value="Earned">Earned Leave</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="mb-1">
                <label className="block text-gray-400 text-sm mb-1">Reason for Leave</label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Enter the reason for your leave..."
                  className="w-full h-16 bg-[#10141c] p-2.5 text-sm rounded-md border border-gray-800 text-gray-300"
                />
              </div>
              <div className="mb-3">
                <label className="block text-gray-400 text-sm mb-1">Start Date</label>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  dateFormat="dd-MM-yyyy"
                  placeholderText="Select start date"
                  className="w-full bg-[#10141c] p-3 min-w-[450px] text-sm sm:min-w-[550px] rounded-md border border-gray-800 text-gray-300"
                />
              </div>
              <div className="">
                <label className="block text-gray-400 text-sm mb-1">End Date</label>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  dateFormat="dd-MM-yyyy"
                  placeholderText="Select end date"
                  className="w-full bg-[#10141c] p-3 min-w-[450px] text-sm sm:min-w-[550px] rounded-md border border-gray-800 text-gray-300"
                />
              </div>
            </div>
            <div className="flex gap-3 p-4">
              <button
                onClick={() => setIsOpen(false)}
                className="flex-1 bg-gray-900 text-white py-1.5 rounded-md hover:bg-gray-800 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 bg-blue-600 text-white py-1.5 rounded-md hover:bg-blue-500 transition"
              >
                Submit
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LeaveRequestModal;
