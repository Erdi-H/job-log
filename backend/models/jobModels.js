// data layer: functions for interacting with db

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/jobs.db');

function getAllJobs() {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM jobs', [], (err, rows) => {
            if (err) {
                console.error('Error fetching jobs:', err);
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

function getJobById(jobId) {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM jobs WHERE id = ?', [jobId], (err, row) => {
            if (err) {
                console.error('Error fetching job by ID:', err);
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
}

function addJob(jobData) {
    const { company, role, location, format, status, dateApplied, notes } = jobData;
    return new Promise((resolve, reject) => {
        db.run(
            `INSERT INTO jobs (company, role, location, format, status, dateApplied, notes) 
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [company, role, location, format, status, dateApplied, notes],
            function (err) {
                if (err) {
                    console.error('Error adding job:', err);
                    reject(err);
                } else {
                    resolve({ id: this.lastID });
                }
            }
        );
    });
}

function updateJob(jobId, jobData) {
    const { company, role, location, format, status, dateApplied, notes } = jobData;
    return new Promise((resolve, reject) => {
        db.run(
            `UPDATE jobs 
             SET company = ?, role = ?, location = ?, format = ?, status = ?, dateApplied = ?, notes = ?
             WHERE id = ?`,
            [company, role, location, format, status, dateApplied, notes, jobId],
            function (err) {
                if (err) {
                    console.error('Error updating job:', err);
                    reject(err);
                } else {
                    resolve({ changes: this.changes });
                }
            }
        );
    });
}

function deleteJob(jobId) {
    return new Promise((resolve, reject) => {
        db.run('DELETE FROM jobs WHERE id = ?', [jobId],
            function (err) {
                if (err) {
                    console.error('Error deleting job:', err);
                    reject(err);
                } else {
                    resolve({ changes: this.changes });
                }
            }
        );
    });
}

module.exports = {
    getAllJobs,
    getJobById,
    addJob,
    updateJob,
    deleteJob,
}