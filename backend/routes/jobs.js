// API routes

const express = require('express');
const router = express.Router();
const jobModels = require('../models/jobModels');

router.get('/', async (req, res) => {
    try {
        const jobs = await jobModels.getAllJobs();
        res.status(200).json(jobs);
    } catch (error) {
        console.error('Error retrieving jobs:', error);
        res.status(500).json({ message: 'Error retrieving jobs', error });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await jobModels.getJobById(jobId);
        if (job) {
            res.status(200).json(job);
        } else {
            res.status(404).json({ message: 'Job not found' });
        }
    } catch (error) {
        console.error('Error retrieving job:', error);
        res.status(500).json({ message: 'Error retrieving job', error });
    }
});

router.post('/', async (req, res) => {
    try {
        const newJob = await jobModels.addJob(req.body);
        res.status(201).json(newJob);
    } catch (error) {
        console.error('Error adding job:', error);
        res.status(500).json({ message: 'Error adding job', error });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updated = await jobModels.updateJob(req.params.id, req.body);
        if (updated.changes === 0) {
            return res.status(404).json({ error: 'Job not found' });
        }
        res.json({ message: 'Job updated' });
    } catch (error) {
        console.error('Error updating job: ', error);
        res.status(500).json({ error: 'Failed to update job' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deleted = await jobModels.deleteJob(req.params.id);
        if (deleted.changes === 0) {
            return res.status(404).json({ eror: 'Job not found' });
        }
        res.json({ message: 'Job deleted' });
    } catch (error) {
        console.error('Error deleting job: ', error);
        res.status(500).json({ error: 'Failed to delete job' });
    }
});

module.exports = router;