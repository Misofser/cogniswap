const { v4: uuidv4 } = require('uuid');
const { onlineUsers } = require('../routes/registration');

function matchUsers() {
  // Get the online unmatched users
  const unmatchedUsers = onlineUsers.filter(user => !user.matched);

  // Check if there are at least two unmatched users online
  if (unmatchedUsers.length < 2) {
    return; // Not enough users to match
  }

  // Match the users in pairs
  for (let i = 0; i < unmatchedUsers.length - 1; i += 2) {
    const user1 = unmatchedUsers[i];
    const user2 = unmatchedUsers[i + 1];

    // Generate a video chat room id
    const roomId = uuidv4();

    // Mark users as matched and assign the room id
    user1.matched = true;
    user1.roomId = roomId;
    user2.matched = true;
    user2.roomId = roomId;
  }
}

// Call the matchUsers function once per second
setInterval(matchUsers, 1000);

// Export the matchUsers function (optional if you don't need to import it elsewhere)
module.exports = matchUsers;