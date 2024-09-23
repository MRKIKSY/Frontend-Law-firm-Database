import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ButtonLink from '../components/ButtonLink'; // Reusable button component

const CustomerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Add useNavigate
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      try {
        const response = await axios.get(`https://law-firm-management-system-1.onrender.com/api/customers/${id}`);
        setCustomer(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching customer details');
        setLoading(false);
      }
    };
    fetchCustomerDetails();
  }, [id]);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">{customer.name}'s Details</h2>
      
      <div className="mb-4 p-4 bg-blue-50 rounded-lg">
        <p className="text-lg font-semibold text-gray-700">Date of Birth:</p>
        <p className="text-gray-600">{new Date(customer.dateOfBirth).toLocaleDateString()}</p>
      </div>

      <div className="mb-4 p-4 bg-green-50 rounded-lg flex justify-between items-center">
        <div>
          <p className="text-lg font-semibold text-gray-700">Phone:</p>
          <p className="text-gray-600">{customer.phone}</p>
        </div>
        <ButtonLink
          label="Send SMS"
          to={`/send-sms/${customer.phone}`}
          className="text-sm text-black bg-white border border-black rounded hover:bg-gray-200 transition"
        />
      </div>

      <div className="mb-4 p-4 bg-yellow-50 rounded-lg flex justify-between items-center">
        <div>
          <p className="text-lg font-semibold text-gray-700">Email:</p>
          <p className="text-gray-600">{customer.email}</p>
        </div>
        <ButtonLink label="Send Email" to={`/send-email/${customer.email}`} className="text-sm text-black bg-white border border-black rounded hover:bg-gray-200 transition" />
      </div>

      <div className="mb-4 p-4 bg-purple-50 rounded-lg flex justify-between items-center">
        <div>
          <p className="text-lg font-semibold text-gray-700">Address:</p>
          <p className="text-gray-600">{customer.address}</p>
        </div>
        <ButtonLink label="Generate Letter" to="/generate-letter" className="text-sm text-black bg-white border border-black rounded hover:bg-gray-200 transition" />
      </div>

      <div className="mb-4 p-4 bg-pink-50 rounded-lg flex justify-between items-center">
        <div>
          <p className="text-lg font-semibold text-gray-700">Case Details:</p>
          <p className="text-gray-600">{customer.caseDetails}</p>
        </div>
        <button
          onClick={() => navigate('/notes')}
          className="text-sm text-black bg-white border border-black rounded hover:bg-gray-200 transition"
        >
          Customer Journal Entry
        </button>
      </div>

      <div className="mb-4">
        <a 
          href={`https://law-firm-management-system-1.onrender.com/uploads/${customer.pdfFile}`} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-blue-500 underline hover:text-blue-700"
        >
          View PDF
        </a>
      </div>
    </div>
  );
};

export default CustomerDetails;
