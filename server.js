require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const jobRoutes = require('./routes/jobRoutes');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.use('/jobs', jobRoutes);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => console.error('MongoDB connection error:', err));
