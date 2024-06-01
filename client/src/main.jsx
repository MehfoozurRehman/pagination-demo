import App from "./App.jsx";
import ErrorBoundary from "./Error.jsx";
import React from "react";
import ReactDOM from "react-dom/client";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary
      fallback={(error, errorInfo) => (
        <>
          <h1>Something went wrong.</h1>
          <details style={{ whiteSpace: "pre-wrap" }}>
            {error && error.toString()}
            <br />
            {JSON.stringify(errorInfo?.componentStack || {}, null, 2)}
          </details>
        </>
      )}
    >
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
