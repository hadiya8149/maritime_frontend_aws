import {Router} from 'express';
import { upload } from '../middleware/upload.js'; // Assuming you have middleware for file uploads
import { createProgram, deleteProgram, getAllPrograms, getProgramById, updateProgram } from '../controllers/trainingController.js';
import {authenticateJwt} from '../middleware/authMiddleware.js'

const trainingRouter = Router();

// Create a new program
trainingRouter.post('/program', authenticateJwt,createProgram);

// Get all programs
// trainingRouter.get('/programs', async(req, res)=>{
//     console.log('all programs')
// });

// Get program by ID
trainingRouter.get('/program/:id',authenticateJwt, getProgramById);

// Update program by ID
trainingRouter.put('/update_program/:id',authenticateJwt, updateProgram);
 
// Delete program by ID 
trainingRouter.delete('/program/:id', authenticateJwt,deleteProgram);

export default trainingRouter; 
 