import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ViewCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('https://law-firm-management-system-1.onrender.com/api/customers');
        setCustomers(response.data);
      } catch (error) {
        console.error('Error fetching customers', error);
      }
    };

    fetchCustomers();
  }, []);

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">View Customers</h2>
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border rounded-lg p-2 mb-4 w-full"
      />
      <ul className="space-y-2">
        {filteredCustomers.map(customer => (
          <li key={customer._id} className="border-b py-2">
            <Link to={`/customers/${customer._id}`} className="text-blue-500 hover:underline">
              {customer.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewCustomers;
