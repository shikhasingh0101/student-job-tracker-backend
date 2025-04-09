const express = require('express');
const router = express.Router();
const Job = require('../models/Job');

// Create job
router.post('/', async (req, res) => {
    try {
        const { company, role, status, date, link } = req.body;
        const job = new Job({ company, role, status, date, link });
        await job.save();
        res.status(201).json(job);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get jobs (optionally filtered by status or date)
router.get('/', async (req, res) => {
    try {
        const { status, date } = req.query;
        const filter = {};
        if (status) filter.status = status;
        if (date) filter.date = new Date(date);
        const jobs = await Job.find(filter).sort({ createdAt: -1 });
        res.json(jobs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update job status
router.put('/:id', async (req, res) => {
    try {
        const { status } = req.body;
        const job = await Job.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!job) return res.status(404).json({ error: 'Job not found' });
        res.json(job);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete job
router.delete('/:id', async (req, res) => {
    try {
        const job = await Job.findByIdAndDelete(req.params.id);
        if (!job) return res.status(404).json({ error: 'Job not found' });
        res.json({ message: 'Job deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;