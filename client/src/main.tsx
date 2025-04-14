import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { InvestorProvider } from "./contexts/InvestorContext";

createRoot(document.getElementById("root")!).render(
  <InvestorProvider>
    <App />
  </InvestorProvider>
);
