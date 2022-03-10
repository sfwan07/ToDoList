import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import reportWebVitals from "./reportWebVitals";
import { configureStore } from "./store/store";

import App from "./App";
import "react-toastify/dist/ReactToastify.css";
import "./index.scss";

ReactDOM.render(
  <Provider store={configureStore()}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root"),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
