import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Notes = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  // Fetch existing notes on component mount
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get('https://law-firm-management-system-1.onrender.com/api/notes');


        setNotes(response.data);
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };
    fetchNotes();
  }, []);

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (currentNote && date && time) {
      try {
        const response = await axios.post('https://law-firm-management-system-1.onrender.com/api/notes', {
          note: currentNote,
          date,
          time,
        });
        setNotes([...notes, response.data]); // Update local state with new note
        setCurrentNote('');
        setDate('');
        setTime('');
      } catch (error) {
        console.error('Error adding note:', error);
      }
    }
  };
  

  return (
    <div className="max-w-3xl mx-auto p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 bg-gray-300 text-black rounded p-2 hover:bg-gray-400 transition"
      >
        Go Back
      </button>
      <h2 className="text-2xl font-semibold mb-4">Notes</h2>
      <form onSubmit={handleAddNote} className="flex flex-col mb-4">
        <input
          type="text"
          value={currentNote}
          onChange={(e) => setCurrentNote(e.target.value)}
          placeholder="Enter your note"
          className="border p-2 rounded mb-2"
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 rounded mb-2"
          required
        />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="border p-2 rounded mb-2"
          required
        />
        <button type="submit" className="bg-blue-500 text-white rounded p-2">
          Add Note
        </button>
      </form>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Date</th>
            <th className="border border-gray-300 p-2">Time</th>
            <th className="border border-gray-300 p-2">Note</th>
          </tr>
        </thead>
        <tbody>
          {notes.map((note, index) => (
            <tr key={index}>
              <td className="border border-gray-300 p-2">{note.date}</td>
              <td className="border border-gray-300 p-2">{note.time}</td>
              <td className="border border-gray-300 p-2">{note.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Notes;
