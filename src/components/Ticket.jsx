const Ticket = ({ ticket, onClick }) => {
  return (
    <button
      onClick={() => onClick(ticket)}
      className="flex flex-col justify-between p-4 bg-[#0d0e11] text-white rounded-lg hover:bg-[#202326] text-left relative w-full min-h-[200px] sm:min-h-[180px] md:min-h-[160px]"
    >
      <div className="text-xs text-gray-400 mb-1">{ticket.category}</div>
      <div>
        <h4 className="font-semibold mb-1 text-md">{ticket.subject}</h4>
        <p className="text-sm text-gray-300 mb-4 line-clamp-3">
          {ticket.description}
        </p>
      </div>
      <div className="flex justify-between items-center font-medium text-sm text-[#595d62] w-full">
        <span>{ticket.ticketNumber}</span>
        <span className="text-blue-500">{ticket.status}</span>
      </div>
    </button>
  );
};

export default Ticket;
