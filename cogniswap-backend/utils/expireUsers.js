const { onlineUsers } = require('../routes/registration');

function expireUsers() {
    // Get the current time
    const currentTime = new Date();
  
    // Iterate over the onlineUsers array
    for (let i = onlineUsers.length - 1; i >= 0; i--) {
      const user = onlineUsers[i];
      
      // Calculate the time difference in seconds between the current time and the login time
      const timeDifference = Math.floor((currentTime - user.registrationTime) / 1000);
      
      // If more than 30 seconds have passed, remove the user from the onlineUsers array
      if (timeDifference > 30) {
        onlineUsers.splice(i, 1);
      }
    }
  }

setInterval(expireUsers, 3000);


module.exports = expireUsers;