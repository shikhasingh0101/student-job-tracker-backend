const XLSX = require('xlsx');
const fs = require('fs');
const path = './jobs.xlsx';

function loadSheet() {
    if (!fs.existsSync(path)) {
        const ws = XLSX.utils.json_to_sheet([]);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Jobs');
        XLSX.writeFile(wb, path);
    }
    return XLSX.readFile(path);
}

function getJobs() {
    const wb = loadSheet();
    const ws = wb.Sheets['Jobs'];
    return XLSX.utils.sheet_to_json(ws);
}

function saveJobs(jobs) {
    const ws = XLSX.utils.json_to_sheet(jobs);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Jobs');
    XLSX.writeFile(wb, path);
}

function addJob(job) {
    const jobs = getJobs();
    jobs.push(job);
    saveJobs(jobs);
}

function updateJob(id, updates) {
    const jobs = getJobs();
    const index = jobs.findIndex(job => job.id === id);
    if (index === -1) return null;

    jobs[index] = { ...jobs[index], ...updates, updatedAt: new Date().toISOString() };
    saveJobs(jobs);
    return jobs[index];
}

function deleteJob(id) {
    let jobs = getJobs();
    const initialLength = jobs.length;
    jobs = jobs.filter(job => job.id !== id);
    saveJobs(jobs);
    return jobs.length < initialLength;
}

module.exports = { getJobs, addJob, updateJob, deleteJob };
