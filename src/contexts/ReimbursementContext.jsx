import { createContext, useContext, useState } from "react";

const ReimbursementContext = createContext();

export const useReimbursements = () => useContext(ReimbursementContext);

export const ReimbursementProvider = ({ children }) => {
  const [reimbursements, setReimbursements] = useState([]);

  const addReimbursement = (reimbursementData) => {
    setReimbursements((prev) => [...prev, reimbursementData]);
  };

  return (
    <ReimbursementContext.Provider value={{ reimbursements, addReimbursement }}>
      {children}
    </ReimbursementContext.Provider>
  );
};
