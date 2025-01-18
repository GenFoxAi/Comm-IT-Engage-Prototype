// src/pages/HistorySidebar.jsx

import React, { useState } from 'react';
import { CgClose } from 'react-icons/cg';
import { HiOutlineDotsVertical, HiOutlineSearch } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';
import './leftSidebar.css';
import { tickets } from '../data/tickets'; // Import unified tickets data
import Ticket from '../components/Ticket'; // Import Ticket component

const HistorySidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const [activeTab, setActiveTab] = useState('history');
  const [searchText, setSearchText] = useState('');

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  const historyData = [
    { id: 1, name: 'Clarification on Incomplete Message' },
    { id: 2, name: 'Friendly greeting' },
    { id: 3, name: 'Handling Typos and Incomplete Messages' },
    { id: 4, name: 'AI Framework Pseudo-Code Overview' },
    { id: 5, name: 'Request for Assistance' },
    { id: 6, name: 'Discussion on Project Timeline' },
    { id: 7, name: 'Feedback on Recent Update' },
    { id: 8, name: 'Inquiry About Pricing Plans' },
    { id: 9, name: 'Technical Support Request' },
    { id: 10, name: 'General Information Request' },
    { id: 11, name: 'Additional Information 1' },
    { id: 12, name: 'Additional Information 2' },
    { id: 13, name: 'Additional Information 3' },
  ];

  const filteredHistory = historyData.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const filteredTickets = tickets.filter((ticket) =>
    ticket.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const sidebarVariants = {
    open: {
      x: 0,
      transition: {
        type: 'tween',
        stiffness: 300,
        damping: 30,
      },
    },
    closed: {
      x: '-100%',
      transition: {
        type: 'tween',
        stiffness: 300,
        damping: 30,
      },
    },
  };

  const overlayVariants = {
    open: {
      opacity: 0.5,
      pointerEvents: 'auto',
      transition: {
        duration: 0.3,
      },
    },
    closed: {
      opacity: 0,
      pointerEvents: 'none',
      transition: {
        duration: 0.3,
      },
    },
  };

  const handleTicketClick = (ticket) => {
   
    setIsSidebarOpen(false);
    alert(`Subject: ${ticket.subject}\n${ticket.description}`);
  };

  return (
    <AnimatePresence>
      {isSidebarOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex"
          initial="closed"
          animate="open"
          exit="closed"
        >
          {/* Sidebar */}
          <motion.div
            className="left-sidebar shadow-white fixed left-0 top-0 w-96 h-screen bg-black text-white shadow-lg z-50 flex flex-col"
            variants={sidebarVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            {/* Header */}
            <div className="p-4 mx-2 text-lg mt-2 border-b border-gray-700 flex justify-between items-center">
              <h3 className="text-white font-semibold">History</h3>
              <button onClick={handleSidebarClose} className="text-white">
                <CgClose size={24} />
              </button>
            </div>

            {/* Search Input */}
            <div className="px-4 py-4 relative">
              <HiOutlineSearch className="absolute left-7 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search Engage History"
                className="w-full pl-10 p-2 bg-[#212327] text-white text-sm rounded-full focus:outline-none"
              />
            </div>

            {/* Toggle Buttons */}
            <div className="mb-4 flex space-x-2 border-b border-gray-600">
              <button
                onClick={() => setActiveTab('history')}
                className={`flex-1 p-2 text-sm ${
                  activeTab === 'history'
                    ? 'border-b-4 rounded-sm border-blue-500 text-white'
                    : 'text-gray-400'
                } transition-colors`}
              >
                History
              </button>
              <button
                onClick={() => setActiveTab('tickets')}
                className={`flex-1 p-2 text-sm ${
                  activeTab === 'tickets'
                    ? 'border-b-4 rounded-sm border-blue-500 text-white'
                    : 'text-gray-400'
                } transition-colors`}
              >
                Tickets
              </button>
            </div>

            {/* Scrollable Content Area */}
            <div className="px-4 flex-1 overflow-y-auto left-sidebar">
              {activeTab === 'history' ? (
                <ul className="space-y-2">
                  {filteredHistory.length > 0 ? (
                    filteredHistory.map((item) => (
                      <li
                        key={item.id}
                        className="flex items-center justify-between hover:bg-gray-700 p-3 text-[15px] rounded-md cursor-pointer transition-colors"
                      >
                        <span>{item.name}</span>
                        <button className="text-gray-400">
                          <HiOutlineDotsVertical />
                        </button>
                      </li>
                    ))
                  ) : (
                    <p className="text-gray-400 text-sm">No history found.</p>
                  )}
                </ul>
              ) : (
                <ul className="space-y-2">
                  {filteredTickets.length > 0 ? (
                    filteredTickets.map((ticket) => (
                      <Ticket
                        key={ticket.id}
                        ticket={ticket}
                        onClick={handleTicketClick}
                      />
                    ))
                  ) : (
                    <p className="text-gray-400 text-sm">No tickets found.</p>
                  )}
                </ul>
              )}
            </div>
          </motion.div>

          {/* Background Overlay */}
          <motion.div
            className="absolute inset-0 bg-black bg-opacity-90 backdrop-blur-3xl z-40"
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
            onClick={handleSidebarClose}
          ></motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HistorySidebar;
