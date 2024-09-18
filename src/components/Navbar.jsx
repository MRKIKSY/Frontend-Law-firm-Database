import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <ul className="flex space-x-4">
        <li>
          <Link to="/add-customer" className="block py-2 px-4 hover:bg-gray-700 rounded">
            Add New Customer
          </Link>
        </li>
        <li>
          <Link to="/view-customers" className="block py-2 px-4 hover:bg-gray-700 rounded">
            View Customers
          </Link>
        </li>
        
      </ul>
    </nav>
  );
};

export default Navbar;
