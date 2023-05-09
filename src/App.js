import React, { useState } from 'react';

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
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
      </label>

      <label>
        Date of birth:
        <input
          type="date"
          name="age"
          value={formData.age}
          onChange={handleInputChange}
        />
      </label>

      <label>
        What do you want to study?
        <input
          type="text"
          name="study"
          value={formData.study}
          onChange={handleInputChange}
        />
      </label>

      <label>
        What are you ready to teach?
        <input
          type="text"
          name="teach"
          value={formData.teach}
          onChange={handleInputChange}
        />
      </label>

      <p>Are you ready to start?</p>
      <button type="submit">Yes</button>
    </form>
  );
}

export default App;
