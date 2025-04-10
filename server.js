require('dotenv').config();
const express = require('express');
const cors = require('cors');

const jobRoutes = require('./routes/jobRoutes');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// ✅ Root route should come BEFORE jobRoutes
app.get('/', (req, res) => {
    res.send('🚀 Student Job Tracker Backend is live!');
});

// ✅ Now mount job routes at /jobs
app.use('/jobs', jobRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
