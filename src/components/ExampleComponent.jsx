import { useState } from 'react';
import LeaveRequestModal from './model/LeaveRequestModal';
import ReimbursementModal from './model/ReimbursementModal';

const ExampleComponent = () => {
  const [isLeaveModalOpen, setLeaveModalOpen] = useState(false);
  const [isReimbursementModalOpen, setReimbursementModalOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setLeaveModalOpen(true)}>Request Leave</button>
      <button onClick={() => setReimbursementModalOpen(true)}>Submit Reimbursement</button>

      <LeaveRequestModal isOpen={isLeaveModalOpen} setIsOpen={setLeaveModalOpen} />
      <ReimbursementModal isOpen={isReimbursementModalOpen} setIsOpen={setReimbursementModalOpen} />
    </div>
  );
};

export default ExampleComponent;
