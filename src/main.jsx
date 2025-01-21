import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { LeaveRequestProvider } from "./contexts/LeaveRequestContext.jsx";
import { ReimbursementProvider } from "./contexts/ReimbursementContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LeaveRequestProvider>
      <ReimbursementProvider>
        <App />
      </ReimbursementProvider>
    </LeaveRequestProvider>
  </StrictMode>
);
