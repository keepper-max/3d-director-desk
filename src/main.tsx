import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { DirectorModeProvider } from "./app/directorMode";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <DirectorModeProvider>
      <App />
    </DirectorModeProvider>
  </React.StrictMode>
);
