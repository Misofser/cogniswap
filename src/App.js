import React, { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
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

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
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
            name="age"
            value={formData.age}
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

export default App;
