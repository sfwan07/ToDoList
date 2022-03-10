import { Spin } from "antd";
import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import IndexRoutes from "./routes/index";

const App = () => {
  return (
    <ErrorBoundary>
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="colored"
      />
      <Router>
        <Suspense
          fallback={
            <section className="loadPage">
              <Spin size="large" tip="Loading..." />
            </section>
          }
        >
          <Routes>{IndexRoutes().map(i => i)}</Routes>
        </Suspense>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
