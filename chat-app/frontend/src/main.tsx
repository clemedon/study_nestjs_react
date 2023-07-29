// 1. main.ts

import React from "react"; // 'React' object from 'react' module
import ReactDOM from "react-dom/client"; // 'ReactDOM' provides methods for rendering React components into the DOM
import App from "./App.tsx"; // The app's main component
import "./index.css"; // CSS

// "createRoot" is used to create a root element, an entry point for rendering
// React components into the DOM. It return a 'root' object on which we can use
// the 'render' method.

ReactDOM.createRoot(document.getElementById("root")!).render(
  // Wrapper component that enforce coding best practices within App
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
