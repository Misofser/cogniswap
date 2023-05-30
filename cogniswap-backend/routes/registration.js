const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/register', async (req, res) => {

    try {
      // Extract the user registration data from the request body
      const { name, dateOfBirth, study, teach } = req.body;
      const studyString = Array.isArray(study) ? study.join(',') : study;
      const teachString = Array.isArray(teach) ? teach.join(',') : teach;
      
      if (!name || !dateOfBirth || !study || !teach) {
        return res.status(400).json({ error: 'Please fill out all required fields' });
      }
      
      // Create a new user in the database
      const user = await User.create({
        name,
        dateOfBirth,
        study: studyString,
        teach: teachString,
      });

      // Return a success response
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  module.exports = router;
