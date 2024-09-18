import React, { useState } from 'react';
import axios from 'axios';

const CreatePin = () => {
  const [pin, setPin] = useState('');

  const handleChange = (e) => {
    setPin(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/pin', { pin });
      alert('PIN created successfully');
      setPin('');
    } catch (error) {
      console.error('Error creating PIN', error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Create New PIN</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Enter 6-Digit PIN</label>
          <input
            type="text"
            value={pin}
            onChange={handleChange}
            maxLength="6"
            required
            className="border rounded-lg p-2"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          Create PIN
        </button>
      </form>
    </div>
  );
};

export default CreatePin;
