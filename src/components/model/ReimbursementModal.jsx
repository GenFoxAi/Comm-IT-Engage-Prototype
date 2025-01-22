import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import logo from '../../assets/logo-5.png';
import { CgClose } from 'react-icons/cg';

const ReimbursementModal = ({ isOpen, setIsOpen, onSubmit }) => {
  const [expenseType, setExpenseType] = useState('');
  const [expenseDate, setExpenseDate] = useState(null);
  const [expenseAmount, setExpenseAmount] = useState('');
  const [description, setDescription] = useState('');
  const [modeOfPayment, setModeOfPayment] = useState('');
  const [billFile, setBillFile] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) document.body.classList.add('overflow-hidden');
    else document.body.classList.remove('overflow-hidden');
    return () => document.body.classList.remove('overflow-hidden');
  }, [isOpen]);

  const handleSubmit = () => {
    if (!expenseType || !expenseDate || !expenseAmount || !description || !modeOfPayment) {
      setError('All fields are required.');
      return;
    }
    const reimbursementData = {
      expenseType,
      expenseDate: expenseDate.toISOString().split('T')[0],
      expenseAmount,
      description,
      modeOfPayment,
      status: 'Pending',
    };
    onSubmit(reimbursementData);
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
            className="bg-[#0d0e11] rounded-lg w-full max-w-xl  shadow-2xl cursor-default relative overflow-hidden"
          >
            <div className="bg-black p-2 flex justify-between w-full items-center px-4">
              <img src={logo} className="h-12" alt="logo" />
              <h2 className="text-lg font-semibold text-gray-300 ">Submit Reimbursement</h2>
              <div
                onClick={() => setIsOpen(false)}
                className="flex justify-center cursor-pointer items-center hover:bg-gray-800 w-12 h-12 rounded-full"
              >
                <CgClose className="text-blue-500 text-xl" />
              </div>
            </div>
            <div className="px-4 pt-2">
              
              {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
              <div className="mb-3">
                <label className="block text-gray-400 text-xs md:text-sm mb-1">Expense Type</label>
                <select
                  value={expenseType}
                  onChange={(e) => setExpenseType(e.target.value)}
                  className="w-full bg-[#10141c] p-2.5 rounded-md border text-sm border-gray-800 text-gray-300"
                >
                  <option value="" disabled>Select Expense Type</option>
                  <option value="Travel">Travel</option>
                  <option value="Meals">Meals</option>
                  <option value="Supplies">Supplies</option>
                  <option value="Accommodation">Accommodation</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="block text-gray-400 text-sm mb-1">Expense Date</label>
                <DatePicker
                  selected={expenseDate}
                  onChange={(date) => setExpenseDate(date)}
                  dateFormat="dd-MM-yyyy"
                  placeholderText="Select expense date"
                  className="w-full bg-[#10141c] min-w-[450px] text-sm sm:min-w-[550px] p-3 rounded-md border border-gray-800 text-gray-300"
                />
              </div>
              <div className="mb-3">
                <label className="block text-gray-400 text-sm mb-1">Expense Amount (SAR)</label>
                <input
                  type="number"
                  value={expenseAmount}
                  onChange={(e) => setExpenseAmount(e.target.value)}
                  placeholder="Enter amount in SAR"
                  className="w-full bg-[#10141c] text-sm min-w-[450px] sm:min-w-[550px] p-2.5 rounded-md border border-gray-800 text-gray-300"
                />
              </div>
              <div className="mb-1">
                <label className="block text-gray-400 text-sm mb-1">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter a brief description of the expense..."
                  className="w-full h-16 bg-[#10141c] min-w-[450px] text-sm sm:min-w-[550px] p-2.5 rounded-md border border-gray-800 text-gray-300"
                />
              </div>
              <div className="mb-3">
                <label className="block text-gray-400 text-sm mb-1">Mode of Payment</label>
                <select
                  value={modeOfPayment}
                  onChange={(e) => setModeOfPayment(e.target.value)}
                  className="w-full bg-[#10141c] p-2.5 rounded-md border text-sm border-gray-800 text-gray-300"
                >
                  <option value="" disabled>Select Mode of Payment</option>
                  <option value="Credit Card">Credit Card</option>
                  <option value="Debit Card">Debit Card</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="Cash">Cash</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="block text-gray-400 text-sm mb-1">Upload Bill/Receipt</label>
                <input
                  type="file"
                  onChange={(e) => setBillFile(e.target.files[0])}
                  className="w-full bg-[#10141c] text-sm p-2.5 rounded-md border border-gray-800 text-gray-300"
                />
              </div>
            </div>
            <div className="flex gap-3 p-3">
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

export default ReimbursementModal;
