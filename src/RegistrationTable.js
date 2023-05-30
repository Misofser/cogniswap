import React, { useState } from 'react';
import './RegistrationTable.css';

function RegistrationTable({ onRegistrationComplete }) {
  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: '',
    study: '',
    teach: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        mode: 'no-cors', // Enable no-cors mode
      });

      if (response.ok) {
        // Registration successful
        console.log('Registration successful');
        // Call the onRegistrationComplete function or perform any other necessary actions
        onRegistrationComplete();
      } else {
        // Registration failed
        console.log('Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
         <label className="form-label">
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="form-input"
          />
        </label>

        <label className="form-label">
          Date of birth:
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
            className="form-input"
          />
        </label>

        <label className="form-label">
          What do you want to study?
          <input
            type="text"
            name="study"
            value={formData.study}
            onChange={handleInputChange}
            className="form-input"
          />
        </label>

        <label className="form-label">
          What are you ready to teach?
          <input
            type="text"
            name="teach"
            value={formData.teach}
            onChange={handleInputChange}
            className="form-input"
          />
        </label>
        
        <p>Are you ready to start?</p>
        <button type="submit" className="form-submit">Yes</button>
      </form>
    </div>
  );
}

export default RegistrationTable;
