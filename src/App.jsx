import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import AddCustomer from './Pages/AddCustomer';
import ViewCustomers from './Pages/ViewCustomers';
import CustomerDetails from './Pages/CustomerDetails';
import NotFound from './components/NotFound';
import Header from './components/Header';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import LetterForm from './Pages/LetterForm';
import SendEmail from './Pages/SendEmail';
import SendSms from './Pages/SendSms'; // Import the SendSms component
import Notes from './Pages/Notes'; // Import the Notes component

function App() {
  return (
    <Router>
      <Header />
      <div className="app">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/add-customer"
              element={
                <ProtectedRoute>
                  <AddCustomer />
                </ProtectedRoute>
              }
            />
            <Route
              path="/view-customers"
              element={
                <ProtectedRoute>
                  <ViewCustomers />
                </ProtectedRoute>
              }
            />
            <Route
              path="/customers/:id"
              element={
                <ProtectedRoute>
                  <CustomerDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/generate-letter"
              element={
                <ProtectedRoute>
                  <LetterForm />
                </ProtectedRoute>
              }
            />

<Route path="/notes" element={<ProtectedRoute><Notes /></ProtectedRoute>} />


            <Route
              path="/send-email/:email"
              element={
                <ProtectedRoute>
                  <SendEmail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/send-sms/:phone"
              element={
                <ProtectedRoute>
                  <SendSms />
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<ProtectedRoute><Navigate to="/dashboard" /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
