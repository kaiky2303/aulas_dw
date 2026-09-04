require('dotenv').config();

const express = require('express');
const cors = require('cors');

const authRoutes = require('./src/routes/auth.routes');
const privateRoutes = require('./src/routes/private.routes');

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

app.use('/api/private', privateRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});