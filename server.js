require('dotenv').config();
const express = require('express');
const cors = require('cors');

const jobRoutes = require('./routes/jobRoutes');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Use your Excel-based job routes
app.use('/jobs', jobRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
