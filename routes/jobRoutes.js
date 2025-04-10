const express = require('express');
const router = express.Router();
const { getJobs, addJob, updateJob, deleteJob } = require('../excelHelper');
const { v4: uuidv4 } = require('uuid');

// POST - Add Job
router.post('/', (req, res) => {
    try {
        const { company, role, status, date, link } = req.body;
        const job = {
            id: uuidv4(),
            company,
            role,
            status,
            date,
            link,
            createdAt: new Date().toISOString()
        };
        addJob(job);
        res.status(201).json(job);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// GET - Fetch all or filtered jobs
router.get('/', (req, res) => {
    try {
        let jobs = getJobs();
        const { status, date } = req.query;

        if (status) jobs = jobs.filter(job => job.status === status);
        if (date) jobs = jobs.filter(job => job.date === date);

        jobs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        res.json(jobs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT - Update job status
router.put('/:id', (req, res) => {
    try {
        const updatedJob = updateJob(req.params.id, req.body);
        if (!updatedJob) return res.status(404).json({ error: 'Job not found' });
        res.json(updatedJob);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE - Remove a job
router.delete('/:id', (req, res) => {
    try {
        const success = deleteJob(req.params.id);
        if (!success) return res.status(404).json({ error: 'Job not found' });
        res.json({ message: 'Job deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
