import { createContext, useContext, useState } from "react";

const LeaveRequestContext = createContext();

export const useLeaveRequests = () => useContext(LeaveRequestContext);

export const LeaveRequestProvider = ({ children }) => {
  const [leaveRequests, setLeaveRequests] = useState([]);

  const addLeaveRequest = (leaveData) => {
    setLeaveRequests((prev) => [...prev, leaveData]);
  };

  return (
    <LeaveRequestContext.Provider value={{ leaveRequests, addLeaveRequest }}>
      {children}
    </LeaveRequestContext.Provider>
  );
};
