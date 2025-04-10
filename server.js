require('dotenv').config();
const express = require('express');
const cors = require('cors');

const jobRoutes = require('./routes/jobRoutes');

const app = express();

// ✅ Use only this PORT declaration
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

// ✅ Root route for Render check
app.get('/', (req, res) => {
    res.send('🚀 Student Job Tracker Backend is live!');
});

// ✅ Job routes
app.use('/jobs', jobRoutes);

// ✅ Single app.listen call
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
