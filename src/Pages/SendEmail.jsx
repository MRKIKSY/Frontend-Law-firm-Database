import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SendEmail = () => {
  const { email } = useParams(); // Get customer email from URL
  const navigate = useNavigate(); // Hook for navigation
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [bcc, setBcc] = useState('');
  const [cc, setCc] = useState('');
  
  // Fixed sender name
  const senderName = 'Finsbury Law Solicitors';

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Combine the body with the fixed text
    const fullBody = `${body}\n\nRegards,\nFinsbury Law Solicitors`;

    try {
      await axios.post('https://law-firm-management-system-1.onrender.com/api/emails/send-email', {
        email,
        subject,
        body: fullBody,
        bcc,
        cc,
        senderName,
      });
      alert('Email sent successfully');
    } catch (error) {
      alert('Error sending email: ' + error.response.data.error);
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        {/* Centered Heading */}
        <h2 className="text-lg font-medium text-gray-500 mb-4 text-center">
          Send Email to:<br />
          <span className="font-bold text-gray-900">{email}</span>
        </h2>

        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)} 
          className="mb-4 text-blue-500 hover:underline"
        >
          Back
        </button>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Sender Name</label>
            <input
              type="text"
              value={senderName} // Fixed sender name
              readOnly // Make it read-only
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Subject</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Body</label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full px-3 py-2 border rounded h-32"
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">BCC</label>
            <input
              type="text"
              value={bcc}
              onChange={(e) => setBcc(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">CC</label>
            <input
              type="text"
              value={cc}
              onChange={(e) => setCc(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
          >
            Send Email
          </button>
        </form>
      </div>
    </div>
  );
};

export default SendEmail;

