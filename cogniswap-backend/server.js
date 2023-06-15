const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
const app = express();
// const registrationRoutes = require('./routes/registration');
const statusRouter = require('./routes/status');
// const { onlineUsers } = require('./routes/registration');
const { router, onlineUsers } = require('./routes/registration');
const expireUsers = require('./utils/expireUsers');
const matchUsers = require('./utils/matchUsers');

sequelize.sync({ force: true }).then(() => {
  console.log("All models were synchronized successfully.");
});

app.use(cors());

app.use(express.json());

// app.use('/api', registrationRoutes);

app.use('/api', router);

app.use('/api/status', statusRouter);

app.get('/', (req, res) => {
  res.send('Server is running successfully!');
});

expireUsers();

matchUsers();

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
