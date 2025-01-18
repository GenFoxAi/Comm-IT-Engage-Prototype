import React, { useEffect } from "react";
import { FiCheckSquare, FiX } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";

const NOTIFICATION_TTL = 5000;

const SlideInNotifications = ({ notifications, removeNotif }) => {
  return (
    <div className="flex flex-col gap-1 w-72 fixed bottom-2 right-2 z-50 pointer-events-none">
      <AnimatePresence>
        {notifications.map((n) => (
          <Notification key={n.id} {...n} removeNotif={removeNotif} />
        ))}
      </AnimatePresence>
    </div>
  );
};

const Notification = ({ text, id, removeNotif }) => {
  useEffect(() => {
    const timeoutRef = setTimeout(() => {
      removeNotif(id);
    }, NOTIFICATION_TTL);

    return () => clearTimeout(timeoutRef);
  }, [id, removeNotif]);

  return (
    <motion.div
      layout
      initial={{ y: 15, scale: 0.95, opacity: 0 }}
      animate={{ y: 0, scale: 1, opacity: 1 }}
      exit={{ x: "100%", opacity: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="p-2 flex items-start rounded gap-2 text-xs font-medium shadow-lg text-white bg-[#212327] pointer-events-auto"
    >
      <FiCheckSquare className="mt-0.5" />
      <span>{text}</span>
      <button onClick={() => removeNotif(id)} className="ml-auto mt-0.5">
        <FiX />
      </button>
    </motion.div>
  );
};

export default SlideInNotifications;
