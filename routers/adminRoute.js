import express from 'express';
import { createAdmin, deleteAdmin, getAdminById, getAllAdmins, updateAdmin } from '../controllers/adminController.js';
import {authenticateJwt} from '../middleware/authMiddleware.js'

const adminRouter = express.Router();

//Create admin
adminRouter.post('/create_admin', createAdmin);

// Update admin
adminRouter.put('/update_admin/:id', authenticateJwt, updateAdmin);

// Delete admin
adminRouter.delete('/delete_admin/:id',authenticateJwt, deleteAdmin);

// Get admin by ID
adminRouter.get('/admin/:id',authenticateJwt, getAdminById);

// Get all admins
adminRouter.get('/admins',authenticateJwt, getAllAdmins);

export default adminRouter;
