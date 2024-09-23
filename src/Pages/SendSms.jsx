// src/Pages/SendSms.js
import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const SendSms = () => {
  const { phone } = useParams(); // Get phone number from route parameters
  const navigate = useNavigate(); // Initialize useNavigate
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const sendSms = async () => {
    try {
      const response = await axios.post('https://law-firm-management-system-1.onrender.com/api/sms/send-sms', {
        phone: phone,
        message: message,
      });
      if (response.data.success) {
        setStatus('Message sent successfully!');
      } else {
        setStatus('Failed to send message.');
      }
    } catch (error) {
      setStatus('Error sending message. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Send SMS</h2>
      <p className="text-gray-600 mb-2">Sending to: {phone}</p>

      <textarea
        className="w-full p-2 border border-gray-300 rounded mb-4"
        rows="4"
        placeholder="Enter your message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={sendSms}
      >
        Send Message
      </button>

      {status && <p className="mt-4 text-center text-red-500">{status}</p>}

      <button
        className="mt-4 bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
        onClick={() => navigate(-1)} // Navigate back to the previous page
      >
        Go Back
      </button>
    </div>
  );
};

export default SendSms;
