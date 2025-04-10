require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jobRoutes = require('./routes/jobRoutes');

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

// Welcome route
app.get('/', (req, res) => {
    res.send('🚀 Student Job Tracker Backend is live!');
});

// Main job routes
app.use('/jobs', jobRoutes);

app.listen(PORT, () => {
    console.log(`✅ Server running on Render port ${PORT}`);
});
