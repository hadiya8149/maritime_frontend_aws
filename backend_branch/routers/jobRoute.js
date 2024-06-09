import express from 'express';
import { db } from "../config/dbConnection.js";
import {authenticateJwt} from '../middleware/authMiddleware.js'

import { createJob, deleteJob, getJobById, getAllJobs, getJobByEmployerId, updateJob } from '../controllers/jobController.js';

const jobRouter = express.Router();

// Create job
jobRouter.post('/create_job',authenticateJwt, createJob);

// Update job
jobRouter.put('/update_job/:id',authenticateJwt, updateJob);

// Delete job
jobRouter.delete('/delete_job/:id',authenticateJwt, deleteJob);

// Get job by ID
jobRouter.get('/job/:id', getJobById);

jobRouter.get('/get_job_by_employer_id/:id',authenticateJwt, getJobByEmployerId);

// Get all jobsbs
jobRouter.get('/jobs', getAllJobs);

export default jobRouter;
