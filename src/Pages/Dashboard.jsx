import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Welcome to the Law Firm Management System</h1>
      <div className="space-y-4">
        <Link to="/add-customer" className="text-blue-500 hover:underline">
          Add New Customer
        </Link>
        <br />
        <Link to="/view-customers" className="text-blue-500 hover:underline">
          View Customers
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
