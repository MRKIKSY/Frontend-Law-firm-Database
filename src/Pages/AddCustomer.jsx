import React, { useState } from 'react';
import axios from 'axios';

const AddCustomer = () => {
  const [customer, setCustomer] = useState({
    name: '',
    dateOfBirth: '',
    phone: '',
    email: '',
    address: '',
    caseDetails: '',
    pdfFile: null
  });

  const handleChange = (e) => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setCustomer({
      ...customer,
      pdfFile: e.target.files[0]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', customer.name);
    formData.append('dateOfBirth', customer.dateOfBirth);
    formData.append('phone', customer.phone);
    formData.append('email', customer.email);
    formData.append('address', customer.address);
    formData.append('caseDetails', customer.caseDetails);
    formData.append('pdfFile', customer.pdfFile);

    try {
      await axios.post('http://localhost:5000/api/customers', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Customer added successfully');
    } catch (error) {
      console.error('Error adding customer', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Add New Customer</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={customer.name}
            onChange={handleChange}
            required
            className="border rounded-lg p-2"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            value={customer.dateOfBirth}
            onChange={handleChange}
            required
            className="border rounded-lg p-2"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Phone</label>
          <input
            type="text"
            name="phone"
            value={customer.phone}
            onChange={handleChange}
            required
            className="border rounded-lg p-2"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={customer.email}
            onChange={handleChange}
            required
            className="border rounded-lg p-2"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Address</label>
          <input
            type="text"
            name="address"
            value={customer.address}
            onChange={handleChange}
            required
            className="border rounded-lg p-2"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Case Details</label>
          <textarea
            name="caseDetails"
            value={customer.caseDetails}
            onChange={handleChange}
            required
            className="border rounded-lg p-2"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Attach PDF</label>
          <input
            type="file"
            name="pdfFile"
            onChange={handleFileChange}
            required
            className="border rounded-lg p-2"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          Add Customer
        </button>
      </form>
    </div>
  );
};

export default AddCustomer;
