import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CustomerDetails = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/customers/${id}`);
        setCustomer(response.data);
      } catch (error) {
        console.error('Error fetching customer details', error);
      }
    };

    fetchCustomer();
  }, [id]);

  if (!customer) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{customer.name}'s Details</h2>
      <p>Date of Birth: {customer.dateOfBirth}</p>
      <p>Phone: {customer.phone}</p>
      <p>Email: {customer.email}</p>
      <p>Address: {customer.address}</p>
      <p>Case Details: {customer.caseDetails}</p>
      {/* <a href={`http://localhost:5000/${customer.pdfFile}`} download>Download PDF</a> 
      
      */}

<a href={`http://localhost:5000/uploads/${customer.pdfFile}`} target="_blank" rel="noopener noreferrer">
  View PDF
</a>

    </div>
  );
};

export default  CustomerDetails;