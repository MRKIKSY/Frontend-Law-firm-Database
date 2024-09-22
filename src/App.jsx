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
import SendEmail from './Pages/SendEmail'; // Import the SendEmail component

function App() {
  return (
    <Router>
      <Header />
      <div className="app">
        <Navbar />
        <div className="content">
          <Routes>
            {/* Unprotected route for login */}
            <Route path="/login" element={<Login />} />
            
            {/* Protected route for the dashboard */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            
            {/* Protected routes */}
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
            
            {/* Route for generating a letter */}
            <Route
              path="/generate-letter"
              element={
                <ProtectedRoute>
                  <LetterForm />
                </ProtectedRoute>
              }
            />

            {/* New route for sending email */}
            <Route
              path="/send-email/:email"
              element={
                <ProtectedRoute>
                  <SendEmail />
                </ProtectedRoute>
              }
            />

            {/* Default route to redirect to the dashboard if the user is authenticated */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Navigate to="/dashboard" />
                </ProtectedRoute>
              }
            />
            
            {/* Catch-all route for undefined paths */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
