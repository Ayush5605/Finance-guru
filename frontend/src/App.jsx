import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Signup from "./pages/signup.jsx";
import Login from "./pages/Login.jsx";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./components/layouts/dashboard.jsx";
import DashboardPage from "./pages/dashboardPage";
import ExpensePage from "./pages/ExpensePage";
import AddExpense from "./components/layouts/AddExpense";
import Checkout from "./pages/Checkout";
import { useUser } from "./context/UserContext.jsx";

// Wrapper so that premium users never see the checkout page
function CheckoutRoute() {
  const { isPremium, loading } = useUser();

  if (loading) {
    return null;
  }

  if (isPremium) {
    // If already premium, send them back to the dashboard
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <Dashboard>
      <Checkout />
    </Dashboard>
  );
}

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/dashboard"
          element={
            <Dashboard>
              <DashboardPage />
            </Dashboard>
          }
        />

        <Route
          path="/expenses"
          element={
            <Dashboard>
              <ExpensePage />
            </Dashboard>
          }
        />

        <Route
          path="/add"
          element={
            <Dashboard>
              <AddExpense />
            </Dashboard>
          }
        />

        {/* Checkout route is guarded so premium users are redirected */}
        <Route path="/checkout" element={<CheckoutRoute />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
