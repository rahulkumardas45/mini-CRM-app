import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";

// Layout and Auth
import Navbar from "./components/layout/Navbar.jsx";
import PrivateRoute from "./components/auth/PrivateRoute.jsx";

// Pages
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import CustomersPage from "./pages/CustomersPage.jsx";
import CustomerDetailPage from "./pages/CustomerDetailPage.jsx";
import CustomerFormPage from "./pages/CustomerFormPage.jsx";
import ReportsPage from "./pages/ReportsPage.jsx";
import LandingPage from "./pages/landing.jsx";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        {/* This is the line to fix. Add centering and max-width classes here. */}
        <main className="max-w-6xl mx-auto px-4 mt-6">
          <Routes>
            {/* Public Routes */}
             <Route path="/" element={<LandingPage/>} />

            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Protected Routes */}
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/customers" element={<CustomersPage />} />
              <Route path="/customers/new" element={<CustomerFormPage />} />
              <Route path="/customers/:id" element={<CustomerDetailPage />} />
              <Route path="/customers/:id/edit" element={<CustomerFormPage />} />
              <Route path="/reports" element={<ReportsPage />} />
            </Route>
          </Routes>
        </main>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

