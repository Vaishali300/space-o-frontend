import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import store from "./store/store.ts";
import AuthGuard from "./middleware/AuthGuard.tsx";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AuthGuard>
          <ToastContainer />
          <App />
        </AuthGuard>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
