import React from "react";
import { createRoot } from "react-dom/client"; // Notice the /client addition
import "./css/index.css";
import App from "./App";
import Provider from "./store";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Provider>
      <App />
    </Provider>
  </React.StrictMode>,
);
