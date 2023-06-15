const express = require('express');
const router = express.Router();

const onlineUsers = require('./registration').onlineUsers;

router.get('/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
      console.log('Received userId:', userId);
      // Find the user in the online users array
      const user = onlineUsers.find((user) => user.id === userId);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Update the registration time to the current time
      user.registrationTime = new Date();
  
      // Check if the user is matched
      const matched = user.matched;
      const roomId = user.roomId;
  
      // Prepare the response payload
      const response = {
        matched,
        roomId,
      };
  
      // Return the response to the frontend
      res.json(response);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

module.exports = router;
