import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthUser from "./components/Auth";
import "./index.css";
import LoginPage from "./views/login";
import RegisterPage from "./views/register";
import ReportsPage from "./views/reports";
import SpendingPage from "./views/spending";
import HomePage from "./views/home";

class Render extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/home" element={<AuthUser>{<HomePage />}</AuthUser>} />
          <Route
            path="/spendings"
            element={<AuthUser>{<SpendingPage />}</AuthUser>}
          />
          <Route
            path="/reports"
            element={<AuthUser>{<ReportsPage />}</AuthUser>}
          />
        </Routes>
      </BrowserRouter>
    );
  }
}

const root = document.getElementById("root");
const rootCreate = createRoot(root as HTMLDivElement);

rootCreate.render(<Render />);
