import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import logo from "../../assets/logo-5.png";
import { CgClose } from "react-icons/cg";

const ReimbursementModal = ({ isOpen, setIsOpen, onSubmit }) => {
  const [expenseType, setExpenseType] = useState("");
  const [expenseDate, setExpenseDate] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [description, setDescription] = useState("");
  const [modeOfPayment, setModeOfPayment] = useState("");
  const [billFile, setBillFile] = useState(null);
  const [additionalFeedback, setAdditionalFeedback] = useState("");

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);
  const handleFileChange = (e) => {
    setBillFile(e.target.files[0]);
  };

  const handleSubmit = () => {
    const reimbursementData = {
      expenseType,
      expenseDate,
      expenseAmount,
      description,
      modeOfPayment,
      status: "Pending HR Approval",
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
            className="bg-[#0d0e11] rounded-lg w-full max-w-xl shadow-2xl cursor-default relative overflow-hidden"
          >
            {/* Header */}
            <div className="bg-black p-2 flex justify-between w-full items-center px-4">
              <img src={logo} className="h-12" alt="logo" />
              <div
                onClick={() => setIsOpen(false)}
                className="flex justify-center cursor-pointer items-center hover:bg-gray-800 w-12 h-12 rounded-full"
              >
                <CgClose className="text-blue-500 text-xl" />
              </div>
            </div>

            {/* Form Content */}
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-300 mb-3">
                Submit Reimbursement
              </h2>

              {/* Expense Type */}
              <div className="mb-3">
                <label className="block text-gray-400 text-sm mb-1">
                  Expense Type
                </label>
                <select
                  value={expenseType}
                  onChange={(e) => setExpenseType(e.target.value)}
                  className="w-full bg-[#10141c] p-2.5 rounded-md border border-gray-800 text-gray-300 focus:outline-none focus:ring focus:ring-indigo-200"
                >
                  <option value="" disabled>
                    Select Expense Type
                  </option>
                  <option value="Travel">Travel</option>
                  <option value="Meals">Meals</option>
                  <option value="Supplies">Supplies</option>
                  <option value="Accommodation">Accommodation</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Expense Date */}
              <div className="mb-3">
                <label className="block text-gray-400 text-sm mb-1">
                  Expense Date
                </label>
                <input
                  type="date"
                  value={expenseDate}
                  onChange={(e) => setExpenseDate(e.target.value)}
                  className="w-full bg-[#10141c] p-2.5 rounded-md border border-gray-800 text-gray-300 focus:outline-none focus:ring focus:ring-indigo-200"
                />
              </div>

              {/* Expense Amount */}
              <div className="mb-3">
                <label className="block text-gray-400 text-sm mb-1">
                  Expense Amount (SAR)
                </label>
                <input
                  type="number"
                  value={expenseAmount}
                  onChange={(e) => setExpenseAmount(e.target.value)}
                  placeholder="Enter amount in SAR"
                  className="w-full bg-[#10141c] p-2.5 rounded-md border border-gray-800 text-gray-300 focus:outline-none focus:ring focus:ring-indigo-200"
                />
              </div>

              {/* Description */}
              <div className="mb-3">
                <label className="block text-gray-400 text-sm mb-1">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter a brief description of the expense..."
                  className="w-full h-16 bg-[#10141c] p-2.5 rounded-md border border-gray-800 text-gray-300 resize-none focus:outline-none focus:ring focus:ring-indigo-200"
                />
              </div>

              {/* Mode of Payment */}
              <div className="mb-3">
                <label className="block text-gray-400 text-sm mb-1">
                  Mode of Payment
                </label>
                <select
                  value={modeOfPayment}
                  onChange={(e) => setModeOfPayment(e.target.value)}
                  className="w-full bg-[#10141c] p-2.5 rounded-md border border-gray-800 text-gray-300 focus:outline-none focus:ring focus:ring-indigo-200"
                >
                  <option value="" disabled>
                    Select Mode of Payment
                  </option>
                  <option value="Credit Card">Credit Card</option>
                  <option value="Debit Card">Debit Card</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="Cash">Cash</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              {/* File Upload */}
              <div className="mb-3">
                <label className="block text-gray-400 text-sm mb-1">
                  Upload Bill/Receipt
                </label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="w-full bg-[#10141c] p-2.5 rounded-md border border-gray-800 text-gray-300 focus:outline-none focus:ring focus:ring-indigo-200"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 p-6">
              <button
                onClick={() => setIsOpen(false)}
                className="flex-1 bg-gray-900 text-white font-semibold py-1.5 rounded-md hover:bg-gray-800 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 bg-blue-600 text-white font-semibold py-1.5 rounded-md hover:bg-blue-500 transition"
              >
                Submit Reimbursement
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ReimbursementModal;
