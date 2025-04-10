const fs = require('fs');
const XLSX = require('xlsx');

const filePath = 'jobs.xlsx';

// Utility to read all jobs
function getJobs() {
  if (!fs.existsSync(filePath)) return [];
  const workbook = XLSX.readFile(filePath);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  return XLSX.utils.sheet_to_json(sheet, { defval: '' });
}

// Utility to write jobs to file
function writeJobs(jobs) {
  const newWB = XLSX.utils.book_new();
  const newSheet = XLSX.utils.json_to_sheet(jobs);
  XLSX.utils.book_append_sheet(newWB, newSheet, 'Jobs');
  XLSX.writeFile(newWB, filePath);
}

// CREATE
function addJob(job) {
  const jobs = getJobs();
  const newJob = { id: Date.now().toString(), ...job }; // simple unique ID
  jobs.push(newJob);
  writeJobs(jobs);
  return newJob;
}

// READ (all jobs, optionally filtered by status or date)
function filterJobs(query = {}) {
  let jobs = getJobs();
  if (query.status) jobs = jobs.filter(j => j.status === query.status);
  if (query.date) jobs = jobs.filter(j => j.date === query.date);
  return jobs;
}

// UPDATE
function updateJob(id, updatedFields) {
  const jobs = getJobs();
  const index = jobs.findIndex(j => j.id === id);
  if (index === -1) return null;
  jobs[index] = { ...jobs[index], ...updatedFields };
  writeJobs(jobs);
  return jobs[index];
}

// DELETE
function deleteJob(id) {
  const jobs = getJobs();
  const index = jobs.findIndex(j => j.id === id);
  if (index === -1) return null;
  const deleted = jobs.splice(index, 1)[0];
  writeJobs(jobs);
  return deleted;
}

module.exports = {
  getJobs,
  addJob,
  filterJobs,
  updateJob,
  deleteJob,
};
