const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
const app = express();
const registrationRoutes = require('./routes/registration');

sequelize.sync({ force: true }).then(() => {
  console.log("All models were synchronized successfully.");
});

app.use(cors());

app.use(express.json());

app.use('/api', registrationRoutes);

app.get('/', (req, res) => {
  res.send('Server is running successfully!');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
