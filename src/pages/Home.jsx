import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaMoneyCheckAlt } from "react-icons/fa";
import SupportModel from "../components/model/SupportModel";
import { CgAttachment } from "react-icons/cg";
import { MdOutlineEventNote } from "react-icons/md";
import { FaUserCheck } from "react-icons/fa6";
import { GiReceiveMoney } from "react-icons/gi";
import { tickets } from "../data/tickets";
import Ticket from "../components/Ticket";
import { useLeaveRequests } from "../contexts/LeaveRequestContext";
import { useReimbursements } from "../contexts/ReimbursementContext";

const Home = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    navigate("/chat", { state: { initialMessage: input.trim() } });
  };

  const { leaveRequests } = useLeaveRequests();
  const { reimbursements } = useReimbursements();

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSuggestionClick = (suggestionText) => {
    setInput(suggestionText);
    setTimeout(() => {
      handleSend();
    }, 0);
  };

  const handleTicketClick = (ticket) => {
    handleSuggestionClick(`Subject: ${ticket.subject}\n${ticket.description}`);
  };

  const quickOptions = [
    {
      title: "View My Pay Details",
      icon: <FaMoneyCheckAlt className="absolute bottom-4 text-blue-500" size={22} />,
      searchText: "View My Pay Details",
    },
    {
      title: "Apply for Leave",
      icon: <MdOutlineEventNote className="absolute bottom-4 text-blue-500" size={22} />,
      searchText: "Apply for Leave",
    },
    {
      title: "Check My Attendance",
      icon: <FaUserCheck className="absolute bottom-4 text-blue-500" size={22} />,
      searchText: "Check My Attendance",
    },
    {
      title: "Request Expense Reimbursement",
      icon: <GiReceiveMoney className="absolute bottom-4 text-blue-500" size={22} />,
      searchText: "Request Expense Reimbursement",
    },
  ];

  
  const categorizeTicket = (ticket) => {
    if (ticket.title?.toLowerCase().includes("salary")) return "Ticket";
    if (ticket.title?.toLowerCase().includes("tax")) return "Ticket";
    if (ticket.title?.toLowerCase().includes("leave")) return "Ticket";
    if (ticket.title?.toLowerCase().includes("bonus")) return "Ticket";
    if (ticket.title?.toLowerCase().includes("payroll")) return "Ticket";
    return "Ticket";
  };

  const combinedTickets = [
    ...leaveRequests.map((request, index) => ({
      id: `leave-${index}`,
      category: "Leave Request",
      subject: `Leave Type: ${request.leaveType}`,
      description: `Reason: ${request.reason}`,
      ticketNumber: `#00300${index + 1}`,
      status: request.status,
    })),
    ...reimbursements.map((reimbursement, index) => ({
      id: `reimbursement-${index}`,
      category: "Reimbursement Request",
      subject: `Expense Type: ${reimbursement.expenseType}`,
      description: `Description: ${reimbursement.description}`,
      ticketNumber: `#00301${index + 1}`,
      status: reimbursement.status,
    })),
    ...tickets.map((ticket, index) => ({
      ...ticket,
      category: categorizeTicket(ticket),
    })),
  ];

  return (
    <div className="flex flex-col flex-grow bg-black text-white relative px-4 md:px-[10%] transition-all duration-300">
      <SupportModel />

      <div className="flex flex-col bg-black text-white relative p-6 pt-[23vh] items-center justify-start">
        <div className="text-3xl font-semibold mb-8">Hello, Khan!</div>

        <div className="w-full max-w-[718px] flex items-center mb-2">
          <button
            className="bg-[#202327] px-4 py-4 rounded-l-full hover:bg-gray-600 flex items-center justify-center relative"
            aria-label="Attach file"
          >
            <CgAttachment className="text-white" />
            <input
              type="file"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  console.log("Uploaded file:", file);
                }
              }}
            />
          </button>
          <input
            type="text"
            placeholder="Type your query or task here…"
            className="flex-grow p-3 bg-[#202327] text-white outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            className="bg-[#202327] px-4 py-3 rounded-r-full hover:bg-[#202326] flex items-center justify-center"
            onClick={handleSend}
            aria-label="Send message"
          >
            ➤
          </button>
        </div>
        <p className="text-[#3e4144] font-medium text-sm mb-20">
          Comm-IT AI can make mistakes. Verify its outputs.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-[718px] mx-auto">
          {quickOptions.map((option, idx) => (
            <div
              key={idx}
              onClick={() => handleSuggestionClick(option.searchText)}
              className="bg-[#0d0e11] p-4 h-[130px] relative rounded-lg flex-col items-center justify-center text-white text-sm font-medium hover:bg-[#202326] cursor-pointer"
            >
              {option.title}
              {option.icon}
            </div>
          ))}
        </div>

        <div className="w-full max-w-[718px] grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
          {combinedTickets.map((ticket) => (
            <Ticket key={ticket.id} ticket={ticket} onClick={handleTicketClick} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;





