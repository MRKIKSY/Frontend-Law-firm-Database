import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-6">Welcome to the Law Firm Management System</h1>
        <div className="space-y-4">
          <Link to="/add-customer" className="text-blue-500 hover:underline block">
            Add New Customer
          </Link>
          <Link to="/view-customers" className="text-blue-500 hover:underline block">
            View Customers
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
