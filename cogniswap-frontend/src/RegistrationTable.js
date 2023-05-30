import React, { useState } from 'react';
import './RegistrationTable.css';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

function RegistrationTable({ onRegistrationComplete }) {

  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: '',
    study: [],
    teach: []
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleStudyChange = (event) => {
    const { value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      study: value
    }));
  };


  const handleTeachChange = (event) => {
    const { value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      teach: value
    }));
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData.name || !formData.dateOfBirth || !formData.study || !formData.teach) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
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
      {errorMessage && (<p className="error-message">{errorMessage}</p>)}
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
   
        <div>
          <label className="form-label">
            What do you want to study?
          </label>
          <FormControl variant="outlined" className="form-input">
            <Select
              multiple
              value={formData.study}
              onChange={handleStudyChange}
              input={<OutlinedInput />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
            >
              <MenuItem value="English">English</MenuItem>
              <MenuItem value="French">French</MenuItem>
              <MenuItem value="Spanish">Spanish</MenuItem>
              <MenuItem value="Georgian">Georgian</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div>
          <label className="form-label">
            What do you want to teach?
          </label>
          <FormControl variant="outlined" className="form-input">
            <Select
              multiple
              value={formData.teach}
              onChange={handleTeachChange}
              input={<OutlinedInput />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
            >
              <MenuItem value="History">History</MenuItem>
              <MenuItem value="Italian">Italian</MenuItem>
              <MenuItem value="Design">Design</MenuItem>
              <MenuItem value="Drawing">Drawing</MenuItem>
            </Select>
          </FormControl>
        </div>
        
        <p>Are you ready to start?</p>
        <button type="submit" className="form-submit">Yes</button>
      </form>
    </div>
  );
}

export default RegistrationTable;
