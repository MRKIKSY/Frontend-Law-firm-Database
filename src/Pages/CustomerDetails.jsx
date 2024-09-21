import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const CustomerDetails = () => {
  const { id } = useParams(); // Get the customer ID from the URL
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      try {
        const response = await axios.get(`https://law-firm-management-system-1.onrender.com/api/customers/${id}`);
        setCustomer(response.data); // Set customer data
        setLoading(false); // Turn off loading
      } catch (err) {
        setError('Error fetching customer details');
        setLoading(false);
      }
    };

    fetchCustomerDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>; // Display error if fetching fails
  }

  return (
    <div>
      <h2>{customer.name}'s Details</h2>
      <p>Date of Birth: {customer.dateOfBirth}</p>
      <p>Phone: {customer.phone}</p>
      <p>Email: {customer.email}</p>
      <p>Address: {customer.address}</p>
      <p>Case Details: {customer.caseDetails}</p>
      <a href={`https://law-firm-management-system-1.onrender.com/uploads/${customer.pdfFile}`} target="_blank" rel="noopener noreferrer">
        View PDF
      </a>
      <Link to={`/generate-letter`} className="bg-green-500 text-white py-2 px-4 rounded-lg ml-4">
        Generate Letter
      </Link>
    </div>
  );
};

export default CustomerDetails;
