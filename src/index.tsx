import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { IngsProvider } from "./contexts/Ings.Context";

ReactDOM.render(
  <React.StrictMode>
    <IngsProvider>
      <App />
    </IngsProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
