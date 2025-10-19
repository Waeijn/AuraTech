// Sprint 1: Member 5
// Task: App entry point, must render <App /> and BrowserRouter.
// This file should remain unchanged by other members.

import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles/global.css";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
